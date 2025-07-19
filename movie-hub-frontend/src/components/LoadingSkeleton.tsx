
const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700/50 animate-pulse"
        >
          <div className="aspect-[3/4] bg-gray-700/50" />
          <div className="p-4">
            <div className="h-6 bg-gray-700/50 rounded mb-2" />
            <div className="flex justify-between mb-3">
              <div className="h-4 bg-gray-700/50 rounded w-16" />
              <div className="h-4 bg-gray-700/50 rounded w-12" />
            </div>
            <div className="flex gap-1 mb-3">
              <div className="h-6 bg-gray-700/50 rounded w-16" />
              <div className="h-6 bg-gray-700/50 rounded w-20" />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-700/50 rounded" />
              <div className="h-3 bg-gray-700/50 rounded w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
