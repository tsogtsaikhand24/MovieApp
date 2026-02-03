import { Skeleton } from "@/components/ui/skeleton";

export const LoadingHeroSection = () => {
  return (
    <div className="w-full">
      <div className="hidden md:flex w-full max-w-[1440px] mx-auto h-[500px] lg:h-[600px] items-center justify-center p-6 bg-gray-100 dark:bg-gray-800">
        <div className="relative w-full h-full">
          <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />

          <div className="absolute left-0 top-0 h-full flex flex-col justify-center gap-4 px-8 lg:pl-[140px] max-w-[404px]">
            <Skeleton className="w-[120px] h-[20px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
            <Skeleton className="w-[280px] h-[40px] rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
            <Skeleton className="w-[180px] h-[24px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
            <Skeleton className="w-[320px] h-[60px] rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
            <Skeleton className="w-[145px] h-[40px] rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          </div>
        </div>
      </div>

      <div className="flex md:hidden flex-col w-full">
        <Skeleton className="w-full h-[246px] sm:h-[400px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />

        <div className="p-4 sm:p-5 flex flex-col gap-4 bg-white dark:bg-gray-900">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-[100px] h-[18px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
              <Skeleton className="w-[200px] h-[28px] sm:w-[260px] sm:h-[32px] rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
            </div>
            <Skeleton className="w-[83px] h-[48px] rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          </div>
          <Skeleton className="w-full h-[60px] rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          <Skeleton className="w-[145px] h-[40px] rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
        </div>
      </div>
    </div>
  );
};
