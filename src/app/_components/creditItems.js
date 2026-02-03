export const CreditItem = ({ label, items }) => {
  return (
    <div className="w-full h-fit flex flex-col">
      <p className="flex">
        <span className="font-semibold w-24">{label}:</span>
        <span className="flex-1">{items.join(" · ")}</span>
      </p>
      <div className="w-full h-5 items-center flex">
        <div className="w-full h-0.5 border border-gray-300" />
      </div>
    </div>
  );
};
