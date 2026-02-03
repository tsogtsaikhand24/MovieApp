"use client";
import { CreditItem } from "@/app/_components/creditItems";
import { MovieCard } from "@/app/_components/movieCard";
import { MovieDetailLoader } from "@/app/_components/movieDetailLoader";
import { MovieGenre } from "@/app/_components/movieGenre";
import { SectionHeader } from "@/app/_components/sectionHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FiPlay } from "react-icons/fi";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const Details = (props) => {
  const { id } = props;
  const router = useRouter();
  const [movieDetail, setMovieDetail] = useState({});
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDetail = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    const jsonData = await data.json();

    const similarMovieData = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      options
    );
    const similarMovieJson = await similarMovieData.json();

    const creditsData = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );
    const creditsJson = await creditsData.json();

    const directors = creditsJson.crew?.filter((c) => c.job === "Director");
    const writers = creditsJson.crew?.filter(
      (c) => c.known_for_department === "Writing"
    );
    const uniqueWriters = [...new Map(writers?.map((w) => [w.id, w])).values()];
    const stars = creditsJson.cast?.slice(0, 5);

    setMovieDetail({
      ...jsonData,
      credits: {
        directors,
        writers: uniqueWriters,
        stars,
      },
      similar: similarMovieJson.results.slice(0, 5),
    });
    setLoading(false);
  };

  const handleClick = () => {
    router.push(`/moreLikeThis/${id}`);
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  const fetchTrailer = async (movieId) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    );
    const jsonData = await data.json();

    const trailer = jsonData.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    setTrailerKey(trailer?.key);
  };

  const runtime = movieDetail.runtime || 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (loading) {
    return (
      <>
        <MovieDetailLoader />
      </>
    );
  }

  return (
    <>
      <div className="w-full mx-auto h-fit px-0 sm:px-4 md:px-8 lg:px-12 flex flex-col gap-6 md:gap-8">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-between gap-4 max-md:px-5">
            <div className="flex flex-col">
              <h1 className="text-xl max-sm:text-lg sm:text-3xl md:text-4xl font-bold">
                {movieDetail.title}
              </h1>
              <p className="flex flex-wrap items-center text-xs max-sm:text-[11px] sm:text-base">
                {movieDetail.release_date}
                <BsDot className="text-sm sm:text-xl md:text-2xl" />
                {movieDetail.production_countries
                  ?.map((c) => c.name)
                  .join(", ")}
                <BsDot className="text-sm sm:text-xl md:text-2xl" />
                {hours}h {minutes}m
              </p>
            </div>
            <div className="flex flex-col items-start">
              <p className="font-medium text-xs max-sm:text-[11px] sm:text-sm max-sm:hidden">
                Rating
              </p>
              <div className="flex items-center">
                <FaStar className="mr-1 text-yellow-400 size-4 max-sm:size-3 sm:size-6 md:size-7" />
                <div>
                  <p className="text-gray-500 max-sm:text-xs">
                    <span className="font-bold text-base max-sm:text-sm md:text-xl text-black dark:text-white">
                      {movieDetail.vote_average}
                    </span>
                    /10
                  </p>
                  <h3 className="text-xs max-sm:text-[11px] sm:text-base">
                    {Math.floor(movieDetail.popularity)}K
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full aspect-[1080/428] flex flex-col-reverse md:flex-row gap-5 md:justify-between">
            <img
              className="md:w-[26.852%] hidden md:flex aspect-[428/290]"
              src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
              alt={movieDetail.title}
            />
            <div className="w-full md:w-[70.37%] relative flex items-end aspect-[720/428]">
              <img
                className="w-full h-full absolute inset-0 object-cover"
                alt="trailer"
                src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
              />
              <div className="absolute flex items-center gap-2 max-sm:gap-1 sm:gap-5 mb-7 ml-4 sm:ml-8">
                <button
                  onClick={() => fetchTrailer(movieDetail.id)}
                  className="flex items-center justify-center bg-white rounded-full p-1 max-sm:p-[6px] sm:p-3 shadow-lg border border-gray-300 hover:scale-105 transition dark:bg-[#27272a]"
                >
                  <FiPlay className="size-3 max-sm:size-2 sm:size-5" />
                </button>
                <p className="text-white text-xs max-sm:text-[11px] sm:text-base font-normal flex gap-1 sm:gap-2">
                  Play Trailer{" "}
                  <span>
                    {hours}:{minutes}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 sm:gap-5 max-md:px-5">
          <div className="w-full flex flex-row md:flex-col max-md:justify-between max-md:h-fit max-md:px-9 md:gap-3.5">
            <img
              className="md:hidden flex aspect-[428/290] w-25 h-37"
              src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
              alt={movieDetail.title}
            />
            <div className="w-fit h-full md:h-fit max-md:w-1/2 max-md:gap-5 flex flex-col">
              <div className="flex flex-wrap gap-2">
                {movieDetail.genres?.map((movie, index) => (
                  <MovieGenre genre={movie.name} key={index} />
                ))}
              </div>
              <p className="text-lg">{movieDetail.overview}</p>
            </div>
          </div>

          {[
            {
              label: "Director",
              items: movieDetail.credits?.directors?.map((d) => d.name),
            },
            {
              label: "Writers",
              items: movieDetail.credits?.writers?.map((w) => w.name),
            },
            {
              label: "Stars",
              items: movieDetail.credits?.stars?.map((s) => s.name),
            },
          ].map((credit, i) => (
            <CreditItem
              key={i}
              label={credit.label}
              items={credit.items || []}
            />
          ))}
        </div>

        <div className="w-full flex flex-col gap-4">
          <SectionHeader sectionTitle="More Like This" onClick={handleClick} />
          <div className="flex flex-wrap justify-center md:justify-between gap-4">
            {movieDetail.similar?.map((movie, index) => (
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
      </div>

      {trailerKey && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-xl w-full max-w-4xl">
            <button
              onClick={() => setTrailerKey(null)}
              className="absolute top-3 right-3 text-white text-lg sm:text-xl font-bold hover:text-red-400"
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="300"
              className="sm:h-[400px] md:h-[500px]"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};
