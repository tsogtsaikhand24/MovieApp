import { GenreResults } from "@/app/_components/genreResults";
import { MovieCard } from "@/app/_components/movieCard";
import { Panigation } from "@/app/_components/pagination";
import { SearchListLoader } from "@/app/_components/searchListLoader";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const SearchDetails = ({ SectionTitle, inputValue }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const getData = async () => {
    setLoading(true);
    if (!inputValue.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${inputValue}&language=en-US&page=${page}`,
      options
    );

    const jsonData = await data.json();
    console.log("this is search data1", jsonData);
    setSearchResults(jsonData.results);
    setTotalPages(jsonData.total_pages);
    setTotalResults(jsonData.total_results);
    console.log("search1", searchResults);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [inputValue, page]);

  if (loading) {
    return <SearchListLoader />;
  }

  return (
    <div className="w-full flex flex-col gap-6 mb-24 mx-auto px-6 md:px-12">
      <div className="w-full h-9 flex justify-between items-center">
        <p className="text-3xl font-semibold">{SectionTitle}</p>
      </div>

      <div className="w-full flex gap-6 max-md:flex-col">
        <div className="flex-1">
          <p className="mb-4 text-lg font-extrabold">
            {totalResults} results for <span>&quot;{inputValue}&quot;</span>
          </p>
          <div className="flex flex-wrap justify-between gap-4 md:gap-6 max-xl:justify-center">
            {searchResults.map((movie, index) => (
              <MovieCard
                key={index}
                title={movie.title}
                rating={movie.vote_average.toFixed(1)}
                image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                movieId={movie.id}
              />
            ))}
          </div>
          <div className="mt-6">
            <Panigation page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </div>

        <div className="w-px bg-gray-300"></div>

        <div className="w-[30%] max-md:w-full">
          <GenreResults />
        </div>
      </div>
    </div>
  );
};
