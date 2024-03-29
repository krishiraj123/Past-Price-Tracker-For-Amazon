import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Trending = () => {
  return (
    <div className="container mt-5 mb-3">
      <h1 className="mb-5 text-5xl font-bold">
        <span className="border-b-4 border-warning p-2">Trending</span>
      </h1>
      <ProductCard start={0} size={6} />
    </div>
  );
};

export default Trending;
