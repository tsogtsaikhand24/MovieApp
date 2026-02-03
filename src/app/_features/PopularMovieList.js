"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "../_components/movieCard";
import { SectionHeader } from "../_components/sectionHeader";
import { SectionHeaderLoader } from "../_components/sectionHeaderLoader";
import { MovieCardsLoader } from "../_components/movieCardsLoader";
import { useRouter } from "next/navigation";

const apiLink =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const PopularMovieList = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    console.log(jsonData);
    setPopularMovieData(jsonData.results.slice(0, 10) || []);
    setLoading(false);
  };
  const handleClick = () => {
    router.push(`/Popular`);
  };
  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return (
      <div className="w-full aspect-[1440/980] flex flex-col justify-between">
        <SectionHeaderLoader />
        <div className="mt-8 flex flex-wrap gap-6 justify-center md:justify-between max-sm:gap-2 max-sm:p-0">
          <MovieCardsLoader count={10} />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-between max-sm:px-3.5 max-[340px]:px-0 max-xs:px-1">
      <SectionHeader sectionTitle={"Popular"} onClick={handleClick} />

      <div className="mt-8 flex flex-wrap gap-6 justify-center md:justify-between max-sm:gap-2 max-sm:p-0">
        {popularMovieData.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            rating={movie.vote_average.toFixed(1)}
            image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            movieId={movie.id}
          />
        ))}
      </div>
    </div>
  );
};
