
import Image from "next/image";
import React from "react";
import Navlinks from "./Navlinks";

const Header = () => {
  const today = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div>
      <header className="border-t-4 border-gray-900 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex min-h-20 items-center justify-between">

            {/* Logo + Website Info */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 sm:h-11 sm:w-11">
                <Image
                  src="/logo-icon.png"
                  width={32}
                  height={32}
                  alt="বাজার দর"
                  className="h-7 w-7"
                />
              </div>

              <div>
                <h1 className="text-lg font-bold leading-5 text-gray-800 sm:text-3xl">
                  বাজার দর
                </h1>

                <p className="mt-1 text-[9px] text-gray-500 sm:text-xs">
                  {today}
                </p>
              </div>
            </div>

            {/* Temporary Design Buttons */}
            <div className="flex items-center gap-3 sm:gap-6">
              <button className="button btn">
                সাইন ইন
              </button>

              <button className="button btn bg-green-700 text-white">
                সাইন আপ
              </button>
            </div>

          </div>
        </div>
      </header>
      <Navlinks></Navlinks>
    </div>
  );
};

export default Header;