"use client";
import React from "react";
import { UpcomingMovieList } from "./UpcomingMovieList";
import { PopularMovieList } from "./PopularMovieList";
import { TopRatedMovieList } from "./TopRatedMovieList";

const handleSeeMore = () => {
  router.push(`/movies/${type}`);
};

export function MovieList() {
  return (
    <div className="flex flex-col items-center w-full space-y-16 mt-10">
      <UpcomingMovieList />

      <PopularMovieList />

      <TopRatedMovieList />
    </div>
  );
}
