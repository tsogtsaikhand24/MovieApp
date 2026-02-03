import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { SlControlPlay } from "react-icons/sl";

export const HeroSectionScroller = (props) => {
  const {
    movieTitle,
    rating,
    movieOverview,
    movieImage,
    onClick,
    handleNext,
    handlePrev,
    index,
    total,
    nowPlayingMovies,
    currentIndex,
    setCurrentIndex,
  } = props;

  return (
    <div className="w-full aspect-[16/9] lg:aspect-[1440/600] relative flex items-center justify-center max-md:flex-col max-md:aspect-auto max-md:justify-between">
      <img
        src={movieImage}
        alt={movieTitle}
        className="w-full h-full object-cover absolute max-md:relative max-md:h-64"
      />

      <div className="flex flex-col w-[92%] lg:w-[80%] h-fit z-10 gap-3 max-md:gap-4 lg:gap-6 text-white max-md:text-black max-md:p-4 dark:max-md:text-white">
        <div>
          <p className="text-xs max-md:text-sm lg:text-lg">Now playing:</p>
          <h1 className="text-xl max-md:text-2xl max-lg:text-4xl lg:text-5xl font-bold">
            {movieTitle}
          </h1>
        </div>

        <div className="flex items-center text-gray-700">
          <FaStar className="mr-1 text-yellow-400 size-4 max-md:size-5 lg:size-7" />
          <p className="text-sm text-gray-400 max-md:text-base max-lg:text-lg lg:text-xl">
            <span className="font-bold text-white max-md:text-black dark:max-md:text-white text-base max-md:text-lg max-lg:text-xl lg:text-2xl">
              {rating}
            </span>
            /10
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-xs max-md:text-sm max-lg:text-base lg:text-lg w-full lg:w-[50%] line-clamp-3 lg:line-clamp-none">
            {movieOverview}
          </p>
          <button
            className="flex items-center bg-white text-black dark:text-white rounded-lg max-md:rounded-xl lg:rounded-2xl w-fit px-3 max-md:px-4 lg:px-5 py-1.5 max-md:py-2 lg:py-2.5 gap-1.5 text-sm max-md:text-base lg:text-xl font-medium max-md:bg-black max-md:text-white dark:bg-[#27272a]"
            onClick={onClick}
          >
            <SlControlPlay />
            <span>Watch trailer</span>
          </button>
        </div>
      </div>

      {index > 0 && (
        <button
          onClick={handlePrev}
          className="flex absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition z-20"
        >
          <FaChevronLeft className="size-6" />
        </button>
      )}
      {index < total - 1 && (
        <button
          onClick={handleNext}
          className="flex absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition z-20"
        >
          <FaChevronRight className="size-6" />
        </button>
      )}
      <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 gap-3">
        {Array.from({ length: nowPlayingMovies.length }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full  transition-all duration-300 ${
              currentIndex === i ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
