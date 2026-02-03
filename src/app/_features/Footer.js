import EmailIcon from "../_Icons/EmailIcon";
import MovieZWhiteIcon from "../_Icons/MovieZWhiteIcon";
import PhoneIcon from "../_Icons/PhoneIcon";

export const Footer = () => {
  return (
    <div className="w-full ">
      <div className="pt-8 md:pt-12 lg:pt-[52px]">
        <div className="w-full bg-[#4338CA] dark:bg-[#3730A3] flex justify-center">
          <div className="w-full max-w-[1440px] py-8 md:py-10 lg:py-[40px] px-4 md:px-6 lg:px-8 flex justify-center items-center">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-[120px] justify-between w-full max-w-[1280px] p-5">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center text-[#FAFAFA] text-sm italic font-bold leading-[20px] tracking-[0.32px]">
                  <MovieZWhiteIcon className="w-5 h-5" />
                  Movie Z
                </div>
                <div className="text-[#FAFAFA] text-xs sm:text-sm font-normal leading-[20px]">
                  © 2025 Movie Z. All Rights Reserved.
                </div>
              </div>
              <div className="flex sm:flex-row gap-8 sm:gap-12 lg:gap-[96px] justify-between">
                <div className="flex flex-col gap-3">
                  <p className="text-[#FAFAFA] text-sm font-semibold leading-[20px]">
                    Contact Information
                  </p>
                  <div className="flex flex-col gap-4 sm:gap-6">
                    <div className="flex gap-3 items-start">
                      <EmailIcon className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#FAFAFA]/80 text-xs sm:text-sm font-normal leading-[20px]">
                          Email:
                        </p>
                        <a
                          href="mailto:support@movieZ.com"
                          className="text-[#FAFAFA] text-xs sm:text-sm font-normal leading-[20px] hover:underline"
                        >
                          support@movieZ.com
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <PhoneIcon className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#FAFAFA]/80 text-xs sm:text-sm font-normal leading-[20px]">
                          Phone:
                        </p>
                        <a
                          href="tel:+97611123456"
                          className="text-[#FAFAFA] text-xs sm:text-sm font-normal leading-[20px] hover:underline"
                        >
                          +976 (11) 123-4567
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[#FAFAFA] text-sm font-normal leading-[20px] flex flex-col gap-3">
                  <p className="font-semibold">Follow us</p>
                  <div className="flex flex-col lg:flex-row flex-wrap gap-3 sm:gap-4">
                    <a
                      href="#"
                      className="hover:underline hover:text-white transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href="#"
                      className="hover:underline hover:text-white transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="hover:underline hover:text-white transition-colors"
                    >
                      Twitter
                    </a>
                    <a
                      href="#"
                      className="hover:underline hover:text-white transition-colors"
                    >
                      Youtube
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
