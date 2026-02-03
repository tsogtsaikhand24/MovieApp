"use client";

import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ACCESS_TOKEN, BASE_URL } from "@/app/_constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MovieCard } from "@/app/_components/MovieCard";
import { LoadingSearchFilter } from "@/app/_features/skeletons/LoadingSearchFilter";

export default function Page() {
  const { genreIds } = useParams();
  const [selectedGenres, setSelectedGenres] = useState(
    genreIds ? [Number(genreIds)] : []
  );

  const [genreData, setGenreData] = useState([]);
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const [page, setPage] = useState(1);

  const fetchGenres = async () => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setGenreData(data.genres || []);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) setVisibleCount(10);
      else if (window.innerWidth < 1024) setVisibleCount(15);
      else setVisibleCount(20);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const fetchMovies = async () => {
    if (selectedGenres.length === 0) return;
    setLoading(true);
    const genreParam = selectedGenres.join(",");
    const endpoint = `${BASE_URL}/discover/movie?language=en&with_genres=${genreParam}&page=${page}`;
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setSearchFilterData(data);
    setTimeout(() => setLoading(false), 800);
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedGenres, page]);

  const toggleGenre = (id) => {
    setPage(1);
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const totalPages = 50;
  const visiblePages = 3;
  const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const handlePageClick = (p) => {
    if (p !== page) setPage(p);
  };

  return (
    <div className="flex flex-col items-center box-border justify-center">
      <Header />

      <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-0 w-full max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-8 pt-[52px] items-center">
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold text-xl sm:text-2xl leading-tight tracking-[-0.6px] text-[#09090B] dark:text-white">
              Filtered Search
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-7 w-full">
            <ul className="w-full lg:w-[387px] h-auto">
              <div className="flex flex-col">
                <p className="text-2xl font-semibold leading-[32px] tracking-[-0.6px]">
                  Genres
                </p>
                <p className="text-base font-normal leading-[24px]">
                  Click to select multiple genres
                </p>
                <div className="h-[16.5px] w-full border-b"></div>
                <div className="h-[16.5px] w-full"></div>
              </div>
              <div className="flex flex-wrap max-h-[333px] w-full gap-3 overflow-y-auto">
                {genreData.map((genre) => {
                  const isSelected = selectedGenres.includes(genre.id);
                  return (
                    <div
                      key={genre.id}
                      onClick={() => toggleGenre(genre.id)}
                      className={`cursor-pointer border rounded-full px-3 py-1 text-sm transition-all ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "border-gray-400 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {genre.name}
                    </div>
                  );
                })}
              </div>
            </ul>

            <div className="hidden lg:block w-[1px] h-auto border border-[#E4E4E7] dark:border-[#27272A] m-4"></div>

            <div className="flex flex-col gap-8 flex-1">
              {loading ? (
                <LoadingSearchFilter />
              ) : (
                <>
                  <p className="text-[#09090B] font-inter text-[20px] font-semibold leading-[28px] tracking-[-0.5px]">
                    {searchFilterData.total_results || 0} results for{" "}
                    {selectedGenres
                      .map(
                        (id) => genreData.find((g) => g.id === id)?.name || ""
                      )
                      .join(", ")}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-12">
                    {searchFilterData.results
                      ?.slice(0, visibleCount)
                      .map((movie) => (
                        <MovieCard
                          direction="min"
                          key={movie.id}
                          movieId={movie.id}
                          year={movie.release_date}
                          title={movie.title}
                          rating={movie.vote_average}
                          image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        />
                      ))}
                  </div>
                </>
              )}

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={
                        page === 1 ? "opacity-50 pointer-events-none" : ""
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                    const p = startPage + i;
                    return (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === page}
                          onClick={() => handlePageClick(p)}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  {endPage < totalPages && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={
                        page === totalPages
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
