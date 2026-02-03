import { Skeleton } from "@/components/ui/skeleton";

export function LoadingMovieList() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 pt-6 md:pt-10 lg:pt-[52px] items-center px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-[1277px] flex justify-between items-center">
        <Skeleton className="w-[180px] md:w-[250px] h-[28px] md:h-[32px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
        <Skeleton className="w-[100px] md:w-[165px] h-[30px] md:h-[36px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>

      <div className="w-full max-w-[1277px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton
            key={i}
            className="lg:w-[230px] lg:h-[439px] w-[157px] h-[309px] aspect-[2/3] rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
          />
        ))}
      </div>
    </div>
  );
}
