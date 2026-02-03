import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export const Panigation = ({ page, setPage, totalPages }) => {
  // Show fewer buttons on small screens
  const isSmall = typeof window !== "undefined" && window.innerWidth < 640;
  const range = isSmall ? 2 : 3;

  return (
    <div className="flex justify-end items-center gap-2 mt-6">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="p-2 border rounded-md shadow disabled:opacity-50 flex items-center bg-white text-black border-gray-300 dark:text-white dark:border-gray-700 dark:bg-gray-800"
      >
        <FaAngleLeft />
        <span className="hidden sm:inline">Prev</span>
      </button>

      <button
        onClick={() => setPage(1)}
        className={`px-3 py-1 border rounded-md shadow
          ${
            page === 1
              ? "bg-indigo-600 text-white"
              : "bg-white text-black border-gray-300 dark:bg-gray-800 ark:border-gray-700 dark:text-white"
          }`}
      >
        1
      </button>

      {page > range && (
        <span className="px-2 text-black dark:text-white">...</span>
      )}

      {Array.from({ length: range }, (_, i) => page - 1 + i)
        .filter((p) => p > 1 && p < totalPages)
        .map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded-md shadow
              ${
                p === page
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
              }`}
          >
            {p}
          </button>
        ))}

      {page < totalPages - (range - 1) && (
        <span className="px-2 text-black dark:text-white">...</span>
      )}

      {totalPages > 1 && (
        <button
          onClick={() => setPage(totalPages)}
          className={`px-3 py-1 border rounded-md shadow
            ${
              page === totalPages
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
            }`}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="p-2 border rounded-md shadow disabled:opacity-50 flex items-center bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
      >
        <span className="hidden sm:inline">Next</span>
        <FaAngleRight />
      </button>
    </div>
  );
};
