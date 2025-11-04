import { Header } from "./Header";
// import { MovieGrid } from "./_features/home/MovieGrid";
import Test123 from "./_features/home/Test123";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 gap-[20px]">
      <Header />
      <Test123 />

      {/* 
      <MovieGrid
        title="Upcoming"
        fetchPath="/movie/upcoming"
        seeMorePath="/upcoming"
      />

      <MovieGrid
        title="Popular"
        fetchPath="/movie/popular"
        seeMorePath="/popular"
      />

      <MovieGrid
        title="Top Rated"
        fetchPath="/movie/top_rated"
        seeMorePath="/toprated"
      /> */}
    </div>
  );
}
