export const MovieCardsLoader = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="
            aspect-[230/430] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse 
            w-2xs shadow justify-between max-2xl:w-56 max-xl:w-50 max-xl:aspect-[230/500] max-sm:w-38 3xl:w-82 max-xs:w-33                   
          "
        />
      ))}
    </>
  );
};
