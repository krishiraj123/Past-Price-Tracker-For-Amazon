import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const MyCarousel = () => {
  const images = [
    {
      src: "src/assets/images/hero-1.svg",
      alt: "hero-1",
    },
    {
      src: "src/assets/images/hero-2.svg",
      alt: "hero-2",
    },
    {
      src: "src/assets/images/hero-3.svg",
      alt: "hero-3",
    },
    {
      src: "src/assets/images/hero-4.svg",
      alt: "hero-4",
    },
    {
      src: "src/assets/images/hero-5.svg",
      alt: "hero-5",
    },
  ];

  return (
    <>
      <div className="p-5 bg-slate-200 rounded-lg shadow-2xl flex justify-center items-center">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          interval={2000}
          showArrows={false}
          showIndicators={false}
          className="max-w-lg sm:max-w-sm md:max-w-md mx-auto"
        >
          {images.map((img, index) => {
            return (
              <div key={index} className="flex justify-center items-center">
                <img
                  src={img.src}
                  alt={img.alt}
                  height={484}
                  width={484}
                  className="object-fit"
                />
              </div>
            );
          })}
        </Carousel>
        <img
          src="src/assets/icons/hand-drawn-arrow.svg"
          alt="arrow"
          width={175}
          height={175}
          className="max-xl:hidden absolute -left-[-51%] bottom-0"
        />
      </div>
    </>
  );
};

export default MyCarousel;
