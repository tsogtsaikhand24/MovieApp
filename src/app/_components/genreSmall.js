"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const GenreSmall = ({ buttonText, genreId, genreName }) => {
  const [genreMovies, setGenreMovies] = useState([]);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/genreResults/${genreId}`);
  };

  const getGenreMovies = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=1`,
        options
      );
      const jsonData = await data.json();
      console.log("Movies for genre ID", genreId, ":", jsonData);
      if (jsonData.results) {
        setGenreMovies(jsonData.results);
      } else {
        setGenreMovies([]);
      }
    } catch (error) {
      console.error("Failed to fetch movies for genre ID", genreId, ":", error);
      setGenreMovies([]);
    }
  };
  useEffect(() => {
    getGenreMovies();
  }, []);
  return (
    <button
      className={`rounded-4xl shadow bg-[#f9f9f9] flex items-center px-4 py-1 gap-2.5 active:scale-95 text-xs dark:bg-[#27272a]
        ${
          buttonText === genreName
            ? "bg-black text-white dark:bg-white dark:text-black"
            : ""
        }`}
      onClick={handleClick}
    >
      {buttonText}
      <FaAngleRight />
    </button>
  );
};
