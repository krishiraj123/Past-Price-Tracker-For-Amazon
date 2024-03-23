import React from "react";
import MyCarousel from "./MyCarousel";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <div className="flex lg:justify-center lg:items-center lg:h-screen mt-5 flex-col-reverse lg:flex-row gap-10">
      <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center flex-wrap mx-5">
        <p className="text-red-700 font-medium mb-8 md:my-0">
          Smart Shopping Starts Here: <span className="text-xl">→</span>
        </p>
        <p className="text-6xl font-bold">
          Unleash the Power of <span className="text-red-700">PastPrice</span>
        </p>
        <p className="font-medium text-lg my-5 md:my-8 leading-7">
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more.
        </p>
        <div className="my-8 md:my-8">
          <SearchBar />
        </div>
      </div>

      <div className="lg:w-1/2 my-10 lg:my-0 flex justify-center items-center">
        <MyCarousel />
      </div>
    </div>
  );
};

export default HeroSection;
