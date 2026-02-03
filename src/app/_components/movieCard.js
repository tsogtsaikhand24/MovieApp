import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

export const MovieCard = ({ rating, title, image, movieId }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/movie-detail/${movieId}`);
  };
  return (
    <div
      className="w-2xs aspect-[230/430] flex flex-col bg-[#f4f4f5] shadow rounded-xl justify-between cursor-pointer max-2xl:w-56 max-xl:w-50 max-xl:aspect-[230/500] max-sm:w-38 3xl:w-82 dark:bg-[#27272a] max-xs:w-33"
      onClick={handleClick}
    >
      <img
        src={image}
        className="rounded-t-xl w-full h-[80%] object-cover hover:brightness-50 duration-300 max-xl:h-[70%]"
      />
      <div className="w-full h-[19.5%] rounded-xl pl-2.5 max-xl:h-[29.5%]">
        <div className="flex items-center text-gray-400 ">
          <FaStar className="mr-1 text-yellow-400 size-5" />
          <p className="text-base">
            <span className="font-bold text-black dark:text-white text-lg">
              {rating}
            </span>
            /10
          </p>
        </div>
        <p className="text-lg h-fit max-md:text-base max-sm:text-sm">{title}</p>
      </div>
    </div>
  );
};
