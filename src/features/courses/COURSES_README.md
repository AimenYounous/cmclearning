# 🎓 Courses Feature - Complete Documentation

A comprehensive, modern, and scalable Courses module for the CMC-Learning e-learning platform built with React.js, Tailwind CSS, and Redux.

## 🎯 Features

### Core Features
✅ **All Courses View** - Display all courses in a beautiful grid layout  
✅ **My Courses View** - Filter courses created by the authenticated user  
✅ **Add Course Modal** - Create new courses with validation  
✅ **Search Functionality** - Search courses by title, category, or author  
✅ **Tab Navigation** - Toggle between All Courses and My Courses  
✅ **Rating Display** - Visual star rating for each course  
✅ **Empty State** - User-friendly empty state messages  
✅ **Responsive Design** - Mobile-first, fully responsive layout  

## 📁 Project Structure

```
src/features/courses/
├── components/
│   ├── CourseCard.jsx          # Reusable course card component
│   ├── AddCourseModal.jsx      # Modal for adding new courses
│   └── index.js                # Component exports
├── pages/
│   ├── CoursesPage.jsx         # Main courses page with tab routing
│   ├── CourseDetailsPage.jsx   # Individual course details (existing)
│   └── CoursesPage.jsx         # Course list component
├── store/
│   └── coursesSlice.js         # Redux state management (existing)
├── services/
│   └── coursesService.js       # API calls (existing)
└── index.js                    # Feature exports
```

## 🚀 Getting Started

### Installation

1. **Ensure dependencies are installed:**
```bash
npm install react react-icons
```

2. **Import the CoursesPage in your router:**
```javascript
import { CoursesPage } from '@/features/courses';

// In your router configuration
{
  path: '/courses',
  element: <CoursesPage />
}
```

## 💻 Component API

### CoursesPage
The main page component that manages the entire courses section.

**Props:** None (uses internal state)

**Features:**
- Tab navigation between "All Courses" and "My Courses"
- Search functionality across all course properties
- Add course button opens modal
- Automatic filtering based on selected tab
- Mock authentication with MOCK_USER

**Usage:**
```javascript
<Route path="/courses" element={<CoursesPage />} />
```

### CourseCard
Reusable card component for displaying individual courses.

**Props:**
```javascript
{
  course: {
    id: string,
    title: string,
    description: string,
    category: string,
    rating: number (0-5),
    author: string,
    userId: string,
    icon: string (emoji)
  }
}
```

**Usage:**
```javascript
<CourseCard course={courseData} />
```

### AddCourseModal
Modal component for creating new courses with form validation.

**Props:**
```javascript
{
  isOpen: boolean,           // Controls modal visibility
  onClose: function,         // Called when modal is closed
  onAddCourse: function      // Called with { title, description, category, icon }
}
```

**Usage:**
```javascript
const [isOpen, setIsOpen] = useState(false);

const handleAddCourse = (courseData) => {
  // Process courseData
  setIsOpen(false);
}

<AddCourseModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onAddCourse={handleAddCourse}
/>
```

## 🎨 Styling

The component uses Tailwind CSS with a modern slate and indigo color scheme:

**Color Palette:**
- Primary: `indigo-600` / `indigo-700`
- Secondary: `slate-800` / `slate-900`
- Accent: `purple-600`
- Text: `white` / `slate-400`

**Key Classes:**
- `bg-gradient-to-br` - Gradient backgrounds
- `hover:shadow-xl` - Smooth hover effects
- `transition-all` - Smooth animations
- `backdrop-blur-sm` - Glass effect

## 📊 Data Structure

### Course Object
```javascript
{
  id: string,           // Unique identifier
  title: string,        // Course title (max 100 chars)
  description: string,  // Course description (max 500 chars)
  category: string,     // One of CATEGORIES
  rating: number,       // 0-5 star rating
  author: string,       // Course creator name
  userId: string,       // Creator's user ID
  icon: string          // Emoji icon
}
```

### MockUser
```javascript
{
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com'
}
```

## 🔄 State Management

### Local State (CoursesPage)
```javascript
const [courses, setCourses] = useState(INITIAL_COURSES);
const [activeTab, setActiveTab] = useState('all');
const [searchQuery, setSearchQuery] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);
```

### Modal State (AddCourseModal)
```javascript
const [formData, setFormData] = useState({
  title: '',
  description: '',
  category: '',
  icon: '📚'
});
const [errors, setErrors] = useState({});
```

## 🔍 Search & Filter

The search functionality filters courses across multiple fields:

```javascript
const filteredCourses = courses.filter(course => {
  // First filter by tab (all vs authenticated)
  if (activeTab === 'authenticated') {
    return course.userId === MOCK_USER.id;
  }
  return true;
}).filter(course => {
  // Then filter by search query
  return (
    course.title.includes(query) ||
    course.description.includes(query) ||
    course.category.includes(query) ||
    course.author.includes(query)
  );
});
```

## ✅ Form Validation

The AddCourseModal includes robust validation:

- **Title**: Required, max 100 characters
- **Description**: Required, max 500 characters
- **Category**: Required, must be from CATEGORIES list
- **Icon**: Pre-selected from available emojis

**Error Handling:**
- All errors are displayed inline
- Character counts shown dynamically
- Form prevents submission with invalid data

## 🎯 Categories

Built-in course categories:
- Web Development
- Backend
- Web Design
- Programming
- Mobile Development
- Data Science
- DevOps
- UI/UX Design

Can be extended by modifying the `CATEGORIES` array in `AddCourseModal.jsx`.

## 🖼️ Icons

Available course icons (emojis):
- 📚 Books
- ⚛️ React
- 🖥️ Desktop/Backend
- 🎨 Design
- 📱 Mobile
- 🐍 Python/Data
- 🚀 Deployment
- ⚡ Performance
- 🔧 Tools
- 🧠 AI/ML

## 🔐 Authentication

The component uses mock authentication:

```javascript
const MOCK_USER = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com'
};
```

**To use real authentication**, update CoursesPage to:
```javascript
import { useAuth } from '@/features/auth/hooks/useAuth';

const CoursesPage = () => {
  const { user } = useAuth(); // Use real user instead of MOCK_USER
  // ...
}
```

## 🚀 Performance Optimizations

1. **Memoization**: Consider wrapping CourseCard with `React.memo()`
2. **Lazy Loading**: Implement pagination for large course lists
3. **Search Debounce**: Add debounce to search input for performance

## 📱 Responsive Breakpoints

- **Mobile**: Grid columns = 1
- **Tablet**: Grid columns = 2 (md)
- **Desktop**: Grid columns = 3 (lg)

## 🔧 Customization

### Change Mock User
Update `MOCK_USER` in `CoursesPage.jsx`:
```javascript
const MOCK_USER = {
  id: 'your-id',
  name: 'Your Name',
  email: 'your@email.com'
};
```

### Add More Categories
Update `CATEGORIES` in `AddCourseModal.jsx`:
```javascript
const CATEGORIES = [
  'Web Development',
  'Your Custom Category',
  // ...
];
```

### Customize Colors
Modify Tailwind classes in component files:
- `indigo-600` → Your primary color
- `slate-800` → Your secondary color

## 🐛 Troubleshooting

### Modal not opening?
- Check `isOpen` prop is properly managed
- Verify `onClose` callback is called correctly

### Courses not updating?
- Ensure `handleAddCourse` is properly updating state
- Check React DevTools to verify state changes

### Styling issues?
- Verify Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Ensure `PostCSS` is included in build process

## 📝 Future Enhancements

Potential features to add:
1. ⭐ Course filtering by rating
2. 🔤 Course sorting (by date, popularity, rating)
3. 💾 Persistent storage (localStorage or database)
4. 📤 Course image upload
5. 🏷️ Course tags and metadata
6. 👥 Course collaborators
7. 📊 Course analytics and stats
8. 🎓 Enrollment tracking
9. 💬 Course reviews and comments
10. 🔔 Notifications for new courses

## 📄 License

Part of CMC-Learning project.

## 👨‍💻 Support

For issues or questions, refer to the main project documentation or create an issue in the repository.
