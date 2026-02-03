"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BadgeDemo } from "../_components/BadgeDemo";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN, BASE_URL } from "@/app/_constants";

export function HeaderGenre() {
  const isMobile = useIsMobile();
  const [genreData, setGenreData] = useState([]);

  const GenreDataList = async () => {
    const GenreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;
    const GenreResponse = await fetch(GenreEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await GenreResponse.json();
    setGenreData(data.genres || []);
  };

  useEffect(() => {
    GenreDataList();
  }, []);
  return (
    <NavigationMenu viewport={isMobile} className="z-50">
      <NavigationMenuList className="flex-wrap border rounded-md">
        <NavigationMenuItem className="w-[88px] h-[36px] flex items-center justify-center ">
          <NavigationMenuTrigger className="hidden lg:flex">
            Genre
          </NavigationMenuTrigger>
          <NavigationMenuTrigger className="lg:hidden"></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="lg:w-[577px] w-[300px] h-auto">
              <div className="flex flex-col">
                <p className="text-2xl font-semibold leading-[32px] tracking-[-0.6px]">
                  Genres
                </p>
                <p className="text-base font-normal leading-[24px]">
                  See lists of movies by genre
                </p>
                <div className="h-[16.5px] w-full border-b"></div>
                <div className="h-[16.5px] w-full"></div>
              </div>
              <div className="flex flex-wrap max-h-[333px] w-full gap-4 overflow-y-auto">
                {genreData.map((genre) => {
                  return (
                    <BadgeDemo
                      key={genre.id}
                      genre={genre.name}
                      genreIds={genre.id}
                    />
                  );
                })}
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
