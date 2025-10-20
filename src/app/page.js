import { HeroSection } from "./_features/home/HeroSection";
import { PopularMovieList } from "./_features/home/PopularMovieList";
import { TopMovieList } from "./_features/home/TopMovieList";
import { UpcomingMovieList } from "./_features/home/UpcomingMovieList";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PopularMovieList />
      <TopMovieList />
      <UpcomingMovieList />
    </div>
  );
}
