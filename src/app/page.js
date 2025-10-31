import { Header } from "./Header";
import { HeroSection } from "./_features/home/HeroSection";
import { MovieGrid } from "./_features/home/MovieGrid";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 gap-[20px]">
      <Header />
      <HeroSection />
      <MovieGrid
        title="Upcoming"
        fetchPath="/movie/upcoming"
        initialCount={10}
      />
      <MovieGrid title="Popular" fetchPath="/movie/popular" initialCount={10} />
      <MovieGrid
        title="Top Rated"
        fetchPath="/movie/top_rated"
        initialCount={10}
      />
    </div>
  );
}
