"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ACCESS_TOKEN, BASE_URL } from "../_constants";

const MovieCrew = () => {
  const [movieCrewsData, setMovieCrewsData] = useState({
    cast: [],
    crew: [],
  });
  const { id } = useParams();

  const movieCrewsDataList = async () => {
    const movieCrewsEndpoint = `${BASE_URL}/movie/${id}/credits?language=en-US`;
    const movieCrewsResponse = await fetch(movieCrewsEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await movieCrewsResponse.json();
    setMovieCrewsData(data);
  };

  useEffect(() => {
    movieCrewsDataList();
  }, [id]);

  const director = movieCrewsData?.crew?.filter(
    (member) => member.job === "Director"
  );
  const writers = movieCrewsData?.crew?.filter(
    (member) => member.job === "Writer"
  );
  const stars = movieCrewsData?.cast?.slice(0, 3);

  return (
    <div className="flex flex-col gap-5 w-full max-w-[1080px] mx-auto px-4 sm:px-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-3 sm:gap-[53px] items-start">
          <p className="w-[80px] sm:w-[100px] text-sm sm:text-base font-bold leading-[28px]">
            Director
          </p>
          <p className="text-sm sm:text-base break-words flex-1">
            {director?.map((d) => d.name).join(" · ") || "---"}
          </p>
        </div>
        <div className="w-full h-[1px] border border-[#E4E4E7] dark:border-[#27272A]"></div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-3 sm:gap-[53px] items-start">
          <p className="w-[80px] sm:w-[100px] text-sm sm:text-base font-bold leading-[28px]">
            Writers
          </p>
          <p className="text-sm sm:text-base break-words flex-1">
            {writers?.map((w) => w.name).join(" · ") || "---"}
          </p>
        </div>
        <div className="w-full h-[1px] border border-[#E4E4E7] dark:border-[#27272A]"></div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-3 sm:gap-[53px] items-start">
          <p className="w-[80px] sm:w-[100px] text-sm sm:text-base font-bold leading-[28px]">
            Stars
          </p>
          <p className="text-sm sm:text-base break-words flex-1">
            {stars?.map((s) => s.name).join(" · ") || "---"}
          </p>
        </div>
        <div className="w-full h-[1px] border border-[#E4E4E7] dark:border-[#27272A]"></div>
      </div>
    </div>
  );
};

export default MovieCrew;
