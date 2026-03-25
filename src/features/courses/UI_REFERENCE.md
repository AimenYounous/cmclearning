# 🎨 Courses UI Reference Guide

## Visual Component Overview

This guide provides a visual reference for all courses components and their functionality.

---

## 1. CoursesPage - Main Layout

### Header Section

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Courses                                                │
│  Explore and manage your learning journey               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Location**: Top of page  
**Components**: H1 title, subtitle text  
**Styling**: Large font (2.25rem), white text, slate 400 subtitle  
**Color**: White (#ffffff) on gradient background

### Tab Navigation

```
┌─────────────────────────────────────────────────────────┐
│ ┌─────────────┐         ┌──────────────────────┐        │
│ │  All Courses(5)       │ + Add Course        │        │
│ └─────────────┘         └──────────────────────┘        │
│ ┌──────────────────────┐                                │
│ │ My Courses (2)       │                                │
│ └──────────────────────┘                                │
└─────────────────────────────────────────────────────────┘
```

**Components**: TabToggle + Add Course Button  
**Active Tab**: Indigo background (#4f46e5), white text  
**Inactive Tab**: Dark background, slate text  
**Button**: Gradient indigo, hover effect, shadow  

### Search Bar

```
┌─────────────────────────────────────────────────────────┐
│ 🔍 Search courses by title, description, or category... │
└─────────────────────────────────────────────────────────┘
```

**Input**: Dark background (#1e293b), slate border  
**Icon**: Search icon (HiOutlineSearch)  
**Placeholder**: Slate 500 color  
**Focus State**: Indigo border, ring effect  

### Courses Grid

```
┌──────────────┬──────────────┬──────────────┐
│   Card 1     │   Card 2     │   Card 3     │
├──────────────┼──────────────┼──────────────┤
│   Card 4     │   Card 5     │   Card 6     │
├──────────────┼──────────────┼──────────────┤
│   Card 7     │              │              │
└──────────────┴──────────────┴──────────────┘
```

**Grid**: 3 columns on desktop, 2 on tablet, 1 on mobile  
**Gap**: 1.5rem between cards  
**Responsive**: auto-fill minmax(320px, 1fr)  

### Statistics Section

```
┌────────────────────────────────────────────────────────┐
│ 📊 Statistics                                           │
│                                                        │
│ ┌─────────────────┐ ┌──────────────┐ ┌────────────┐   │
│ │ Total Courses   │ │  My Courses  │ │ Active Tab │   │
│ │       5         │ │       2      │ │ All Courses│   │
│ └─────────────────┘ └──────────────┘ └────────────┘   │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Cards**: Slate 800 background, indigo borders on hover  
**Numbers**: Large indigo text (#4f46e5)  
**Labels**: Small slate text  

---

## 2. CourseCard - Individual Card Component

### Card Structure

```
┌────────────────────────────────────┐
│  ╔════════════════════════════════╗│
│  ║           ⚛️                   ║│  Height: 128px
│  ║          (Icon)                ║│  Gradient background
│  ╚════════════════════════════════╝│
│                                    │
│  [Web Development]                 │  Badge: Category
│                                    │
│  React Fundamentals                │  Title: Bold
│  Learn the basics of React...      │  Description: 2 lines
│                                    │
│  ⭐ 4.5                            │  Rating & score
│  ―――――――――――――――――――――――――――――――  │  Divider
│  By Jane Smith                     │  Author
│                                    │
│  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  │  Hover indicator
└────────────────────────────────────┘
```

**Width**: Responsive, min 320px  
**Background**: Slate 800 (#1e293b)  
**Border**: Slate 700, hover → indigo  
**Radius**: 2xl (rounded-2xl)  

### Icon Section

- **Background**: Gradient indigo to purple
- **Icon**: Large emoji (text-6xl)
- **Hover**: Scale up animation
- **Pattern**: Optional background pattern

### Content Section

- **Padding**: 1.25rem
- **Spacing**: 1rem gaps between sections

### Badge

```
[Web Development]

Background: Indigo 600/20
Border: Indigo 500/30
Text: Indigo 300
Font: xs, semibold
Border-radius: full
```

### Title

- **Font**: Bold, lg (1.125rem)
- **Color**: White, hover → indigo
- **Lines**: Max 2 line clamp
- **Transition**: Smooth color change

### Description

- **Font**: sm (.875rem)
- **Color**: Slate 400
- **Lines**: Max 2 line clamp
- **Overflow**: ellipsis

### Rating Stars

```
⭐ ⭐ ⭐ ⭐ ☆ 4.5

Filled: Yellow/Gold
Empty: Slate 500
Score: Slate 500 text
```

### Author

```
By Jane Smith

Color: Slate 400 for "By"
Color: Slate 300 for name (bold)
Font: xs (.75rem)
```

### Hover Effects

- **Transform**: -translate-y-1 (move up)
- **Shadow**: shadow-xl indigo-500/20
- **Border**: Change to indigo tint
- **Transition**: 300ms duration

---

## 3. AddCourseModal - Create Course Form

### Modal Structure

```
┌─────────────────────────────────────────────────────┐
│ Add New Course                          [X]         │
│ Create and share your knowledge with others         │
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│ Course Icon                                         │
│ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐  │
│ │📚│ │⚛️│ │🖥️│ │🎨│ │📱│ │🐍│ │🚀│ │⚡│ │🔧│  │
│ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘  │
│                                                     │
│ Course Title *                                      │
│ ┌────────────────────────────────────────────────┐ │
│ │ e.g., React Advanced Patterns      0/100 chars│ │
│ └────────────────────────────────────────────────┘ │
│                                                     │
│ Description *                                       │
│ ┌────────────────────────────────────────────────┐ │
│ │ Describe what students will learn...           │ │
│ │                                    0/500 chars│ │
│ └────────────────────────────────────────────────┘ │
│                                                     │
│ Category *                                          │
│ ┌──────────────────────────────────────────────┐   │
│ │ Select a category...                 ▼       │   │
│ └──────────────────────────────────────────────┘   │
│                                                     │
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ [ Cancel ]              [ Create Course ]           │
└─────────────────────────────────────────────────────┘
```

### Header

- **Title**: H2, font bold, white
- **Subtitle**: Text sm, slate 400
- **Close Button**: X icon, hover bg slate 700
- **Sticky**: Top of modal, backdrop blur

### Icon Selector Grid

```
Grid: 10 columns
Spacing: gap-2
Button: p-3, text-2xl, rounded-lg

Selected State:
  Background: Indigo 600
  Ring: Ring-2 ring-indigo-400

Unselected State:
  Background: Slate 700
  Hover: Slate 600
```

### Form Fields

**Title Input**
- Type: text
- Max: 100 characters
- Placeholder: "e.g., React Advanced Patterns"
- Validation: Required, max length
- Character counter: Dynamic display

**Description Textarea**
- Rows: 4
- Max: 500 characters
- Placeholder: "Describe what students will learn..."
- Resize: Disabled (resize-none)
- Validation: Required, max length

**Category Select**
- Options: 8 predefined categories
- Required: Yes
- Default: "Select a category..."
- Validation: Must select

### Error Handling

```
Field with error:
  Border: Red 500
  Ring: Red 500/20

Error message:
  Color: Red 400
  Font: sm (.875rem)
  Position: Below field
```

### Form Actions

```
┌─────────────┐  ┌──────────────────┐
│   Cancel    │  │  Create Course   │
└─────────────┘  └──────────────────┘

Cancel Button:
  Background: Slate 700
  Hover: Slate 600
  Text: White, semibold

Create Button:
  Background: Indigo 600
  Hover: Indigo 700
  Text: White, semibold
```

### Modal Backdrop

- **Color**: Black/50 with backdrop blur
- **Click Outside**: Closes modal
- **Z-index**: 40 (backdrop), 50 (modal)
- **Animation**: Smooth fade-in

---

## 4. TabToggle Component

### Visual

```
┌─────────────━━━━━━━━━━──────────────┐
│ ┌──────────────────┐ ┌────────────┐ │
│ │ All Courses      │ │ My Courses │ │
│ │ (Active)         │ │            │ │
│ └──────────────────┘ └────────────┘ │
└─────────────━━━━━━━━━━──────────────┘

Active Tab:
  Background: Indigo 600
  Text: White
  Shadow: Indigo-600/40 drop shadow
  
Inactive Tab:
  Text: Slate 300
  Hover: Slate/white transition
  Background: None
```

### Props

```javascript
{
  tabs: [
    { id: 'all', label: 'All Courses' },
    { id: 'authenticated', label: 'My Courses' }
  ],
  activeTab: 'all',
  onTabChange: (tabId) => setActiveTab(tabId)
}
```

---

## 5. Empty State - No Courses

### Display

```
┌─────────────────────────────────────┐
│                                     │
│             📚                      │
│                                     │
│        No Courses Found             │
│                                     │
│   Try adjusting your search terms   │
│                                     │
│        [ Clear Search ]             │
│                                     │
└─────────────────────────────────────┘
```

**Icon**: Large emoji (text-3xl)  
**Heading**: H3, white, semibold  
**Message**: Slate 400  
**Button**: Optional, context-dependent  

### Variants

**No Courses (All View)**
```
Message: "Try adjusting your search terms"
```

**No Courses (My Courses View)**
```
Message: "You haven't created any courses yet. Start by adding your first course!"
Button: "Create First Course"
```

---

## 6. Color Palette Reference

### Primary Colors

| Name | Use | Hex | RGB |
|------|-----|-----|-----|
| Indigo 600 | Primary buttons, highlights | #4f46e5 | 79, 70, 229 |
| Indigo 700 | Hover states | #4338ca | 67, 56, 202 |
| Purple 600 | Gradient accents | #9333ea | 147, 51, 234 |

### Background Colors

| Name | Use | Hex |
|------|-----|-----|
| Slate 900 | Page background | #0f172a |
| Slate 800 | Cards, modal | #1e293b |
| Slate 700 | Inputs, hover | #334155 |

### Text Colors

| Name | Use | Hex |
|------|-----|-----|
| White | Primary text | #ffffff |
| Slate 400 | Secondary text | #cbd5e1 |
| Slate 500 | Tertiary text | #64748b |

### Accent Colors

| Name | Use | Hex |
|------|-----|-----|
| Yellow 400 | Star rating | #facc15 |
| Red 400 | Errors | #f87171 |
| Green 400 | Success | #4ade80 |

---

## 7. Responsive Behavior

### Desktop (1280px+)

```
┌────────────────────────────────────────┐
│ Courses (centered, max-w-7xl)          │
│ ┌─┐ ┌──────────────┐ ┌── Add Course ─┐│
│ │▼│ All   My       │ └─────────────────┘│
│ └─┘                │                    │
│ 🔍 Search...                            │
│                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ Card 1   │ │ Card 2   │ │ Card 3   │ │
│ └──────────┘ └──────────┘ └──────────┘ │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ Card 4   │ │ Card 5   │ │ Card 6   │ │
│ └──────────┘ └──────────┘ └──────────┘ │
└────────────────────────────────────────┘

Grid: 3 columns
Card Width: ~320px
Gap: 24px
```

### Tablet (768px - 1279px)

```
┌──────────────────────────┐
│ Courses                  │
│ ┌─┐ All   My             │
│ │▼│                      │
│ └─┘ 🔍 Search...         │
│     ┌──────────────┐     │
│     │ + Add Course │     │
│     └──────────────┘     │
│                          │
│ ┌───────────┐ ┌────────┐ │
│ │ Card 1    │ │ Card 2 │ │
│ └───────────┘ └────────┘ │
│ ┌───────────┐ ┌────────┐ │
│ │ Card 3    │ │ Card 4 │ │
│ └───────────┘ └────────┘ │
└──────────────────────────┘

Grid: 2 columns
Gap: 16px
```

### Mobile (< 768px)

```
┌──────────────┐
│ Courses      │
│              │
│ All    My    │
│              │
│ 🔍 Search... │
│              │
│ ┌──────────┐ │
│ │+ Add     │ │
│ │Course    │ │
│ └──────────┘ │
│              │
│ ┌──────────┐ │
│ │ Card 1   │ │
│ └──────────┘ │
│ ┌──────────┐ │
│ │ Card 2   │ │
│ └──────────┘ │
│ ┌──────────┐ │
│ │ Card 3   │ │
│ └──────────┘ │
└──────────────┘

Grid: 1 column
Padding: 1rem
Buttons: Full width
```

---

## 8. Interaction States

### Button States

**Default**
```
Background: Indigo 600
Text: White
Cursor: pointer
Shadow: Soft shadow
```

**Hover**
```
Background: Indigo 700 (darker)
Transform: translateY(-2px) (raised)
Shadow: Larger, more prominent
Opacity: No change
```

**Active/Pressed**
```
Transform: translateY(0) (back to normal)
Background: Indigo 800 (even darker)
```

**Disabled** (if applicable)
```
Background: Slate 600
Opacity: 0.6
Cursor: not-allowed
```

### Input Focus States

**Default**
```
Border: Slate 600
Background: Slate 700
Ring: None
```

**Focus**
```
Border: Indigo 500
Ring: Indigo 500 with 0.2 opacity
Background: Slate 700 lighter
Outline: None (handled by ring)
```

**Error**
```
Border: Red 500
Ring: Red 500 with 0.2 opacity
Text: Red 400
```

---

## 9. Animation Effects

### Slide In Down
```
From: opacity-0, translateY(-20px)
To: opacity-100, translateY(0)
Duration: 0.6s
Easing: ease-out
```

### Slide In Up
```
From: opacity-0, translateY(20px)
To: opacity-100, translateY(0)
Duration: 0.6s
Easing: ease-out
Stagger: 0.1s between items
```

### Fade In
```
From: opacity-0
To: opacity-100
Duration: 0.5s
Easing: ease-out
```

### Hover Card Lift
```
Transform: translateY(-4px)
Shadow: Increases to shadow-xl
Duration: 0.3s
```

### Icon Scale
```
transform: scale(1.1) on group-hover
Duration: 0.3s
```

---

## 10. Accessibility Features

### Focus Management
- Visible focus rings on all interactive elements
- Tab order follows logical flow
- Focus trap in modal

### Color Contrast
- White on dark backgrounds: WCAG AA compliant
- Text size appropriate for readability
- Icons paired with text labels

### Semantic HTML
```html
<button>Create Course</button>
<input type="text" placeholder="...">
<label for="title">Course Title</label>
<select aria-label="Category">
```

### ARIA Labels
- Modal: role="dialog"
- Close button: aria-label="Close modal"
- Tab buttons: aria-selected="true/false"

---

This visual reference guide provides a complete overview of the Courses UI components and their design specifications.
