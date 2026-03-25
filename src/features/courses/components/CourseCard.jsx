import { HiOutlineStar, HiStar } from "react-icons/hi";

const CourseCard = ({ course }) => {
  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star}>
            {star <= Math.floor(rating) ? (
              <HiStar className="w-4 h-4 text-yellow-400" />
            ) : (
              <HiOutlineStar className="w-4 h-4 text-slate-500" />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="group bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-slate-700 hover:border-indigo-500/50">
      {/* Header with Icon Background */}
      <div className="h-32 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern" />
        </div>
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300 z-10">
          {course.icon || "📚"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Category Badge */}
        <div>
          <span className="inline-block px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold rounded-full">
            {course.category}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-bold text-lg text-white line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {course.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          {renderStars(course.rating)}
          <span className="text-xs text-slate-500">
            {course.rating.toFixed(1)}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-700" />

        {/* Author */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            By{" "}
            <span className="font-semibold text-slate-300">
              {course.author}
            </span>
          </span>
        </div>
      </div>

      {/* Hover Action */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default CourseCard;
