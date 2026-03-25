import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";

const CATEGORIES = [
  "Web Development",
  "Backend",
  "Web Design",
  "Programming",
  "Mobile Development",
  "Data Science",
  "DevOps",
  "UI/UX Design",
];

const AddCourseModal = ({ isOpen, onClose, onAddCourse }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    icon: "📚",
  });
  const [errors, setErrors] = useState({});

  const icons = ["📚", "⚛️", "🖥️", "🎨", "📱", "🐍", "🚀", "⚡", "🔧", "🧠"];

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.title.length > 100)
      newErrors.title = "Title must be less than 100 characters";
    if (formData.description.length > 500)
      newErrors.description = "Description must be less than 500 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddCourse(formData);
      setFormData({
        title: "",
        description: "",
        category: "",
        icon: "📚",
      });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/95 backdrop-blur-sm">
            <div>
              <h2 className="text-2xl font-bold text-white">Add New Course</h2>
              <p className="text-slate-400 text-sm mt-1">
                Create and share your knowledge with others
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <HiOutlineX className="w-6 h-6" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Icon Selector */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Course Icon
              </label>
              <div className="grid grid-cols-10 gap-2">
                {icons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, icon }))}
                    className={`p-3 text-2xl rounded-lg transition-all ${
                      formData.icon === icon
                        ? "bg-indigo-600 ring-2 ring-indigo-400"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-white mb-2"
              >
                Course Title *
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., React Advanced Patterns"
                maxLength="100"
                className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.title
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              />
              <div className="flex justify-between mt-1">
                <span
                  className={
                    errors.title
                      ? "text-red-400 text-sm"
                      : "text-slate-500 text-xs"
                  }
                >
                  {errors.title || `${formData.title.length}/100 characters`}
                </span>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-white mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what students will learn in this course..."
                maxLength="500"
                rows="4"
                className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 resize-none transition-all ${
                  errors.description
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              />
              <div className="flex justify-between mt-1">
                <span
                  className={
                    errors.description
                      ? "text-red-400 text-sm"
                      : "text-slate-500 text-xs"
                  }
                >
                  {errors.description ||
                    `${formData.description.length}/500 characters`}
                </span>
              </div>
            </div>

            {/* Category Field */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-white mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.category
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              >
                <option value="">Select a category...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-400 text-sm mt-1 block">
                  {errors.category}
                </span>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCourseModal;
