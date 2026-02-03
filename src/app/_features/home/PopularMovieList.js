"use client";
import { MovieCard } from "@/app/_components/MovieListCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export function PopularMovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
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

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleSeeMore = () => {
    router.push("/movies/popular");
  };

  return (
    <div className="w-<fraction> h-<fraction> flex justify-center">
      <div className="p-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular</h2>
          <button
            onClick={handleSeeMore}
            className="text-sm text-gray-600 flex items-center gap-2 cursor-pointer hover:text-black transition"
          >
            See more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={11}
              height={11}
              fill="none"
            >
              <path
                stroke="#18181B"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M.5 5.167h9.333m0 0L5.167.5m4.666 4.667L5.167 9.833"
              />
            </svg>
          </button>
        </div>
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
      </div>
    </div>
  );
}
