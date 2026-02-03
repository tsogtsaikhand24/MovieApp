export const Contact = (props) => {
  const { ContactIcon, ContactType, ContactDomain } = props;
  return (
    <div className="w-fit h-[20%] flex text-white gap-3">
      {ContactIcon}
      <div className="flex flex-col text-sm font-semibold">
        {ContactType}
        <p className="font-light">{ContactDomain}</p>
      </div>
    </div>
  );
};
