import { Header } from "@/app/_features/Header";
import { MovieList } from "./_features/movieList";
import { Footer } from "@/app/_features/Footer";

export default function UpcomingPage() {
  return (
    <div className="flex flex-col gap-12 w-full min-h-screen max-2xl:gap-8 max-md:gap-6 max-sm:gap-3 dark:bg-black">
      <Header />
      <MovieList SectionTitle={"More like this"} />
      <Footer />
    </div>
  );
}
