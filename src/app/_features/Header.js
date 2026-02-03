"use client";

import MovieZIcon from "../_Icons/MovieZIcon";
import { HeaderGenre } from "./HeaderGenre";
import { useRouter } from "next/navigation";
import { HeaderSearch } from "../_components/HeaderSearch";
import { DarkMode } from "../_components/DarkMode";
import { useMediaQuery } from "react-responsive";
import { HeaderMobileSearch } from "../_components/HeaderMobileSearch";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleClickMovieZButton = () => {
    router.push(`/`);
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 640px)",
  });

  console.log("isMobile", isMobile);

  return (
    <div className="w-full h-[56px] sm:h-[59px] flex items-center justify-center py-3 sm:py-4 px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-[1280px] h-auto flex justify-between items-center gap-4">
        {!isOpen && (
          <div
            className="flex gap-1.5 sm:gap-2 items-center text-[#4338CA] dark:text-[#818CF8] text-sm sm:text-base italic font-bold leading-[20px] tracking-[0.32px] cursor-pointer shrink-0 justify-center"
            onClick={handleClickMovieZButton}
          >
            <MovieZIcon />
            Movie Z
          </div>
        )}
        <div className="flex gap-2 sm:gap-3 items-end flex-1 justify-end sm:justify-center  md:justify-center lg:justify-center">
          <div className="hidden lg:flex gap-3 ">
            <HeaderGenre />
            <HeaderSearch />
          </div>
          <HeaderMobileSearch isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        {!isOpen && (
          <div className="shrink-0">
            <DarkMode />
          </div>
        )}
      </div>
    </div>
  );
};
