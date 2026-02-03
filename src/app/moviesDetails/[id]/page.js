"use client";

import StarIcon from "@/app/_Icons/StarIcon";
import { Footer } from "../../_features/Footer";
import { Header } from "../../_features/Header";
import PlayIcon from "@/app/_Icons/PlayIcon";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MovieCrew from "@/app/_features/MovieCrew";
import MoreLikeThis from "@/app/_features/MoreLikeThis";
import { ACCESS_TOKEN, BASE_URL } from "@/app/_constants";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LoadingMovieDetails } from "@/app/_features/skeletons/LoadingMovieDetails";

const Page = () => {
  const [movieDetailsData, setMovieDetailsData] = useState({});
  const { id } = useParams();
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const movieDetailsDataList = async () => {
    setLoading(true);
    const movieDetailsEndpoint = `${BASE_URL}/movie/${id}?language=en-US`;
    const movieDetailsResponse = await fetch(movieDetailsEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await movieDetailsResponse.json();
    setMovieDetailsData(data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const fetchTrailer = async (movieId) => {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const trailer = data.results?.find((v) => v.type === "Trailer");
    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
    }
  };

  useEffect(() => {
    movieDetailsDataList();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Header />
        <LoadingMovieDetails />
        <Footer />
      </div>
    );
  }

  let time = movieDetailsData.runtime || 0;
  var hours = Math.floor(time / 60);
  var minutes = time % 60;

  let budget = Math.floor(movieDetailsData.revenue / 100000);
  const rate = Math.floor(movieDetailsData.vote_average * 10) / 10;

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />

      <div className="w-full max-w-[1080px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center sm:flex-row justify-between gap-4 pt-6 sm:pt-10 lg:pt-[52px] pb-4 sm:pb-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#09090B] dark:text-white mb-2  overflow-hidden text-ellipsis line-clamp-2">
              {movieDetailsData.title}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg font-normal leading-relaxed flex items-center gap-2 text-[#71717A] dark:text-gray-400 flex-wrap">
              <span>{movieDetailsData.release_date}</span>
              <span>·</span>
              {movieDetailsData.adult === false && (
                <>
                  <span>PG</span>
                  <span>·</span>
                </>
              )}
              <span>
                {hours}h {minutes}m
              </span>
            </p>
          </div>

          <div className="flex sm:flex-col items-start sm:items-end gap-2">
            <p className="hidden sm:block text-xs font-medium leading-[16px] text-[#71717A] dark:text-gray-400">
              Rating
            </p>

            <div className="flex items-center gap-2">
              <StarIcon className="w-7 h-7 text-yellow-400" />
              <div>
                <p className="font-semibold text-base sm:text-lg text-[#09090B] dark:text-white">
                  {rate}
                  <span className="text-sm sm:text-base font-normal text-[#71717A] dark:text-gray-400">
                    /10
                  </span>
                </p>
                <p className="text-xs sm:text-base font-normal text-[#71717A] dark:text-gray-400">
                  {budget}k
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap lg:flex-row gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div
            className="w-[100px] lg:w-[290px] h-[148px] sm:w-full sm:h-[450px] lg:h-[428px] bg-cover bg-center rounded-lg order-2 lg:order-1"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetailsData.poster_path})`,
            }}
          />

          <div
            className="w-full lg:flex-1 h-[250px] sm:h-[350px] lg:h-[428px] bg-cover bg-center relative rounded-lg order-1"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetailsData.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-lg" />

            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="flex gap-2 sm:gap-3 justify-center items-center absolute left-4 sm:left-6 bottom-4 sm:bottom-6 z-10"
                  onClick={() => fetchTrailer(id)}
                >
                  <div className="w-10 h-10 bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-lg">
                    <PlayIcon className="w-4 h-4 flex justify-center items-center" />
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="text-[#FFFFFF] text-sm sm:text-base font-medium drop-shadow-lg">
                      Play trailer
                    </p>
                    <p className="text-[#FFFFFF] text-sm sm:text-base font-normal drop-shadow-lg">
                      2:35
                    </p>
                  </div>
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[997px] w-full bg-black/95 !border-0 shadow-none flex justify-center items-center p-4 sm:p-6">
                <VisuallyHidden>
                  <DialogTitle>{movieDetailsData.title} Trailer</DialogTitle>
                </VisuallyHidden>

                {trailerUrl && (
                  <div className="w-full max-w-[997px] ">
                    <iframe
                      src={trailerUrl}
                      allowFullScreen
                      title={`${movieDetailsData.title} Trailer`}
                      className="w-full aspect-video rounded-lg sm:rounded-xl shadow-2xl"
                      style={{ minHeight: "211px" }}
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 order-3 w-[200px] sm:w-full">
            <div className="flex gap-2 flex-wrap">
              {movieDetailsData.genres?.map((genre) => (
                <Badge
                  key={genre.id}
                  variant="secondary"
                  className="rounded-full bg-white dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-white text-xs sm:text-sm px-3 py-1"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>

            <p className="text-sm sm:text-base font-normal leading-relaxed text-[#09090B] dark:text-gray-300">
              {movieDetailsData.overview}
            </p>
          </div>
        </div>

        <MovieCrew />
      </div>
      <MoreLikeThis />

      <Footer />
    </div>
  );
};

export default Page;
