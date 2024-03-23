import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiStarSLine } from "react-icons/ri";
import { RiMessage2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Modal from "./Modal";
// import Chart from "./chart";

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const productList = [
    {
      cardTitle: "Current Price",
      currentPrice: product.currentPrice,
      currency: product.currency,
      imgSrc: "../src/assets/icons/price-tag.svg",
    },
    {
      cardTitle: "Highest Price",
      currentPrice: product.highestPrice,
      currency: product.currency,
      imgSrc: "../src/assets/icons/arrow-up.svg",
    },
    {
      cardTitle: "Lowest Price",
      currentPrice: product.lowestPrice,
      currency: product.currency,
      imgSrc: "../src/assets/icons/arrow-down.svg",
    },
    {
      cardTitle: "Average Price",
      currentPrice: product.averagePrice,
      currency: product.currency,
      imgSrc: "../src/assets/icons/chart.svg",
    },
  ];

  const printCards = productList.map((val, index) => {
    return (
      <div key={index} class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
        <div class="max-w-sm bg-gray-200 shadow-lg rounded-md overflow-hidden py-3 px-4">
          <div>
            <p className="text-lg font-medium mb-2">{val.cardTitle}</p>
            <div className="flex items-center text-2xl font-semibold gap-2">
              <img src={val.imgSrc} alt="img" />
              <p>
                {val.currency}
                {val.currentPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  window.scrollTo(0, 0);

  const arrayLength = products.length;
  const maxStartIndex = arrayLength - 3;
  const start = Math.floor(Math.random() * (maxStartIndex + 1));
  const end = start + 3;

  return (
    <>
      <div className="lg:w-full lg:flex p-10">
        <div className="lg:w-1/2 flex items-center justify-center mt-20 mb-4 max-h-full rounded-lg  border me-3 shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="max-w-full h-auto img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="lg:w-1/2 md:px-10">
          <h4 className="text-2xl font-bold mb-2">{product.title}</h4>
          <Link className="nav-link" to={product.url}>
            <p className="mb-4 font-thin">Visit Product</p>
          </Link>
          <div className="mb-4 space-x-2">
            <button className="bg-pink-100 text-red-400 font-bold px-3 py-2 rounded-lg">
              <div className="flex justify-center items-center gap-2">
                <CiHeart fontSize={20} />
                123
              </div>
            </button>
            <button className="bg-slate-200 text-black font-bold px-2 py-2 rounded-lg">
              <PiBookmarkSimpleLight fontSize={20} />
            </button>
            <button className="bg-slate-200 text-black font-bold px-2 py-2 rounded-lg">
              <IoShareSocialOutline fontSize={20} />
            </button>
          </div>
          <div className="mb-3 flex mt-10">
            <h2 className="text-3xl font-bold mb-2">
              {product.discountRate !== 0 && (
                <span className="font-thin text-2xl me-2 text-red-600">
                  -{product.discountRate}%
                </span>
              )}
              {product.currency}
              {product.currentPrice}
            </h2>

            <p className="bg-yellow-100 rounded-lg text-yellow-700 font-bold px-2 py-2 ms-auto">
              <div className="flex justify-center items-center">
                <RiStarSLine fontSize={20} />
                <p className="ms-2">{product.stars}</p>
              </div>
            </p>
            <p className=" bg-slate-200 rounded-lg font-bold text-black px-2 py-2 ms-3">
              <div className="flex gap-2 justify-center items-center">
                <RiMessage2Line fontSize={20} className="text-center" />
                {product.reviews}
              </div>
            </p>
          </div>
          <div className="mb-4 flex">
            <h2 className="text-lg text-gray-400 font-medium mb-2 flex flex-nowrap gap-2 items-center">
              <p className="text-sm">M.R.P</p>
              <span className="line-through">
                {product.currency}
                {product.highestPrice}
              </span>
            </h2>
            <p className="ms-32 text-lg text-gray-400 font-thin hidden sm:inline">
              90% Buyers Has recommended this
            </p>
          </div>
          <div className="mb-4">
            <div class="flex flex-wrap">{printCards}</div>
          </div>

          {/* note mailer */}
          <div className="flex lg:flex-row flex-col lg:gap-0 gap-3">
            <div className="rounded-pill bg-dark text-white lg:w-1/2 marker:w-full p-3 text-center me-2 text-mono">
              <Link
                to={product.url}
                target="_blank"
                className="nav-link text-lg font-bold"
              >
                Buy Now
              </Link>
            </div>
            {/* <div className="rounded-pill bg-dark text-white lg:w-1/2 w-full p-3 text-center text-mono text-lg font-bold"> */}
            {/* <Link to={product.url} className="nav-link"> */}
            {/* Track Price */}
            {/* </Link> */}
            {/* </div> */}
            <Modal id={id} />
          </div>
        </div>
      </div>
      {/* <Chart /> */}
      <div className="mb-4 ms-10 me-10 mt-5">
        {product.description !== "" && (
          <h2 className="text-3xl font-bold mb-4 tracking-wide">Description</h2>
        )}
        <p className="text-lg tracking-widest">
          {product?.description?.split("\n")}
        </p>
        <div className="mt-10 mb-4">
          <h2 className="text-3xl font-bold mb-4 tracking-wide">
            Similar Product
          </h2>
          <ProductCard start={start} size={end} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
