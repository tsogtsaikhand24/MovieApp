import RightIcon from "@/app/_Icons/RightIcon";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export function BadgeDemo({ genre, genreIds }) {
  const router = useRouter();
  const handleClickGenreButtons = () => {
    router.push(`/searchFilter/${genreIds}`);
  };
  return (
    <Badge
      variant="secondary"
      className="w-min h-min flex items-center justify-center rounded-full border border-[#E4E4E7] dark:border-[#27272A] cursor-pointer"
      onClick={handleClickGenreButtons}
    >
      {genre}
      <RightIcon />
    </Badge>
  );
}
