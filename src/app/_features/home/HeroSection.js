"use client";
import React from "react";
import { HeroCard } from "../../_components/HeroCard";

export const HeroSection = () => {
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
    {
      title: "Oppenheimer",
      description: "The man who built the atomic bomb.",
      image: "/oppenheimer.jpg",
    },
    {
      title: "Barbie",
      description: "The doll who changed the world.",
      image: "/barbie.jpg",
    },
  ];

  return (
    <div className="flex justify-center py-8 bg-gray-50">
      {/* 🟢 Container — scroll зөв ажиллах газар */}
      <div
        className="w-[1440px] h-[600px] bg-white border border-gray-200 rounded-xl p-6 
                   overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      >
        {/* 🟣 Дотор flex, өргөн картуудын тооноос хамаарч автоматаар нэмэгдэнэ */}
        <div className="flex flex-nowrap gap-6 w-max">
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
    </div>
  );
};
