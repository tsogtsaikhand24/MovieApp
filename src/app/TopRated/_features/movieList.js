"use client";
import { useEffect, useState } from "react";
import { MovieCardsLoader } from "@/app/_components/movieCardsLoader";
import { MovieCard } from "@/app/_components/movieCard";
import { Panigation } from "@/app/_components/pagination";

const apiLink = "https://api.themoviedb.org/3/movie/top_rated?language=en-US";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const MovieList = ({ SectionTitle }) => {
  const [MoviesData, setMoviesData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPage = localStorage.getItem("moviePage");
      if (savedPage) setPage(Number(savedPage));
    }
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiLink}&page=${page}`, options);
      const json = await res.json();
      setMoviesData(json.results || []);
      setTotalPages(json.total_pages || 1);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    localStorage.setItem("moviePage", page);
  }, [page]);

  return (
    <section className="w-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col gap-8 max-xs:px-2">
      <div className="flex justify-between items-center">
        {!loading ? (
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            {SectionTitle}
          </h2>
        ) : (
          <div className="w-40 h-9 bg-gray-300 dark:bg-gray-700 rounded"></div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-wrap gap-6 justify-center">
          <MovieCardsLoader count={20} />
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center max-md:gap-3">
          {MoviesData.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average.toFixed(1)}
              image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              movieId={movie.id}
            />
          ))}
        </div>
      )}
      {!loading ? (
        <Panigation page={page} setPage={setPage} totalPages={totalPages} />
      ) : (
        <div className="flex justify-end gap-2 mt-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-10 h-8 bg-gray-300 dark:bg-gray-700 rounded"
              />
            ))}
        </div>
      )}
    </section>
  );
};
