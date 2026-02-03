// HeroSectionLoader.jsx
import React from "react";

export const HeroSectionLoader = ({ total }) => {
  return (
    <div className="w-full aspect-[16/9] lg:aspect-[1440/600] relative flex items-center justify-center max-md:flex-col max-md:aspect-auto max-md:justify-between animate-pulse">
      {/* Background Image Placeholder */}
      <div className="w-full h-full bg-gray-300 dark:bg-gray-700 absolute max-md:relative max-md:h-64 rounded-lg"></div>

      {/* Content Placeholder */}
      <div className="flex flex-col w-[92%] lg:w-[80%] h-fit z-10 gap-3 max-md:gap-4 lg:gap-6 text-white max-md:text-black max-md:p-4 dark:max-md:text-white md:hidden">
        {/* Title */}
        <div className="flex flex-col gap-2 md:hidden">
          <div className="h-3 max-md:h-4 lg:h-5 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-6 max-md:h-8 lg:h-12 w-56 max-md:w-full lg:w-2/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="h-5 w-5 bg-gray-400 rounded-full max-md:h-6 max-md:w-6 lg:h-7 lg:w-7"></div>
          <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded max-md:h-5 max-md:w-16 lg:h-6 lg:w-20"></div>
        </div>

        {/* Overview & Button */}
        <div className="flex flex-col gap-2.5 max-w-lg md:hidden">
          <div className="h-12 max-md:h-16 lg:h-20 bg-gray-300 dark:bg-gray-600 rounded w-full line-clamp-3 lg:line-clamp-none"></div>
          <div className="h-10 max-md:h-12 lg:h-14 w-36 max-md:w-44 lg:w-52 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
        </div>
      </div>

      {/* Dots */}
      <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 gap-3">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full bg-gray-500 dark:bg-gray-600`}
          />
        ))}
      </div>
    </div>
  );
};
