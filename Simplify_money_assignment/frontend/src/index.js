import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./index.css";


import Home from "./landing_pages/Home";
import Gold from "./landing_pages/Gold";
import Silver from "./landing_pages/Silver";
import Platinum from "./landing_pages/Platinum";
import Palladium from "./landing_pages/Palladium";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />

       
        <Route path="/gold" element={<Gold />} />
        <Route path="/silver" element={<Silver />} />
        <Route path="/platinum" element={<Platinum />} />
        <Route path="/palladium" element={<Palladium />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);