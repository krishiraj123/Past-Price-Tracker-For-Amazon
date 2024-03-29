import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import swal from "sweetalert";
import { scrapeAndStoreProduct } from "../../lib/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const navigate = useNavigate();

  const buttonBackground =
    searchPrompt.length === 0
      ? "bg-red-200 text-white px-5 py-3 rounded-md"
      : "bg-red-700 text-white px-5 py-3 rounded-md";

  const isValidLink = (url) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.toLowerCase();

      if (
        hostname.includes("amazon.") ||
        hostname.endsWith(".amazon.com") ||
        hostname.endsWith(".amazon.")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = isValidLink(searchPrompt);
    if (!isValid) {
      swal("Invalid Url!", "Please enter a valid Amazon product link", "error");
      return;
    }

    try {
      const product = await scrapeAndStoreProduct(searchPrompt);
      if (product === undefined) return;
      const response = await axios.post("http://localhost:3000/product", {
        product,
      });
      console.log(response.status);
      if (response.status === 201) {
        Swal.fire({
          title: "No Such Item Found",
          text: "The item is out of stock or currently unavailable",
          icon: "warning",
        });
      } else {
        navigate(`/product/${response.data._id}`);
      }
    } catch (err) {
      console.error(
        `Failed to create/update product for URL ${searchPrompt}: ${err.message}`
      );
      console.error(err.response.data);
    }
  };

  return (
    <>
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter the product link"
            className="text-xl rounded-md border-2 px-5 py-2 md:w-96"
            value={searchPrompt}
            onChange={(e) => {
              setSearchPrompt(e.target.value);
            }}
          />
          <button
            className={buttonBackground}
            disabled={searchPrompt.length === 0}
          >
            <div className="flex justify-center items-center">
              <FaArrowRight />
            </div>
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
