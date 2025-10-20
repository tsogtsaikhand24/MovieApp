import { HeroSection } from "./_features/home/HeroSection";
import { PopularMovieList } from "./_features/home/PopularMovieList";
import { TopMovieList } from "./_features/home/TopMovieList";
import { UpcomingMovieList } from "./_features/home/UpcomingMovieList";
import { Header } from "./Header";

export default function Home() {
  return (
    <div classname="w-screen h-screen flex flex-col justify-center items-center bg-black">
      <Header />
      <HeroSection />
      <PopularMovieList />
      <TopMovieList />
      <UpcomingMovieList />
    </div>
  );
}
