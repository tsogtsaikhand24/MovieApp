"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import { MovieCard } from "@/app/_components/MovieListCard";
import { GenreList, Genreresults } from "@/app/_components/GenreList";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function GenrePage() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      const res = await fetch(
        `${BASE_URL}/discover/movie?language=en&with_genres=${id}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    };

    const fetchGenreName = async () => {
      const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      const data = await res.json();
      const found = data.genres.find((g) => g.id == id);
      if (found) setGenreName(found.name);
    };

    fetchMoviesByGenre();
    fetchGenreName();
  }, [id, page]);

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
    <div>
      <Header />

      <div className="flex justify-center">
        <div className=" w-[387px] h-[1257px] flex ">
          <div>
            <h2 className="font-semibold text-3xl ml-[26px] mt-[10px]">
              Search filter
            </h2>
            <h2 className="font-semibold text-2xl mt-8 ml-[26px]">Genres</h2>
            <p className="font-normal text-base decoration-[#09090B] ml-[26px] ">
              See lists of movies by genre
            </p>
            <GenreList />
          </div>
        </div>
        <div className="p-6 text-white min-h-screen w-7xl h-full">
          <h1 className="text-3xl font-bold mb-6">
            {genreName || "Genre"} Movies
          </h1>

          <div>
            <div>
              <h1 className=" text-black font-semibold text-xl">
                81 titles in &quot;&quot;
              </h1>
            </div>
            <div className="flex-wrap justify-center gap-6 grid grid-cols-4 mt-[20px] ">
              {movies.length > 0 ? (
                movies
                  .slice(0, 12)
                  .map((movie) => (
                    <MovieCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      rating={movie.vote_average?.toFixed(1) || "N/A"}
                      image={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/no-image.jpg"
                      }
                    />
                  ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">
                  No movies found for this genre.
                </p>
              )}
            </div>
          </div>

          {totalPages > 1 && (
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
