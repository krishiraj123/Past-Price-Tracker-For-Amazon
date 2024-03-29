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
          <a href="" className="nav-link">
            <FaSquareXTwitter color="white" size={20} />
          </a>
          <a className="nav-link" href="">
            <FaLinkedinIn color="white" size={20} />
          </a>
          <a className="nav-link" href="">
            <FaInstagram color="white" size={20} />
          </a>
          <a href="" className="nav-link">
            <FaGithub color="white" size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
