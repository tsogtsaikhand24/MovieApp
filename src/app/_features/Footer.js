import { LogoCon } from "../_components/logoContainer";
import { ContactInfo } from "../_components/contactInfo";
import { Socail } from "../_components/socialPages";

export const Footer = () => {
  return (
    <footer className="w-full bg-indigo-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <LogoCon />
        <div className="flex flex-row md:justify-end gap-8 sm:gap-16 w-full md:w-auto">
          <ContactInfo />
          <Socail />
        </div>
      </div>
    </footer>
  );
};
