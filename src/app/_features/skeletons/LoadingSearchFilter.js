"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSearchFilter() {
  return (
    <div className="flex flex-col gap-8 items-center animate-pulse px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[1280px] flex justify-center sm:justify-between items-center pt-[52px]">
        <Skeleton className="w-[120px] sm:w-[180px] h-[28px] sm:h-[32px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1280px]">
        <div className="w-full lg:w-[387px] flex flex-col gap-4">
          <Skeleton className="w-[100px] sm:w-[150px] h-[24px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          <Skeleton className="w-[180px] sm:w-[250px] h-[18px] sm:h-[20px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          <div className="border-b h-[16.5px] w-full"></div>

          <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 max-h-[300px] overflow-y-auto">
            {Array.from({ length: 16 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[18px] sm:h-[20px] w-[60px] sm:w-[90px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
              />
            ))}
          </div>
        </div>

        <div className="hidden lg:block w-[1px] border border-[#E4E4E7] m-4"></div>

        <div className="flex flex-col gap-6 w-full">
          <Skeleton className="w-[220px] sm:w-[280px] lg:w-[320px] h-[20px] sm:h-[24px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full aspect-[2/3] rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
              />
            ))}
          </div>

          <div className="flex justify-end  sm:justify-end gap-2 sm:gap-3 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
