"use client";
import { useEffect, useState } from "react";
import { HeroSectionScroller } from "../_components/heroSectionScroller";
import { Trailer } from "../_components/trailer";
import { HeroSectionLoader } from "../_components/heroSectionLoader";

const apiLink =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const HeroSection = () => {
  const [nowPlayingMovies, SetNowPlayingMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    SetNowPlayingMovies(jsonData.results || []);
    setLoading(false);
  };
  const fetchTrailer = async (movieId) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    );
    const jsonData = await data.json();
    const trailer = jsonData.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    if (trailer) setTrailerKey(trailer.key);
  };

  useEffect(() => {
    if (nowPlayingMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === nowPlayingMovies.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [nowPlayingMovies]);

  useEffect(() => {
    getData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === nowPlayingMovies.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? nowPlayingMovies.length - 1 : prev - 1
    );
  };
  if (loading) {
    return <HeroSectionLoader total={nowPlayingMovies.length} />;
  }
  return (
    <>
      <section className="relative w-full mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${
              (currentIndex * 100) / nowPlayingMovies.length
            }%)`,
            width: `${nowPlayingMovies.length * 100}%`,
          }}
        >
          {nowPlayingMovies.map((movie, index) => (
            <HeroSectionScroller
              key={index}
              movieTitle={movie.title}
              rating={movie.vote_average.toFixed(1)}
              movieOverview={movie.overview}
              onClick={() => fetchTrailer(movie.id)}
              movieImage={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              handleNext={handleNext}
              handlePrev={handlePrev}
              index={index}
              total={nowPlayingMovies.length}
              nowPlayingMovies={nowPlayingMovies}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          ))}
        </div>
      </section>
      {trailerKey && (
        <Trailer setTrailerKey={setTrailerKey} trailerKey={trailerKey} />
      )}
    </>
  );
};
