"use client";
import { MovieCard } from "@/app/_components/MovieCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ACCESS_TOKEN, BASE_URL } from "@/app/_constants";
import { BadgeDemo } from "@/app/_components/BadgeDemo";
import { LoadingSeeAllResults } from "@/app/_features/skeletons/LoadingSeeAllResults";

const titles = {
  top_rated: "Top rated",
  upcoming: "Upcoming",
  popular: "Popular",
};

export default function SeeAllResults() {
  const [seeAllResultsData, setSeeAllResultsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const { searchValue } = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(10);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(15);
      } else {
        setVisibleCount(20);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const headerSearchDataList = async () => {
    setLoading(true);
    const seeAllResultsDataEndpoint = `${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=${page}`;
    const seeAllResultsDataResponse = await fetch(seeAllResultsDataEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await seeAllResultsDataResponse.json();
    console.log("data", data);
    setSeeAllResultsData(data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const [genreData, setGenreData] = useState([]);
  const router = useRouter();
  const GenreDataList = async () => {
    const GenreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;
    const GenreResponse = await fetch(GenreEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await GenreResponse.json();
    setGenreData(data.genres || []);
  };
  useEffect(() => {
    GenreDataList();
  }, []);

  useEffect(() => {
    headerSearchDataList();
  }, [searchValue, page]);

  const totalPages = 50;
  const visiblePages = 3;

  const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const handlePageClick = (p) => {
    if (p !== page) setPage(p);
  };

  const handleClickPreviousButton = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleClickNextButton = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Header />
        <LoadingSeeAllResults />
        <Footer />
      </div>
    );
  }
  console.log("seeAllResultsData", seeAllResultsData);
  if (seeAllResultsData.total_results === 0) {
    return (
      <div className="flex flex-col items-center box-border justify-center gap-full">
        <Header />

        <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-0 lg:h-screen w-full max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-8 pt-[52px] items-center">
            <div className="w-full flex justify-between items-center">
              <p className="font-semibold text-xl sm:text-2xl leading-tight tracking-[-0.6px] text-[#09090B]">
                Search results
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-7 w-full">
              <div className="flex flex-col gap-8">
                <p className="text-[#09090B] font-inter text-[20px] font-semibold leading-[28px] tracking-[-0.5px]">
                  {seeAllResultsData.total_results} results for &quot;
                  {decodeURIComponent(searchValue)}&quot;
                </p>
                <div className="w-100% lg:w-[804px] h-[95px] border flex items-center justify-center">
                  <p> No results found.</p>
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={handleClickPreviousButton}
                        className={
                          page === 1 ? "opacity-50 pointer-events-none" : ""
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                      const pageNum = startPage + i;
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            isActive={pageNum === page}
                            onClick={() => handlePageClick(pageNum)}
                          >
                            {pageNum}
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
                        onClick={handleClickNextButton}
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
              <div className="hidden lg:block w-[1px] h-auto border border-[#E4E4E7] dark:border-[#27272A] m-4"></div>
              <ul className="w-full lg:w-[387px] h-auto">
                <div className="flex flex-col">
                  <p className="text-2xl font-semibold leading-[32px] tracking-[-0.6px]">
                    Genres
                  </p>
                  <p className="text-base font-normal leading-[24px]">
                    See lists of movies by genre
                  </p>
                  <div className="h-[16.5px] w-full border-b"></div>
                  <div className="h-[16.5px] w-full"></div>
                </div>
                <div className="flex flex-wrap max-h-[333px] w-full gap-4 overflow-y-auto">
                  {genreData.map((genre) => {
                    return (
                      <BadgeDemo
                        key={genre.id}
                        genre={genre.name}
                        genreIds={genre.id}
                      />
                    );
                  })}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center box-border justify-center">
      <Header />

      <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-0 max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-8 pt-[52px] items-center">
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold text-xl sm:text-2xl leading-tight tracking-[-0.6px] text-[#09090B] dark:text-white">
              Search results
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-7 w-full">
            <div className="flex flex-col gap-8">
              <p className="text-[#09090B] font-inter text-[20px] font-semibold leading-[28px] tracking-[-0.5px] dark:text-white">
                {seeAllResultsData.total_results} results for &quot;
                {decodeURIComponent(searchValue)}&quot;
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-12">
                {seeAllResultsData.results
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
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={handleClickPreviousButton}
                      className={
                        page === 1 ? "opacity-50 pointer-events-none" : ""
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                    const pageNum = startPage + i;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          isActive={pageNum === page}
                          onClick={() => handlePageClick(pageNum)}
                        >
                          {pageNum}
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
                      onClick={handleClickNextButton}
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
            <div className="hidden lg:block w-[1px] h-auto border border-[#E4E4E7] m-4"></div>
            <ul className="w-full lg:w-[387px] h-auto">
              <div className="flex flex-col">
                <p className="text-2xl font-semibold leading-[32px] tracking-[-0.6px]">
                  Genres
                </p>
                <p className="text-base font-normal leading-[24px]">
                  See lists of movies by genre
                </p>
                <div className="h-[16.5px] w-full border-b"></div>
                <div className="h-[16.5px] w-full"></div>
              </div>
              <div className="flex flex-wrap max-h-[333px] w-full gap-4 overflow-y-auto">
                {genreData.map((genre) => {
                  return (
                    <BadgeDemo
                      key={genre.id}
                      genre={genre.name}
                      genreIds={genre.id}
                    />
                  );
                })}
              </div>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
