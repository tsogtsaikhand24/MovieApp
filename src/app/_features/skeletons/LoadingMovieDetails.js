"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const LoadingMovieDetails = () => {
  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="w-full max-w-[1080px] pt-8 sm:pt-[52px] flex sm:flex-row justify-between gap-4 mb-8">
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <Skeleton className="h-8 sm:h-10 w-[70%] sm:w-[400px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          <Skeleton className="h-5 sm:h-6 w-[50%] sm:w-[250px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
        </div>

        <div className="flex flex-col sm:flex-col gap-2 items-end sm:items-end">
          <Skeleton className="h-4 w-[60px] sm:w-[80px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          <Skeleton className="h-5 sm:h-6 w-[100px] sm:w-[120px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 w-full max-w-[1080px] mb-8">
        <Skeleton className="w-full sm:w-[280px] h-[300px] sm:h-[428px] rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
        <Skeleton className="w-[100px] lg:w-[694px] lg:h-[428px] h-[148px] sm:h-[428px] rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>

      <div className="w-full max-w-[1080px] flex flex-col gap-5">
        <div className="flex gap-2 flex-wrap">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-5 sm:h-6 w-[80px] sm:w-[100px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="w-[90%] sm:w-[1080px] h-[20px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          <Skeleton className="w-[70%] sm:w-[699px] h-[20px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
        </div>

        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="flex gap-6 sm:gap-[53px] items-center">
              <Skeleton className="w-[60px] sm:w-[64px] h-[24px] sm:h-[28px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
              <Skeleton className="w-[60%] sm:w-[360px] h-[24px] sm:h-[28px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
            </div>
            <div className="w-full h-[1px] border border-[#E4E4E7] my-2" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 sm:gap-8 pt-10 sm:pt-[52px] items-center w-full">
        <div className="w-full max-w-[1080px] flex flex-col sm:flex-row justify-between items-center gap-4">
          <Skeleton className="w-[60%] sm:w-[250px] h-[30px] sm:h-[32px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          <Skeleton className="w-[40%] sm:w-[165px] h-[30px] sm:h-[36px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 w-full max-w-[1080px]">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-full aspect-[2/3] rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
