import { LuLoaderCircle } from "react-icons/lu";
export const SearchLoader = () => {
  return (
    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#E4E4E7] rounded-lg shadow-lg h-fit z-50 py-2.5 md:w-150 dark:bg-black">
      <LuLoaderCircle className="animate-spin mx-auto" size={30} />
    </div>
  );
};
