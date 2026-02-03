"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGR...";

export const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json",
        },
      });
      const data = await res.json();
      setGenres(data.genres || []);
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genre) => {
    router.push(`/genre/${genre.id}`);
  };

  return (
    <div className="  p-4 bg-white border-r h-screen sticky top-0 overflow-auto">
      <h3 className="text-lg font-bold mb-4"></h3>

      <div className="grid grid-cols-3 gap-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre)}
            className="text-left text-sm px-3 py-2 rounded-md  hover:bg-gray-100 cursor-pointer transition "
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};
