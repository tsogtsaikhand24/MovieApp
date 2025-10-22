import Moviezicon from "./_icons/Moviezicon";
import MoonIcon from "./_icons/MoonIcon";
import { Search } from "lucide-react";
import { GenreDropdown } from "./_components/GenreDropdown"; // 👈 шинэ dropdown импорт
import React from "react";

export const Header = () => {
  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <div className="w-[1220px] h-[36px] flex flex-row justify-between items-center">
        {/* 🔹 Зүүн хэсэг — Logo */}
        <div className="w-[366px] h-[36px] gap-[8px] bg-white flex justify-start items-center">
          <Moviezicon />
          <div className="text-indigo-700 font-[Inter] italic text-lg">
            Movie Z
          </div>
        </div>

        {/* 🔸 Дунд хэсэг — Genre + Search */}
        <div className="w-[488px] h-[36px] flex flex-row justify-between items-center gap-3">
          {/* Genre dropdown */}
          <div className="w-[97px] h-[36px] flex justify-center items-center rounded-[8px] border-[2px] border-gray-100 bg-gray-100">
            <GenreDropdown />
          </div>

          {/* Search box */}
          <div className="w-[379px] h-[36px] flex items-center rounded-[8px] border-[2px] border-gray-200 bg-gray-100 px-3 gap-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full h-full bg-transparent text-gray-500 text-sm placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* 🌙 Баруун хэсэг — Dark mode icon */}
        <div className="w-[366px] h-[36px] bg-white flex justify-end items-center">
          <div className="rounded-[8px] w-[36px] h-[36px] flex justify-center items-center border-[2px] border-gray-300 bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
            <MoonIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
