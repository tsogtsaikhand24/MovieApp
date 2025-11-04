"use client";

import React, { useEffect, useState } from "react";
import { MovieCard } from "@/app/_components/Moviecard";
import { useRouter } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const MovieGrid = ({
  title = "Movies",
  fetchPath = "/movie/popular",
  initialCount = 10,
  language = "en-US",
  page = 1,
  seeMorePath = "/upcoming",
}) => {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}${fetchPath}?language=${language}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted) setMovies(data.results || []);
      } catch (err) {
        if (isMounted) setError(err.message || "Unknown error");
        console.error("MovieGrid fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMovies();
    return () => {
      isMounted = false;
    };
  }, [fetchPath, language, page]);

  const handleSeeMore = () => {
    router.push(seeMorePath);
  };

  return (
    <div className="w-[1300px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {loading ? null : error ? (
          <div className="text-sm text-red-600">Error: {error}</div>
        ) : movies.length > visibleCount ? (
          <button
            onClick={handleSeeMore}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border rounded-lg px-3 py-1 shadow-sm"
          >
            See more
          </button>
        ) : null}
      </div>

      {loading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : error ? (
        <div className="py-10 text-center text-red-600">Failed to load.</div>
      ) : (
        <div className="grid grid-cols-5 grid-rows-2 gap-10 justify-center items-center">
          {movies.slice(0, visibleCount).map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average?.toFixed(1) ?? "N/A"}
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
