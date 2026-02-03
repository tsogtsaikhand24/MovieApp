"use client";
import React, { useEffect, useState } from "react";
import { MovieCard } from "@/app/_components/MovieListCard";

const SkeletonCard = () => {
  return (
    <div className="w-[280px] bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="bg-gray-300 h-[340px] w-full animate-pulse"></div>
      <div className="p-3 bg-[#F4F4F5] h-[100px]">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>
    </div>
  );
};

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function MovieListData({ title, type }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${type}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setMovies(data.results || []);

        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
        setTotalPages(1);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchMovies();
  }, [type, page]);

  const goToPage = (num) => {
    const n = Math.max(1, Math.min(num, totalPages));
    setPage(n);
  };

  const handlePrev = () => goToPage(page - 1);
  const handleNext = () => goToPage(page + 1);

  const getPageItems = () => {
    const pages = [];
    const maxButtons = 7;
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const left = Math.max(2, page - 2);
    const right = Math.min(totalPages - 1, page + 2);

    pages.push(1);

    if (left > 2) {
      pages.push("left-ellipsis");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push("right-ellipsis");
    }

    pages.push(totalPages);
    return pages;
  };

  const pageItems = getPageItems();

  return (
    <div className="w-full max-w-[1600px] p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading
          ? Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)
          : movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average?.toFixed(1)}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            ))}
      </div>

      <div className="flex justify-center items-center mt-10 gap-2 text-gray-700">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
            page === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:text-black"
          }`}
        >
          ‹ Previous
        </button>

        {pageItems.map((item, idx) => {
          if (item === "left-ellipsis" || item === "right-ellipsis") {
            return (
              <span
                key={`${item}-${idx}`}
                className="px-2 text-sm text-gray-500"
              >
                ...
              </span>
            );
          }
          return (
            <button
              key={item}
              onClick={() => goToPage(item)}
              className={`px-3 py-1 text-sm rounded-md font-medium cursor-pointer ${
                page === item
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
            page === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:text-black"
          }`}
        >
          Next ›
        </button>
      </div>
    </div>
  );
}
