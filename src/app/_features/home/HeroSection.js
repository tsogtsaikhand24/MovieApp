"use client";
import * as React from "react";
import Card1 from "@/app/_components/Card1";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SkeletonHeroCard = () => {
  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-gray-300 animate-pulse">
      <div className="absolute inset-0 bg-linear-to-t from-gray-500/40 to-transparent"></div>
      <div className="absolute bottom-8 left-8 right-8 space-y-3">
        <div className="h-8 w-2/3 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function HeroSection() {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setMovies((data.results || []).slice(0, 5));
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="flex justify-center">
      <Carousel className="w-[1640px] pl-16 pr-16">
        <CarouselContent className="border-none">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border-none shadow-none">
                      <CardContent className="p-0">
                        <SkeletonHeroCard />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            : movies.map((movie) => (
                <CarouselItem key={movie.id}>
                  <div className="p-1">
                    <Card className="border-none shadow-none">
                      <CardContent className="p-0">
                        <Card1 movie={movie} />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
