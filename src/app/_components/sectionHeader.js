import { SeeMoreButton } from "./seeMoreButton";

export const SectionHeader = ({ sectionTitle, onClick }) => {
  return (
    <div className="w-full flex items-center justify-between max-md:px-5">
      <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
        {sectionTitle}
      </h2>

      <SeeMoreButton onClick={onClick} />
    </div>
  );
};
