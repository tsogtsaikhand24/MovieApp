"use client";
import { useEffect, useState } from "react";
import { Genre } from "../_components/genre";
import { Input } from "../_components/input";
import { Logo } from "../_components/logo";
import { GenrePopUP } from "../_components/genrePopUp";
import { SearchPopUp } from "../_components/searchPopUp";
import { SearchLoader } from "../_components/searchLoader";
import { ThemeToggle } from "../_components/themeToggle";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const Header = () => {
  const [openGenre, setOpenGenre] = useState(false);
  const [inputValue, SetInputValue] = useState("");
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleInput = (e) => {
    SetInputValue(e.target.value);
    console.log(inputValue);
  };
  const getMovies = async () => {
    setLoading(true);
    if (!inputValue.trim()) {
      setSearch([]);
      setLoading(false);
      return;
    }
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${inputValue}&language=en-US&page=1`,
      options
    );

    const jsonData = await data.json();
    console.log("this is search data", jsonData);
    setSearch(jsonData.results.slice(0, 5));
    console.log("search", search);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, [inputValue]);
  return (
    <div className="w-full bg-[#f5f5f7] h-18 flex items-center px-7 justify-between z-20 dark:bg-black">
      {!mobileSearch && <Logo />}
      <div
        className={`flex flex-col relative w-[60%] max-md:w-fit h-9 gap-2 ${
          mobileSearch ? "max-md:w-full" : ""
        }`}
      >
        <div className="flex md:justify-between max-md:gap-5">
          <div
            className={`flex gap-3.5 max-xs:gap-1.5 ${
              mobileSearch ? "w-full flex justify-center items-center" : ""
            }`}
          >
            <Genre
              onClick={() => setOpenGenre(!openGenre)}
              mobileSearch={mobileSearch}
            />
            <Input
              onChange={handleInput}
              value={inputValue}
              mobileSearch={mobileSearch}
              onClick={() => setMobileSearch((prev) => !prev)}
              setMobileSearch={setMobileSearch}
              SetInputValue={SetInputValue}
              setSearch={setSearch}
            />
          </div>
          {!mobileSearch && <ThemeToggle />}
        </div>
        {openGenre && <GenrePopUP />}
        {loading ? (
          <SearchLoader />
        ) : search.length > 0 ? (
          <SearchPopUp search={search} inputValue={inputValue} />
        ) : inputValue.trim() ? (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow rounded-lg p-4 text-center text-gray-500 md:w-150 mt-2.5 dark:bg-black">
            No results found
          </div>
        ) : null}
      </div>
    </div>
  );
};
