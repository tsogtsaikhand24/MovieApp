"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

function SimilarMoviesSkeleton() {
  return (
    <div className="animate-pulse max-w-7xl mx-auto p-8 text-gray-300">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}>
            <div className="w-full h-[270px] bg-gray-200 rounded-xl mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SimilarMoviesPage() {
  const { id } = useParams();
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_URL}/movie/${id}/similar?language=en-US&page=${page}`,
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
      } catch (err) {
        console.error("Error fetching similar movies:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSimilar();
  }, [id, page]);

  const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setPage((prev) => Math.min(totalPages, prev + 1));
  const goToPage = (p) => setPage(p);

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

  if (loading)
    return (
      <div className="bg-white text-gray-800 min-h-screen">
        <Header />
        <SimilarMoviesSkeleton />
        <Footer />
      </div>
    );

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">More like this</h2>
          <button
            onClick={() => router.back()}
            className="text-gray-500 text-sm hover:text-gray-800 cursor-pointer"
          >
            ← Back
          </button>
        </div>

        {movies.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No similar movies found
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {movies.map((m) => (
              <div
                key={m.id}
                className="cursor-pointer hover:scale-[1.03] transition"
                onClick={() => router.push(`/movie/${m.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                  alt={m.title}
                  className="rounded-xl shadow-md mb-2"
                />
                <p className="text-sm font-medium text-gray-800 truncate">
                  {m.title}
                </p>
                <p className="text-yellow-500 text-sm">
                  ⭐ {m.vote_average?.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        )}

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

          {pageItems.map((item, idx) =>
            item === "left-ellipsis" || item === "right-ellipsis" ? (
              <span
                key={`${item}-${idx}`}
                className="px-2 text-sm text-gray-500"
              >
                ...
              </span>
            ) : (
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
            )
          )}

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
      <Footer />
    </div>
  );
}
