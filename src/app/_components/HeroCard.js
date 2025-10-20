import React from "react";

export const HeroCard = ({ title, description, image }) => {
  return (
    <div
      className="flex-none w-[1000px] h-[550px] rounded-xl shadow-md overflow-hidden 
                 relative cursor-pointer group"
    >
      {/* background image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* text */}
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-200 w-[360px]">{description}</p>
      </div>
    </div>
  );
};
