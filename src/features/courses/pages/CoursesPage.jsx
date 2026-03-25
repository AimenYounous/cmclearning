import { useState } from "react";
import CourseCard from "../components/CourseCard";
import AddCourseModal from "../components/AddCourseModal";
import { Button, Input, EmptyState } from "@/components/ui";
import { HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";

// Mock user - simulates logged-in user
const MOCK_USER = {
  id: "user-123",
  name: "John Doe",
  email: "john@example.com",
};

// Mock initial courses data
const INITIAL_COURSES = [
  {
    id: "1",
    title: "React Fundamentals",
    description:
      "Learn the basics of React including components, hooks, and state management.",
    category: "Web Development",
    rating: 4.5,
    author: "Sarah Johnson",
    userId: "user-123",
    icon: "⚛️",
  },
  {
    id: "2",
    title: "JavaScript Advanced Concepts",
    description:
      "Master advanced JavaScript patterns and techniques for professional development.",
    category: "Programming",
    rating: 4.8,
    author: "Mike Smith",
    userId: "user-456",
    icon: "📜",
  },
  {
    id: "3",
    title: "Tailwind CSS Mastery",
    description:
      "Create beautiful and responsive designs with Tailwind CSS framework.",
    category: "Web Design",
    rating: 4.6,
    author: "Emma Wilson",
    userId: "user-123",
    icon: "🎨",
  },
  {
    id: "4",
    title: "Node.js Backend Development",
    description:
      "Build scalable backend applications with Node.js and Express.js.",
    category: "Backend",
    rating: 4.7,
    author: "David Brown",
    userId: "user-789",
    icon: "🖥️",
  },
  {
    id: "5",
    title: "Web Performance Optimization",
    description: "Optimize your web applications for speed and performance.",
    category: "Web Development",
    rating: 4.4,
    author: "Sarah Johnson",
    userId: "user-123",
    icon: "⚡",
  },
];

const CoursesPage = () => {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter courses based on active tab
  const filteredCourses = courses
    .filter((course) => {
      if (activeTab === "authenticated") {
        return course.userId === MOCK_USER.id;
      }
      return true;
    })
    .filter((course) => {
      // Additional search filter
      const searchLower = searchQuery.toLowerCase();
      return (
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        course.author.toLowerCase().includes(searchLower)
      );
    });

  // Handle add course
  const handleAddCourse = (newCourse) => {
    const courseWithId = {
      ...newCourse,
      id: Date.now().toString(),
      userId: MOCK_USER.id,
      rating: 5,
      author: MOCK_USER.name,
    };
    setCourses([...courses, courseWithId]);
    setIsModalOpen(false);
  };

  // Get counts for authenticated courses
  const authenticatedCoursesCount = courses.filter(
    (c) => c.userId === MOCK_USER.id,
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 space-y-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Courses</h1>
            <p className="text-slate-400">
              Explore and manage your learning journey
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <HiOutlinePlus className="w-5 h-5" />
            Add Course
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-8 border-b border-slate-700">
          {[
            { id: "all", label: "All Courses", count: courses.length },
            {
              id: "authenticated",
              label: "My Courses",
              count: authenticatedCoursesCount,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchQuery("");
              }}
              className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? "text-indigo-400 border-indigo-500"
                  : "text-slate-400 border-transparent hover:text-slate-300"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-sm text-slate-500">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <HiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses by title, category, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchQuery ? "No courses found" : "No courses yet"}
            </h3>
            <p className="text-slate-400 mb-6">
              {searchQuery
                ? "Try adjusting your search terms"
                : activeTab === "authenticated"
                  ? "You haven't created any courses yet. Create your first course now!"
                  : "Start exploring or create a new course"}
            </p>
            {!searchQuery && activeTab === "authenticated" && (
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Create First Course
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCourse={handleAddCourse}
      />
    </div>
  );
};

export default CoursesPage;
