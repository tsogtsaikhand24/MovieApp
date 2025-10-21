import { HeroSection } from "./_features/home/HeroSection";
import { PopularMovieList } from "./_features/home/PopularMovieList";
import { TopMovieList } from "./_features/home/TopMovieList";
import { UpcomingMovieList } from "./_features/home/UpcomingMovieList";
import { Header } from "./Header";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50">
      <Header />
      <HeroSection />
      <PopularMovieList />
      <TopMovieList />
      <UpcomingMovieList />
    </div>
  );
}
