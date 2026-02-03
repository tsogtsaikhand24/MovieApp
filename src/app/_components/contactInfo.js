import { FiPhone } from "react-icons/fi";
import { Contact } from "./Contact";
import { MdOutlineMailOutline } from "react-icons/md";

export const ContactInfo = () => {
  return (
    <div className="w-fit h-full flex flex-col gap-[20px]">
      <p className="text-sm text-white leading-5">Contact information</p>
      <Contact
        ContactIcon={<MdOutlineMailOutline className="h-full size-4" />}
        ContactType={"Email:"}
        ContactDomain={"support@movieZ.com"}
      />
      <Contact
        ContactIcon={<FiPhone className="h-full size-4" />}
        ContactType={"Phone:"}
        ContactDomain={"+976 (11) 123-4567"}
      />
    </div>
  );
};
