"use client";
import { useRouter } from "next/navigation";
import { SearchResults } from "./searchResults";

export const SearchPopUp = (props) => {
  const { search, inputValue } = props;
  const router = useRouter();
  const handleClick = () => {
    router.push(`/search/${inputValue}`);
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#E4E4E7] rounded-lg shadow-lg h-fit z-50 py-2.5 xl:w-150 dark:bg-black">
      {search.map((movie, index) => (
        <div key={index} className="px-4">
          <SearchResults
            image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average.toFixed(1)}
            year={movie.release_date.slice(0, 4)}
            onClick={() => router.push(`/movie-detail/${movie.id}`)}
          />
          <div className="w-full h-5 items-center flex">
            <div className="w-full h-0.5 border border-gray-400"></div>
          </div>
        </div>
      ))}
      <div className="w-full h-10">
        <button className="w-fit h-full px-4" onClick={handleClick}>
          See all results for &quot;{inputValue}&quot;
        </button>
      </div>
    </div>
  );
};
