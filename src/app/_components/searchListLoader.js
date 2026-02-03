import { MovieCardsLoader } from "./movieCardsLoader";

export const SearchListLoader = () => {
  return (
    <div className="w-full flex flex-col gap-6 mb-24 mx-auto xs:px-6 md:px-12 px-2 animate-pulse dark:bg-black">
      <div className="w-full h-9 flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="w-full flex gap-6 max-md:flex-col">
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-8  w-64 bg-gray-300 dark:bg-gray-700 rounded"></div>

          <div className="flex flex-wrap justify-between max-md:gap-2 md:gap-6 max-xl:justify-center">
            <MovieCardsLoader count={20} />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-8 bg-gray-300 dark:bg-gray-700 rounded"
                />
              ))}
          </div>
        </div>

        <div className="w-px bg-gray-300 dark:bg-gray-700 max-md:hidden"></div>

        <div className="flex flex-col gap-2.5 w-[30%] max-md:w-full">
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-36 h-7" />
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-48 h-7 mb-5" />

          <div className="flex flex-row flex-wrap gap-4 w-full">
            {Array(19)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
