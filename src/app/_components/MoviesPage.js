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
import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";

const titles = {
  top_rated: "Top rated",
  upcoming: "Upcoming",
  popular: "Popular",
};

export default function MoviesPage({ data = [], page, setPage, param }) {
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

  return (
    <div className="flex flex-col items-center box-border justify-center min-h-screen">
      <Header />

      <div className="flex flex-col gap-6 md:gap-8 w-full px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:gap-8 pt-6 md:pt-10 lg:pt-[52px] items-center">
          <div className="w-full max-w-[1277px] flex justify-between items-center">
            <h1 className="font-semibold text-xl sm:text-2xl leading-tight tracking-[-0.6px] text-[#09090B] dark:text-white">
              {param ? titles[param.type] : "More like this"}
            </h1>
          </div>

          <div className="w-full max-w-[1277px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center justify-center">
            {data.slice(0, 10).map((movie) => (
              <MovieCard
                key={movie.id}
                year={movie.release_date?.substring(0, 4)}
                movieId={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-[1277px] flex justify-center py-6 md:py-8">
          <Pagination>
            <PaginationContent className="flex-wrap gap-1 sm:gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={handleClickPreviousButton}
                  className={`text-xs sm:text-sm ${
                    page === 1 ? "opacity-50 pointer-events-none" : ""
                  }`}
                />
              </PaginationItem>

              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                  const pageNum = startPage + i;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        isActive={pageNum === page}
                        onClick={() => handlePageClick(pageNum)}
                        className="text-xs sm:text-sm"
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
              </div>

              <div className="sm:hidden flex items-center px-3 py-1.5 text-sm font-medium text-[#09090B] dark:text-white">
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
              </div>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={handleClickNextButton}
                  className={`text-xs sm:text-sm ${
                    page === totalPages ? "opacity-50 pointer-events-none" : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <Footer />
    </div>
  );
}
