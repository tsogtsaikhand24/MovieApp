import Link from "next/link";
import { FiFilm } from "react-icons/fi";
export const LogoWhite = () => {
  return (
    <Link href={"/"}>
      <div className="flex gap-[8px] text-white items-center">
        <FiFilm />
        <p className="italic font-bold text-xl">Movie Z</p>
      </div>
    </Link>
  );
};
