"use client";

import { useRouter } from "next/navigation";
import SeeMoreIcon from "../_Icons/SeeMoreIcon";
import MiniStarIcon from "../_Icons/MiniStarIcon";

export const MovieCard = ({
  rating,
  title,
  image,
  movieId,
  direction,
  year,
}) => {
  const router = useRouter();

  const handleClickMovieCard = () => {
    router.push(`/moviesDetails/${movieId}`);
  };

  if (direction === "horizontal") {
    return (
      <div onClick={handleClickMovieCard} className="cursor-pointer">
        <div className="flex gap-4 w-fit p-2">
          <div
            className="relative w-[67px] h-[100px] bg-cover bg-center rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 hover:bg-black/20 transition-colors duration-300 ease-in-out"></div>
          </div>
          <div className="flex flex-col gap-3 lg:w-[454px] w-[212px] h-[99px]">
            <div>
              <p className="font-semibold truncate text-[#09090B] dark:text-[#FAFAFA] text-xl tracking-[-0.5px] drop-shadow-lg">
                {title}
              </p>
              <div className="text-[#09090B] flex items-center gap-1">
                <MiniStarIcon />
                <p className="font-medium dark:text-[#FAFAFA] text-sm flex items-center gap-1">
                  {rating}
                  <span className="text-xs font-normal text-[#71717A]">
                    /10
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center justify-center leading-[20px] text-sm font-medium ">
                {String(year).substring(0, 4)}
              </div>
              <button className="w-[120px] h-[36px] flex items-center justify-center gap-2 px-16px cursor-pointer ">
                <p className="text-sm font-medium text-[#09090B] dark:text-[#FAFAFA]">
                  See more
                </p>
                <SeeMoreIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] border border-[#E4E4E7] dark:border-[#27272A] m-2"></div>
      </div>
    );
  }
  const rate = Math.round(rating * 10) / 10;
  if (direction === "min") {
    return (
      <div
        onClick={handleClickMovieCard}
        className="cursor-pointer flex flex-col items-center"
      >
        <div
          className="lg:w-[165px] lg:h-[244px] w-[157px] h-[233px] bg-cover bg-center rounded-t-lg"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="w-full h-full overflow-hidden rounded-t-lg hover:bg-black/20 transition-colors duration-300 ease-in-out"></div>
        </div>
        <div className="lg:w-[165px] lg:h-[87px] w-[157px] h-[76px] bg-[#F4F4F5]  dark:bg-[#27272A] rounded-b-lg px-2 py-1">
          <div className="flex items-center gap-1">
            <MiniStarIcon />
            <p className="text-[#09090B] text-xs font-medium dark:text-[#FAFAFA] lg:font-semibold lg:text-lg leading-[20px]">
              {rate}
              <span className="text-[#71717A] font-inter lg:text-base text-xs font-normal leading-[16px]">
                /10
              </span>
            </p>
          </div>
          <p className="text-sm lg:text-lg overflow-hidden text-[#09090B] dark:text-[#FAFAFA] text-ellipsis  font-inter  font-normal lg:leading-[28px] leading-[20px] line-clamp-2">
            {title}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClickMovieCard}
      className="cursor-pointer flex flex-col items-center"
    >
      <div
        className="w-[157px] h-[233px] lg:w-[230px] lg:h-[340px] bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="w-full h-full overflow-hidden rounded-t-lg hover:bg-black/20 transition-colors duration-300 ease-in-out"></div>
      </div>
      <div className="w-[157px] h-[76px] lg:w-[230px] lg:h-[95px] bg-[#F4F4F5] dark:bg-[#27272A] rounded-b-lg p-2">
        <div className="flex items-center gap-1">
          <MiniStarIcon />
          <p className="text-xs font-medium lg:font-semibold lg:text-lg text-[#09090B] dark:text-[#FAFAFA] flex items-center gap-1">
            {rate}
            <span className="lg:text-base text-xs font-normal  text-[#71717A]">
              /10
            </span>
          </p>
        </div>
        <p className="text-sm lg:text-lg text-[#09090B] dark:text-[#FAFAFA] text-ellipsis font-normal lg:leading-[28px] leading-[20px] lg:p-1 p-0 line-clamp-2 overflow-hidden">
          {title}
        </p>
      </div>
    </div>
  );
};
