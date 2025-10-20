import React from "react";

export const HeroCard = ({ title, description, image }) => {
  return (
    <div
      className="relative w-[400px] h-[250px] bg-white rounded-xl shadow-md overflow-hidden 
                 hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      {/* background image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* content */}
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
      </div>
    </div>
  );
};
