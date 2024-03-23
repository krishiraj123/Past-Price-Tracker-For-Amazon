import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ProductPage from "./components/ProductPage.jsx";
import Home from "./components/Home.jsx";
import AdminSection from "./components/AdminSection.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/admin" element={<AdminSection />} />
    </Routes>
  </BrowserRouter>
);
