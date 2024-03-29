import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-dark">
      <div className="flex justify-center md:justify-between ms-2 me-5">
        <p className="text-white text-center text-lg p-2 hidden md:block font-mono">
          &copy;Krishirajsinh Vansia 2024 All Rights Reserved
        </p>
        <div className="flex gap-5 items-center p-2">
          <a href="https://twitter.com/Krishiraj123" className="nav-link">
            <FaSquareXTwitter color="white" size={20} />
          </a>
          <a
            className="nav-link"
            href="https://www.linkedin.com/in/krishiraj-vansia-b97139263/"
          >
            <FaLinkedinIn color="white" size={20} />
          </a>
          <a
            className="nav-link"
            href="https://www.instagram.com/krishiraj123/"
          >
            <FaInstagram color="white" size={20} />
          </a>
          <a href="https://github.com/krishiraj123" className="nav-link">
            <FaGithub color="white" size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
