"use client";
import React from "react";
import { HeroCard } from "../../_components/HeroCard";

export const HeroSection = () => {
  // Card бүрийн мэдээлэл
  const cards = [
    {
      title: "Wicked",
      description: "Experience the untold story of the witches of Oz.",
      image: "/Wicked.png",
    },
    {
      title: "Dune: Part Two",
      description:
        "The epic continues as Paul Atreides unites the desert tribes.",
      image: "/dune.jpg",
    },
    {
      title: "Inside Out 2",
      description: "New emotions arrive as Riley navigates teenage life.",
      image: "/insideout2.jpg",
    },
  ];

  return (
    <div className="flex justify-center py-8 bg-gray-50">
      <div
        className="relative w-[1440px] h-[600px] bg-white border border-gray-200 rounded-xl p-6 
                   flex flex-row justify-between items-center gap-6 overflow-auto"
      >
        {cards.map((card, index) => (
          <HeroCard
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};
