import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // ensure totalPages is a valid positive integer
  const validTotalPages =
    Number.isFinite(totalPages) && totalPages > 0 ? Math.floor(totalPages) : 1;

  if (validTotalPages <= 1) return null; // hide pagination if only 1 page

  useEffect(() => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    scrollToTop();
  }, [currentPage]);

  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 bg-neutral-900 text-white rounded-lg border border-neutral-800 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-900 cursor-pointer transition-all duration-200 font-medium text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {[...Array(validTotalPages)].map((_, index) => {
          const pageNum = index + 1;
          const isActive = pageNum === currentPage;

          if (
            pageNum === 1 ||
            pageNum === validTotalPages ||
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-black"
                    : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800"
                }`}
              >
                {pageNum}
              </button>
            );
          } else if (
            pageNum === currentPage - 2 ||
            pageNum === currentPage + 2
          ) {
            return (
              <span key={pageNum} className="text-neutral-600 px-1">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === validTotalPages}
        className="flex items-center gap-1 px-4 py-2 bg-neutral-900 text-white rounded-lg border border-neutral-800 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-900 cursor-pointer transition-all duration-200 font-medium text-sm"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
