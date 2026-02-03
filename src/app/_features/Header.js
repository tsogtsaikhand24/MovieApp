"use client";

import React, { useState, useEffect } from "react";
import Filmicon from "../_icons/Filmicon";
import Filmtitle from "../_icons/Filmtitle";
import Moonicon from "../_icons/Moonicon";
import { Genre } from "../_components/Genre";
import Search from "../_components/Search";
import Link from "next/link";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="w-full min-h-9 p-4 flex justify-between items-center mb-6 pl-20 pr-20  transition-colors duration-300  ">
      <Link
        href="/"
        className="flex gap-2 items-center cursor-pointer hover:opacity-80 transition"
      >
        <div className="w-[18px] h-[19px]">
          <Filmicon />
        </div>
        <div className="w-16 h-5 flex items-center">
          <Filmtitle />
        </div>
      </Link>

      <div className="flex w-[488px] min-h-9 gap-4">
        <div className="w-[97px] border flex items-center justify-center rounded-md border-[#e4e4e7] py-1 pr-4 pl-4 dark:border-gray-300">
          <Genre />
        </div>

        <Search />
      </div>

      <button
        onClick={toggleTheme}
        className="border w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-200 cursor-pointer dark:border-gray-700 transition"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <span className="text-yellow-400 text-lg">☀</span>
        ) : (
          <Moonicon />
        )}
      </button>
    </header>
  );
};
