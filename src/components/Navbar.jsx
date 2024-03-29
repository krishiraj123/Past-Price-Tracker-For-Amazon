import React from "react";

const Navbar = () => {
  const images = [
    {
      src: "src/assets/icons/black-heart.svg",
      alt: "heart",
      height: 28,
      width: 28,
    },
    {
      src: "src/assets/icons/user.svg",
      alt: "user",
      height: 28,
      width: 28,
    },
  ];
  return (
    <>
      <header>
        <nav className="flex pt-5 md:ps-5 md:ms-16 z-30">
          <div className="flex gap-2">
            <img
              src="src/assets/icons/logo.svg"
              alt="logo"
              height={28}
              width={28}
            />
            <p className="text-3xl font-bold">
              Past<span className="text-red-700">Price</span>
            </p>
          </div>
          <div className="ms-auto">
            <ul className="flex gap-3 md:gap-5 md:me-16">
              {images.map((img, index) => {
                return (
                  <li key={index}>
                    <a
                      href={
                        img.alt === "user"
                          ? "/login"
                          : "/" || img.alt === "heart"
                          ? "/wish"
                          : "/"
                      }
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        height={img.height}
                        width={img.width}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
