"use client";
import { GenreMovieListLoader } from "@/app/_components/genreMovieListLoader";
import { GenreResults } from "@/app/_components/genreResults";
import { MovieCard } from "@/app/_components/movieCard";
import { Panigation } from "@/app/_components/pagination";
import { useEffect, useState } from "react";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const GenreMovieList = ({ genreId, SectionTitle }) => {
  const [genreMovies, setGenreMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const getData = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`,
      options
    );
    const jsonData = await data.json();
    console.log("genreMoviesData", jsonData);
    setGenreMovies(jsonData.results);
    setTotalPages(jsonData.total_pages);
    setTotalResults(jsonData.total_results);
    setLoading(false);
  };
  const getGenreName = async () => {
    const genreNameData = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );
    const genreNameJsonData = await genreNameData.json();
    const genre = genreNameJsonData.genres.find(
      (genre) => genre.id === parseInt(genreId)
    );
    if (genre) {
      setGenreName(genre.name);
    }
  };
  useEffect(() => {
    getGenreName();
  }, [genreId]);
  useEffect(() => {
    getData();
  }, [page]);

  if (loading) {
    return <GenreMovieListLoader />;
  }
  return (
    <div className="w-full flex flex-col gap-6 mb-24 mx-auto xs:px-6 md:px-12 dark:bg-black px-2">
      <div className="w-full h-9 flex justify-between items-center">
        <p className="text-3xl font-semibold">{SectionTitle}</p>
      </div>
      <div className="w-full flex gap-6 max-md:flex-col">
        <div className="w-[30%] max-md:w-full">
          <GenreResults genreName={genreName} />
        </div>
        <div className="w-px bg-gray-300"></div>
        <div className="flex-1">
          <p className="mb-4 text-lg font-extrabold">
            {totalResults} results for <span>&quot;{genreName}&quot;</span>
          </p>
          <div className="flex flex-wrap justify-between max-md:gap-2 md:gap-6 max-xl:justify-center ">
            {genreMovies.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  title={movie.title}
                  rating={movie.vote_average.toFixed(1)}
                  image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  movieId={movie.id}
                />
              );
            })}
          </div>
          <Panigation page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};
