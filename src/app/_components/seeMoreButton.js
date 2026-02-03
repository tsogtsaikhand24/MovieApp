import { FiArrowRight } from "react-icons/fi";

export const SeeMoreButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-medium rounded-xl bg-gray-100 shadow-sm hover:bg-gray-200 transition-colors duration-200 dark:bg-[#27272a] max-sm:px-2 max-sm:py-1 curser-pointer z-30"
    >
      See more
      <FiArrowRight className="size-5 sm:size-6" />
    </button>
  );
};
