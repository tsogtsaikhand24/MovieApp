"use client";
import { Footer } from "@/app/_features/Footer";
import { SearchDetails } from "./_features/searchList";
import { useParams } from "next/navigation";
import { Header } from "@/app/_features/Header";

export default function Page() {
  const param = useParams();
  const { inputValue } = param;
  if (!inputValue) {
    return <div>Something wrong!</div>;
  }
  return (
    <div className="w-full mx-auto h-full flex flex-col justify-self-center overflow-hidden bg-white z-[-1] gap-9 items-center dark:bg-black">
      <Header />
      <SearchDetails SectionTitle={"Search results"} inputValue={inputValue} />
      <Footer />
    </div>
  );
}
