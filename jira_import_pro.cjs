const axios = require("axios");
const fs = require("fs");

// ═══════════════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════════════

const JIRA_DOMAIN = "https://ofppt-edu-team-nonpzbtx.atlassian.net";
const EMAIL = "2004100900105@ofppt-edu.ma";
const API_TOKEN = "";
const PROJECT_KEY = "SCRUM";
const DATA_FILE = "jira_user_stories.json";

// Story Points custom field (Jira Cloud default)
const STORY_POINTS_FIELD = "customfield_10016";

const auth = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString("base64");

const apiClient = axios.create({
  baseURL: `${JIRA_DOMAIN}/rest/api/3`,
  headers: {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════

const epicMap = {};
let createdCount = { epics: 0, stories: 0, subtasks: 0 };

/**
 * Create a Jira issue and return its key.
 */
async function createIssue(fields) {
  try {
    const { data } = await apiClient.post("/issue", { fields });
    return data.key;
  } catch (err) {
    const errorData = err.response?.data;
    const msg = errorData
      ? JSON.stringify(errorData.errors || errorData.errorMessages || errorData)
      : err.message;
    throw new Error(`Jira API Error: ${msg}`);
  }
}

/**
 * Build an ADF (Atlassian Document Format) document from plain text.
 */
function toADF(text) {
  if (!text) return undefined;
  return {
    type: "doc",
    version: 1,
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: String(text) }],
      },
    ],
  };
}

/**
 * Build a full description combining the user story + acceptance criteria.
 */
function buildDescription(item) {
  let desc = item.Description || "";

  if (item["Acceptance Criteria"] && item["Acceptance Criteria"].length > 0) {
    desc += "\n\nAcceptance Criteria:\n";
    desc += item["Acceptance Criteria"].map((ac) => `• ${ac}`).join("\n");
  }

  return toADF(desc);
}

/**
 * Get or create an Epic, caching keys to avoid duplicates.
 */
async function getOrCreateEpic(epicId) {
  if (epicMap[epicId]) return epicMap[epicId];

  console.log(`\n📦 Creating Epic: ${epicId}`);

  const epicKey = await createIssue({
    project: { key: PROJECT_KEY },
    summary: epicId,
    issuetype: { name: "Epic" },
  });

  epicMap[epicId] = epicKey;
  createdCount.epics++;
  console.log(`   ✅ Epic created: ${epicKey}`);

  return epicKey;
}

/**
 * Map priority string to Jira priority name.
 */
function mapPriority(priority) {
  const map = {
    High: "High",
    Medium: "Medium",
    Low: "Low",
  };
  return map[priority] || "Medium";
}

// ═══════════════════════════════════════════════════════════════
//  MAIN IMPORT
// ═══════════════════════════════════════════════════════════════

async function runImport() {
  // 1. Load data
  console.log("═══════════════════════════════════════════════════");
  console.log("  CMC-Learning — Jira Import Script");
  console.log("═══════════════════════════════════════════════════");
  console.log(`📂 Reading ${DATA_FILE}...`);

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ File not found: ${DATA_FILE}`);
    process.exit(1);
  }

  const stories = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  console.log(`📋 Found ${stories.length} user stories to import.\n`);

  // 2. Process each story
  for (let i = 0; i < stories.length; i++) {
    const item = stories[i];
    const progress = `[${i + 1}/${stories.length}]`;

    try {
      // 2a. Ensure Epic exists
      const epicKey = await getOrCreateEpic(item["Epic ID"]);

      // 2b. Create Story
      console.log(`\n${progress} 📝 Creating Story: ${item.Title}`);

      const storyFields = {
        project: { key: PROJECT_KEY },
        summary: item.Title,
        description: buildDescription(item),
        issuetype: { name: "Story" },
        priority: { name: mapPriority(item.Priority) },
        parent: { key: epicKey },
        labels: item.Sprint ? [item.Sprint.replace(/\s+/g, "_")] : [],
      };

      // Story Points
      if (item["Story Points"]) {
        storyFields[STORY_POINTS_FIELD] = item["Story Points"];
      }

      const storyKey = await createIssue(storyFields);
      createdCount.stories++;
      console.log(`   ✅ Story created: ${storyKey} (${item.Priority}, ${item["Story Points"]} SP)`);

      // 2c. Create Subtasks
      const subtasks = item.Subtasks || [];
      for (let j = 0; j < subtasks.length; j++) {
        const subtaskTitle = subtasks[j];
        console.log(`   📌 Creating Subtask [${j + 1}/${subtasks.length}]: ${subtaskTitle}`);

        const subtaskKey = await createIssue({
          project: { key: PROJECT_KEY },
          summary: subtaskTitle,
          issuetype: { name: "Sub-task" },
          parent: { key: storyKey },
        });

        createdCount.subtasks++;
        console.log(`      ✅ Subtask created: ${subtaskKey}`);
      }
    } catch (err) {
      console.error(`   ❌ ERROR on "${item.Title}": ${err.message}`);
      console.error(`   ⏭️  Skipping and continuing...\n`);
    }
  }

  // 3. Summary
  console.log("\n═══════════════════════════════════════════════════");
  console.log("  ✅ Import completed successfully!");
  console.log("═══════════════════════════════════════════════════");
  console.log(`  📦 Epics created:    ${createdCount.epics}`);
  console.log(`  📝 Stories created:  ${createdCount.stories}`);
  console.log(`  📌 Subtasks created: ${createdCount.subtasks}`);
  console.log(`  📊 Total issues:     ${createdCount.epics + createdCount.stories + createdCount.subtasks}`);
  console.log("═══════════════════════════════════════════════════\n");
}

// ═══════════════════════════════════════════════════════════════
//  RUN
// ═══════════════════════════════════════════════════════════════

runImport().catch((err) => {
  console.error("\n💥 Fatal error:", err.message);
  process.exit(1);
});