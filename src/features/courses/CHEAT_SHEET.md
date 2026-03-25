# 🎯 Courses Feature - Developer Cheat Sheet

Quick reference guide for developers working with the Courses feature.

---

## 🚀 Quick Start (30 seconds)

1. **Navigate to courses page**: `http://localhost:5173/courses`
2. **Create a course**: Click "+ Add Course" button
3. **Switch view**: Click "My Courses" tab
4. **Search courses**: Type in search bar
5. **Done!** ✅

---

## 📦 Import Statements

```jsx
// Import main page
import { CoursesPage } from '@/features/courses';

// Import components
import { CourseCard } from '@/features/courses/components';
import { AddCourseModal } from '@/features/courses/components';
import { TabToggle } from '@/components/ui';

// Import service
import { coursesService } from '@/features/courses/services/coursesService';

// Import Redux
import { fetchCourses } from '@/features/courses/store/coursesSlice';
```

---

## 🔧 Common Component Usage

### CoursesPage

```jsx
<CoursesPage />
// Already routed at /courses
// No props needed
```

### CourseCard

```jsx
<CourseCard 
  course={{
    id: '1',
    title: 'React Basics',
    description: 'Learn React',
    category: 'Web Development',
    rating: 4.5,
    author: 'John',
    userId: 'user-1',
    icon: '⚛️'
  }}
/>
```

### AddCourseModal

```jsx
const [isOpen, setIsOpen] = useState(false);

<AddCourseModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onAddCourse={(courseData) => {
    console.log(courseData);
    // { title, description, category, icon }
  }}
/>
```

### TabToggle

```jsx
const [activeTab, setActiveTab] = useState('all');

<TabToggle
  tabs={[
    { id: 'all', label: 'All Courses' },
    { id: 'my', label: 'My Courses' }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

---

## 📊 Data Structure

### Course Object

```javascript
{
  id: string,
  title: string,           // max 100 chars
  description: string,     // max 500 chars
  category: string,        // must be from CATEGORIES
  rating: number,          // 0-5
  author: string,
  userId: string,
  icon?: string            // emoji
}
```

### MOCK_USER

```javascript
{
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com'
}
```

### CATEGORIES

```javascript
[
  'Web Development',
  'Backend',
  'Web Design',
  'Programming',
  'Mobile Development',
  'Data Science',
  'DevOps',
  'UI/UX Design'
]
```

### ICONS

```javascript
['📚', '⚛️', '🖥️', '🎨', '📱', '🐍', '🚀', '⚡', '🔧', '🧠']
```

---

## 🎨 Styling Classes

### Primary Colors

```css
/* Indigo */
bg-indigo-600     /* Main button color */
bg-indigo-700     /* Hover state */
text-indigo-400   /* Active text */
border-indigo-500 /* Borders */

/* Slate */
bg-slate-900      /* Page background */
bg-slate-800      /* Cards */
text-slate-400    /* Secondary text */
```

### Responsive

```css
/* Desktop */
grid-cols-3

/* Tablet */
md:grid-cols-2

/* Mobile */
sm:grid-cols-1
```

---

## 🔄 State Management

### Local State (CoursesPage)

```jsx
const [courses, setCourses] = useState(INITIAL_COURSES);
const [activeTab, setActiveTab] = useState('all');
const [searchQuery, setSearchQuery] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);
```

### Redux Usage

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '@/features/courses/store/coursesSlice';

const dispatch = useDispatch();
const { courses, loading, error } = useSelector(s => s.courses);

useEffect(() => {
  dispatch(fetchCourses());
}, [dispatch]);
```

---

## 🔍 Common Operations

### Filter Courses

```javascript
// By user
const userCourses = courses.filter(c => c.userId === userId);

// By category
const categoryFilter = courses.filter(c => c.category === category);

// By search
const searchResults = courses.filter(c =>
  c.title.includes(search) || c.description.includes(search)
);

// Combined
const combined = courses
  .filter(c => c.userId === userId && c.category === cat)
  .filter(c => c.title.includes(search));
```

### Add Course

```javascript
const handleAddCourse = (formData) => {
  const newCourse = {
    id: Date.now().toString(),
    ...formData,
    userId: MOCK_USER.id,
    rating: 5,
    author: MOCK_USER.name
  };
  setCourses([...courses, newCourse]);
};
```

### Delete Course

```javascript
const handleDeleteCourse = (courseId) => {
  setCourses(courses.filter(c => c.id !== courseId));
};
```

### Update Course

```javascript
const handleUpdateCourse = (courseId, updates) => {
  setCourses(courses.map(c =>
    c.id === courseId ? { ...c, ...updates } : c
  ));
};
```

---

## 🌐 API Service

### CoursesService Methods

```javascript
import { coursesService } from '@/features/courses/services/coursesService';

// GET /courses
await coursesService.getAll({ page: 1, limit: 10 });

// GET /courses/:id
await coursesService.getById(courseId);

// POST /courses
await coursesService.create({ title, description, category });

// PUT /courses/:id
await coursesService.update(courseId, { title, description });

// DELETE /courses/:id
await coursesService.delete(courseId);
```

---

## 🐛 Debugging

### Check State
```jsx
// React DevTools
// Inspect component state in DevTools

console.log('Courses:', courses);
console.log('Active Tab:', activeTab);
console.log('Search:', searchQuery);
```

### Check Rendering
```jsx
// Add console logs
useEffect(() => {
  console.log('Courses changed:', courses);
}, [courses]);
```

### Network Requests
```jsx
// Check Network tab in DevTools
// Look for /courses requests
// Check response data
```

---

## ⚠️ Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Courses not showing | `INITIAL_COURSES` empty | Add sample data |
| Search not working | Filter logic wrong | Check filter in useMemo |
| Modal won't open | `isOpen` not updating | Verify setState call |
| Styling missing | CSS not imported | Add import in component |
| User courses empty | userId mismatch | Check MOCK_USER.id |

---

## 📝 File Locations

```
Core Files:
- src/features/courses/pages/CoursesPage.jsx
- src/features/courses/components/CourseCard.jsx
- src/features/courses/components/AddCourseModal.jsx

UI Components:
- src/components/ui/TabToggle.jsx

Services & State:
- src/features/courses/services/coursesService.js
- src/features/courses/store/coursesSlice.js

Styling:
- src/features/courses/styles/courses.css

Documentation:
- src/features/courses/COURSES_README.md
- src/features/courses/QUICK_START.md
- src/features/courses/UI_REFERENCE.md
```

---

## 🎯 Props Reference

### CoursesPage Props
```
None (standalone component)
```

### CourseCard Props
```
course: CourseObject (required)
  - id: string
  - title: string
  - description: string
  - category: string
  - rating: number
  - author: string
  - userId: string
  - icon?: string
```

### AddCourseModal Props
```
isOpen: boolean (required)
onClose: () => void (required)
onAddCourse: (courseData) => void (required)
```

### TabToggle Props
```
tabs: Array<{id: string, label: string}> (required)
activeTab: string (required)
onTabChange: (tabId: string) => void (required)
```

---

## 🔐 Authentication Integration

### Replace Mock User

**Before:**
```jsx
const MOCK_USER = { id: 'user-123', name: 'John' };
```

**After:**
```jsx
import { useAuth } from '@/features/auth';

export const CoursesPage = () => {
  const { user } = useAuth();
  // Replace MOCK_USER with user
};
```

---

## 📱 Responsive Breakpoints

```
Mobile:    < 480px     (1 column)
Tablet:    480-768px   (1-2 columns)
Desktop:   768-1280px  (2-3 columns)
Large:     > 1280px    (3 columns)
```

---

## 🚀 Performance Tips

1. **Memoize expensive components**
   ```jsx
   export const CourseCard = React.memo(card => (...));
   ```

2. **Use useMemo for filtering**
   ```jsx
   const filtered = useMemo(() => 
     courses.filter(...), [courses, activeTab, search]
   );
   ```

3. **Debounce search input**
   ```jsx
   const debouncedSearch = useCallback(
     debounce(setSearchQuery, 300), []
   );
   ```

4. **Pagination for large lists**
   ```jsx
   const PAGE_SIZE = 10;
   const paginated = courses.slice(0, PAGE_SIZE);
   ```

---

## 🎓 Learning Resources

- React Hooks: https://reactjs.org/docs/hooks-intro
- Redux Toolkit: https://redux-toolkit.js.org/
- Tailwind CSS: https://tailwindcss.com/docs
- Axios: https://axios-http.com/docs

---

## 🔗 Related Files

- Main router: `src/routes/router.jsx`
- UI components: `src/components/ui/`
- Auth hook: `src/features/auth/hooks/useAuth.js`
- Axios instance: `src/services/axiosInstance.js`

---

## ✅ Checklist for New Feature

When adding new course features, complete:

- [ ] Create component file
- [ ] Add component to index.js exports
- [ ] Add TypeScript types if using TS
- [ ] Style with Tailwind classes
- [ ] Add validation if needed
- [ ] Update Redux state if needed
- [ ] Update documentation
- [ ] Test responsiveness
- [ ] Test accessibility
- [ ] Add error handling

---

## 🎉 Quick Commands

```bash
# Navigate to courses
# http://localhost:5173/courses

# Test with React DevTools
# Inspect component props and state

# Test with Network DevTools
# Monitor API calls to /courses

# Test with Console
# Log component state changes

# Mobile test
# Resize browser to test responsiveness
```

---

**Version**: 1.0.0  
**Last Updated**: March 25, 2026  
**Status**: Production Ready

For full documentation, see [COURSES_README.md](./COURSES_README.md)
