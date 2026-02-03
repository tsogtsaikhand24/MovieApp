"use client";

import StarIcon from "@/app/_Icons/StarIcon";
import PlayIcon from "@/app/_Icons/PlayIcon";
import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LoadingHeroSection } from "../skeletons/LoadingHeroSection";
import { ACCESS_TOKEN, BASE_URL } from "@/app/_constants";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import WhitePlayIcon from "@/app/_Icons/WhitePlayIcon";

export function HeroSection() {
  const [heroSectionData, setHeroSectionData] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [activeTrailerId, setActiveTrailerId] = useState(null);
  const [loading, setLoading] = useState(false);

  const HeroSectionDataList = async () => {
    setLoading(true);
    const res = await fetch(
      `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setHeroSectionData(data.results);
    setTimeout(() => setLoading(false), 1500);
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
      setActiveTrailerId(movieId);
    }
  };

  useEffect(() => {
    HeroSectionDataList();
  }, []);

  if (loading) return <LoadingHeroSection />;

  return (
    <div className="w-full">
      <Carousel className="w-full max-w-[1440px] mx-auto h-auto">
        <CarouselContent>
          {heroSectionData.slice(0, 5).map((movie, index) => {
            const rate = Math.floor(movie.vote_average * 10) / 10;
            return (
              <CarouselItem key={index}>
                <Card className="border-none">
                  <CardContent
                    className="hidden md:flex w-full h-[500px] lg:h-[600px] items-center p-6 bg-center bg-cover relative"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30" />

                    <div className="relative z-10 w-full max-w-[404px] flex flex-col gap-4 lg:pl-[140px] px-8">
                      <div>
                        <p className="text-white text-base font-normal leading-[24px]">
                          Now Playing:
                        </p>
                        <p className="font-bold text-white text-3xl lg:text-4xl tracking-[-0.9px] drop-shadow-lg overflow-hidden text-ellipsis line-clamp-2">
                          {movie.title}
                        </p>
                        <div className="text-white flex items-center gap-1">
                          <StarIcon className="w-7 h-7" />
                          <p className="font-semibold text-lg flex items-center gap-1">
                            {rate}
                            <span className="text-base font-normal text-[#71717A]">
                              /10
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="text-white/80 text-sm font-normal line-clamp-3">
                        {movie.overview}
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => fetchTrailer(movie.id)}
                            className="h-[40px] w-[145px] bg-[#F4F4F5] hover:bg-white transition flex items-center justify-center py-2 px-4 gap-2 rounded-md text-sm font-medium text-[#18181B] cursor-pointer shadow-md"
                          >
                            <PlayIcon className="w-4 h-4" /> Watch Trailer
                          </button>
                        </DialogTrigger>

                        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[997px] w-full bg-black/95 !border-0 shadow-none flex justify-center items-center p-4 sm:p-6">
                          <VisuallyHidden>
                            <DialogTitle>{movie.title} Trailer</DialogTitle>
                          </VisuallyHidden>
                          {activeTrailerId === movie.id && trailerUrl ? (
                            <iframe
                              src={trailerUrl}
                              allowFullScreen
                              title="Movie Trailer"
                              className="w-full aspect-video rounded-lg md:rounded-xl shadow-2xl"
                            />
                          ) : (
                            <p className="text-white">Loading trailer...</p>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>

                  <CardContent className="md:hidden p-0">
                    <div
                      className="w-full h-[246px] sm:h-[400px] bg-center bg-cover relative"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                      }}
                    ></div>

                    <div className="bg-white dark:bg-[#09090B] p-4 sm:p-5 flex flex-col gap-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-[#71717A] dark:text-gray-400 text-sm font-normal">
                            Now Playing:
                          </p>

                          <h1 className="font-bold text-[#09090B] dark:text-white text-2xl sm:text-3xl tracking-tight overflow-hidden text-ellipsis line-clamp-1">
                            {movie.title}
                          </h1>
                        </div>

                        <div className="flex items-center justify-center w-[83px] h-[48px] gap-1 bg-white dark:bg-[#09090B]">
                          <StarIcon className="w-7 h-7" />
                          <p className="font-semibold text-lg text-[#09090B] dark:text-white">
                            {rate}
                            <span className="text-base font-normal text-[#71717A] dark:text-gray-400">
                              /10
                            </span>
                          </p>
                        </div>
                      </div>

                      <p className="text-[#71717A] dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {movie.overview}
                      </p>

                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => fetchTrailer(movie.id)}
                            className="h-[40px] px-4 py-2 bg-[#18181B] dark:bg-white hover:bg-[#27272A] dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white dark:text-[#18181B] cursor-pointer shadow-lg w-[145px] sm:w-auto whitespace-nowrap"
                          >
                            <WhitePlayIcon className="w-4 h-4" />
                            Watch Trailer
                          </button>
                        </DialogTrigger>

                        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[997px] w-full bg-black/95 shadow-none flex justify-center items-center p-4 sm:p-6">
                          <VisuallyHidden>
                            <DialogTitle>{movie.title} Trailer</DialogTitle>
                          </VisuallyHidden>
                          {activeTrailerId === movie.id && trailerUrl ? (
                            <iframe
                              src={trailerUrl}
                              allowFullScreen
                              title="Movie Trailer"
                              className="w-full aspect-video rounded-lg shadow-2xl"
                            />
                          ) : (
                            <p className="text-white">Loading trailer...</p>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselDots className="hidden sm:hidden md:flex lg:flex" />
        <CarouselPrevious className="hidden sm:hidden md:flex lg:flex" />
        <CarouselNext className="hidden sm:hidden md:flex lg:flex" />
      </Carousel>
    </div>
  );
}
