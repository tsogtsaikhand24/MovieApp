"use client";
import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import { Details } from "./_features/movieDetail";
import { useParams } from "next/navigation";

export default function UpcomingPage() {
  const param = useParams();
  const { id } = param;
  if (!id) {
    return <div>Something wrong!</div>;
  }
  return (
    <div className="flex flex-col gap-12 w-full min-h-screen max-2xl:gap-8 max-md:gap-6 max-sm:gap-3 dark:bg-black">
      <Header />
      <Details id={id} />
      <Footer />
    </div>
  );
}
