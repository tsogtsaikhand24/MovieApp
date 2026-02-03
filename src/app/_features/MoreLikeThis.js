"use client";
import { useState, useEffect } from "react";
import { MovieCard } from "@/app/_components/MovieCard";
import { useParams, useRouter } from "next/navigation";
import SeeMoreIcon from "@/app/_Icons/SeeMoreIcon";
import { ACCESS_TOKEN, BASE_URL } from "../_constants";

const MoreLikeThis = () => {
  const [moreLikeThis, setMoreLikeThis] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(4);
      } else {
        setVisibleCount(5);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const movieDetailsDataList = async () => {
    const moreLikeThisEndpoint = `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`;
    const moreLikeThisResponse = await fetch(moreLikeThisEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await moreLikeThisResponse.json();
    setMoreLikeThis(data);
  };

  useEffect(() => {
    movieDetailsDataList();
  }, [id]);

  const handleClickSeeMoreButton = () => {
    router.push(`/moreLikeThis/${id}`);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pt-8 sm:pt-[52px] items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full flex justify-between items-center flex-wrap gap-3">
        <p className="font-semibold text-xl sm:text-2xl leading-[32px] tracking-[-0.6px] text-[#09090B]  dark:text-[#FAFAFA]">
          More like this
        </p>
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-black/5 transition-colors duration-300 ease-in-out cursor-pointer"
          onClick={handleClickSeeMoreButton}
        >
          <p className="text-sm font-medium text-[#09090B]  dark:text-[#FAFAFA]">
            See more
          </p>
          <SeeMoreIcon />
        </button>
      </div>

      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          gap-4 
          sm:gap-6 
          md:gap-8 
          w-full
        "
      >
        {moreLikeThis.results?.slice(0, visibleCount).map((movie) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            year={movie.release_date}
            title={movie.title}
            rating={movie.vote_average}
            image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreLikeThis;
