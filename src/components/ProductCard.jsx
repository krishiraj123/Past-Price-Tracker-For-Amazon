import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.slice(props.start, props.size).map((product, index) => (
          <Link key={index} to={`/product/${product._id}`}>
            <div className="col">
              <div className="card h-100 shadow">
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
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <small className="text-muted font-bold">
                      Highest Price: {product.currency}
                      {product.highestPrice}
                    </small>
                    <small className="text-muted font-bold">
                      Lowest Price: {product.currency}
                      {product.lowestPrice}
                    </small>
                  </div>
                  <h5 className="card-title text-sm font-normal lh-4">
                    {product.title}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center my-3 font-bold">
                    <span className="shadow rounded-lg p-2 m-2">
                      Current Price: {product.currency}
                      {product.currentPrice}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
