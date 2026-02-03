import { MovieCardsLoader } from "./movieCardsLoader";
import { SectionHeaderLoader } from "./sectionHeaderLoader";

export const MovieDetailLoader = () => {
  return (
    <>
      <div className="w-full mx-auto h-fit px-0 sm:px-4 md:px-8 lg:px-12 flex flex-col gap-6 animate-pulse">
        {/* Title & Rating */}
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-between gap-4 max-md:px-5">
            <div className="flex flex-col gap-2 w-3/4 max-md:w-full">
              <div className="h-6 max-sm:h-5 sm:h-8 md:h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="flex flex-col gap-1">
                  <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Poster & Backdrop */}
          <div className="w-full aspect-[1080/428] flex flex-col-reverse md:flex-row gap-5 md:justify-between">
            <div className="md:w-[26.852%] hidden md:flex bg-gray-300 dark:bg-gray-700 aspect-[428/290] rounded"></div>
            <div className="w-full md:w-[70.37%] relative flex items-end aspect-[720/428] bg-gray-300 dark:bg-gray-700 rounded">
              <div className="absolute bottom-7 left-4 sm:left-8 flex items-center gap-2">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview & Genres */}
        <div className="w-full flex flex-col gap-4 sm:gap-5 max-md:px-5">
          <div className="w-full flex flex-row md:flex-col max-md:justify-between max-md:h-fit max-md:px-9 md:gap-3.5 gap-3">
            <div className="md:hidden flex aspect-[428/290] w-25 h-37 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-full md:w-full flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-24 max-sm:h-20 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            </div>
          </div>

          {/* Credits */}
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex flex-col gap-2 w-full">
              <div className="flex gap-11">
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-8 w-[80%] bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
              <div className="w-full h-0.5 border border-gray-300" />
            </div>
          ))}
        </div>

        {/* Similar Movies */}
        <div className="w-full flex flex-col gap-4">
          <SectionHeaderLoader />
          <div className="flex flex-wrap justify-center md:justify-between gap-4">
            <MovieCardsLoader count={5} />
          </div>
        </div>
      </div>
    </>
  );
};
