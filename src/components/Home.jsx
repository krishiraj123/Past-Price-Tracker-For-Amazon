import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Trending from "./Trending";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <div className="flex flex-col justify-between">
        <div>
          <Navbar />
          <HeroSection />
          <Trending />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
