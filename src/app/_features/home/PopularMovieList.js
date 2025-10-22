"use client";

import { MovieCard } from "@/app/_components/Moviecard";
import React, { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const PopularMovieList = () => {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); // анх 10-г харуулах

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/popular?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  const showAll = () => setVisibleCount(movies.length);

  return (
    <div className="w-[1300px] h-[978px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Popular</h2>
        {movies.length > visibleCount && (
          <button
            onClick={showAll}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border rounded-lg px-3 py-1 shadow-sm"
          >
            See more
          </button>
        )}
      </div>

      <div className="grid grid-cols-5 grid-rows-2 gap-10 justify-center items-center">
        {movies.slice(0, visibleCount).map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.vote_average.toFixed(1)}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};
