"use client";

import SearchIcon from "../_Icons/SearchIcon";
import { HeaderSearch } from "./HeaderSearch";
import EscIcon from "../_Icons/EscIcon";
import { useState } from "react";
import { HeaderGenre } from "../_features/HeaderGenre";

export const HeaderMobileSearch = ({ setIsOpen, isOpen }) => {
  const [genreOpen, setGenreOpen] = useState();

  const handleClickSearchButton = () => {
    setIsOpen(true);
  };

  const handleClickEscButton = () => {
    setIsOpen(false);
  };

  console.log("genreOpen", genreOpen);
  return (
    <div className="relative lg:hidden md:hidden">
      {!isOpen && (
        <div
          className="w-9 h-9 border border-[#E4E4E7] dark:border-[#27272A] rounded-md flex items-center justify-center cursor-pointer"
          onClick={handleClickSearchButton}
        >
          <SearchIcon />
        </div>
      )}

      {isOpen && (
        <div className="flex w-full h-[40px] items-center gap-2">
          <HeaderGenre />
          <div className="flex-1">
            <HeaderSearch />
          </div>

          <button
            className="w-9 h-9 flex items-center justify-center cursor-pointer"
            onClick={handleClickEscButton}
          >
            <EscIcon />
          </button>
        </div>
      )}
    </div>
  );
};
