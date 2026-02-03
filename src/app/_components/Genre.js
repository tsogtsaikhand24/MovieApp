import { FaChevronDown } from "react-icons/fa";

export const Genre = ({ onClick, mobileSearch }) => {
  return (
    <div
      className={`w-fit h-full items-center gap-2 cursor-pointer rounded-md px-4 py-2 shadow-sm border border-[#c5c5c8] 
        ${mobileSearch ? "flex" : "hidden md:flex"}`}
      onClick={onClick}
    >
      <FaChevronDown className="text-base" />
      <span className="text-base font-medium max-lg:hidden">Genre</span>
    </div>
  );
};
