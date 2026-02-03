import { IoClose, IoSearchOutline } from "react-icons/io5";
export const Input = ({
  onChange,
  value,
  mobileSearch,
  onClick,
  setMobileSearch,
  SetInputValue,
  setSearch,
}) => {
  return (
    <div
      className={`flex gap-2.5 items-center shadow-sm border border-[#c5c5c8] rounded-md px-2 py-1.5 ${
        mobileSearch ? "w-70 justify-between" : ""
      }`}
    >
      <div className="flex items-center gap-2.5 max-xs:gap-1">
        <IoSearchOutline
          className="text-xl max-md:cursor-pointer"
          onClick={onClick}
        />
        <input
          type="text"
          className={`outline-none ${
            mobileSearch ? "block" : "hidden md:block"
          }`}
          placeholder="Search..."
          onChange={onChange}
          value={value}
        />

        {mobileSearch && (
          <button
            onClick={() => {
              setMobileSearch(false);
              SetInputValue("");
              setSearch([]);
            }}
            className="text-2xl text-gray-600 hover:text-black"
          >
            <IoClose />
          </button>
        )}
      </div>
    </div>
  );
};
