import { MovieCardsLoader } from "./movieCardsLoader";

export const SearchMovieListLoader = () => {
  return (
    <div className="w-full flex flex-col gap-6 mb-24 mx-auto px-6 md:px-12">
      <div className="w-full h-9 flex items-center">
        <div className="h-7 w-40 bg-gray-200 rounded-md animate-pulse" />
      </div>

      <div className="w-full flex gap-6 max-md:flex-col">
        <div className="flex-1">
          <div className="h-6 w-64 mb-4 bg-gray-200 rounded-md animate-pulse" />

          <div className="flex flex-wrap justify-between gap-4 md:gap-6 max-xl:justify-center">
            <MovieCardsLoader count={8} />
          </div>
        </div>

        <div className="w-px bg-gray-300 max-md:hidden"></div>

        <div className="w-[30%] max-md:w-full flex flex-col gap-4">
          <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};
