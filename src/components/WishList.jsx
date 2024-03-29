import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const WishList = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const likedProductIds =
      JSON.parse(localStorage.getItem("likedProductIds")) || [];

    const fetchLikedProducts = async () => {
      try {
        const products = await Promise.all(
          likedProductIds.map(async (productId) => {
            const response = await axios.get(
              `http://localhost:3000/product/${productId}`
            );
            return response.data;
          })
        );
        setLikedProducts(products);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };

    fetchLikedProducts();
  }, []);

  const handleRemoveProduct = (productId) => {
    const likedProductIds =
      JSON.parse(localStorage.getItem("likedProductIds")) || [];

    const updatedLikedProductIds = likedProductIds.filter(
      (id) => id !== productId
    );

    localStorage.setItem(
      "likedProductIds",
      JSON.stringify(updatedLikedProductIds)
    );

    setLikedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );

    window.location.reload();
  };

  return (
    <>
      <div className="container mt-2">
        <h1 className="text-3xl text-red-600 mb-5 font-bold">Wishlist💖</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {likedProducts.map((product, index) => (
            <div key={product._id} className="col">
              <div className="card h-100 shadow">
                <a href={"/product/" + product._id}>
                  <img
                    src={product.imageUrl}
                    className="card-img-top img-fluid p-3"
                    alt="Product"
                    style={{
                      height: "200px",
                      objectFit: "contain",
                      width: "100%",
                    }}
                  />
                </a>
                <div className="card-body">
                  <Link to={"/product/" + product._id}>
                    <h5 className="card-title text-xl font-semibold">
                      {product.title.substring(0, 35)}
                    </h5>
                    <div className="d-flex justify-content-between mb-3">
                      <small className="text-muted font-mono font-semibold">
                        Highest Price: {product.currency} {product.highestPrice}
                      </small>
                      <small className="text-muted font-mono font-semibold">
                        Lowest Price: {product.currency} {product.lowestPrice}
                      </small>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted font-extrabold font-sans">
                      Current Price: {product.currency} {product.currentPrice}
                    </h6>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveProduct(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WishList;
