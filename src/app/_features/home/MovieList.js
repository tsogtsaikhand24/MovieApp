"use client";

import { MovieCard } from "@/app/_components/MovieCard";
import SeeMoreIcon from "@/app/_Icons/SeeMoreIcon";
import { useEffect, useState } from "react";
import { LoadingMovieList } from "../skeletons/LoadingMovieList";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN, BASE_URL } from "@/app/_constants";

export const MovieList = ({ type, title }) => {
  const [movieListData, setMovieListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const MovieListDataList = async () => {
    setLoading(true);
    const movieListEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
    const movieListResponse = await fetch(movieListEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await movieListResponse.json();
    setMovieListData(data.results);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    MovieListDataList();
  }, []);

  if (loading) {
    return <LoadingMovieList />;
  }

  const handleClickSeeMoreButton = () => {
    router.push(`/movies/${type}`);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 pt-6 md:pt-10 lg:pt-[52px] items-center px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-[1277px] flex justify-between items-center">
        <p className="font-semibold text-lg md:text-xl lg:text-2xl leading-tight tracking-[-0.6px] text-[#09090B] dark:text-white">
          {title}
        </p>
        <button
          className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 cursor-pointer rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300 ease-in-out"
          onClick={handleClickSeeMoreButton}
        >
          <p className="text-xs md:text-sm font-medium text-[#09090B] dark:text-white">
            See more
          </p>
          <SeeMoreIcon />
        </button>
      </div>
      <div className="w-full max-w-[1277px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {movieListData.slice(0, 10).map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              year={movie.release_date}
              title={movie.title}
              rating={movie.vote_average}
              image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
          );
        })}
      </div>
    </div>
  );
};
