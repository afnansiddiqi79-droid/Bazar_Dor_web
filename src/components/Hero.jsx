import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const today = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div
          className="
            overflow-hidden rounded-3xl border border-gray-200
            bg-[#f8fbf8]
            px-5 py-7
            sm:px-8 sm:py-10
            lg:px-12 lg:py-12
          "
        >
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">

            {/* Left Content */}
            <div>
              {/* Eyebrow */}
              <span
                className="
                  inline-block rounded-full
                  bg-green-100 px-3 py-1
                  text-xs font-medium text-green-700
                  sm:text-sm
                "
              >
                {today}
              </span>

              {/* Heading */}
              <h1
                className="
                  mt-4
                  text-3xl font-bold leading-tight text-gray-900
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                আজকের বাজারের
                <br />
                দাম এক নজরে
              </h1>

              {/* Subtitle */}
              <p
                className="
                  mt-4 max-w-2xl
                  text-sm leading-7 text-gray-600
                  sm:text-base sm:leading-8
                "
              >
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                বাজারভিত্তিক বিস্তৃত, গড়, সর্বনিম্ন এবং সর্বাধিক
                দামের পরিবর্তন এক জায়গায়।
              </p>

              {/* CTA */}
              <Link
                href="#all-products"
                className="
                  mt-6 inline-flex items-center justify-center
                  rounded-lg bg-green-700
                  px-5 py-3
                  text-sm font-semibold text-white
                  shadow-sm
                  transition
                  hover:bg-green-800
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-600
                  focus:ring-offset-2
                  sm:px-6
                "
              >
                সব পণ্য দেখুন
              </Link>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজারের পণ্যের ঝুড়ি"
                  width={500}
                  height={400}
                  priority
                  className="
                    h-auto w-full
                    object-contain
                  "
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;