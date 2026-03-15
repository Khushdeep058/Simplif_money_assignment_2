import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();
  const [prices, setPrices] = useState({
    gold: "--",
    silver: "--",
    platinum: "--",
    palladium: "--",
    date: "--"
  });

  useEffect(() => {
    const fetchPrices = () => {
      fetch("/api/prices")
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setPrices({
              gold: data.gold ? `₹ ${data.gold}` : "--",
              silver: data.silver ? `₹ ${data.silver}` : "--",
              platinum: data.platinum ? `₹ ${data.platinum}` : "--",
              palladium: data.palladium ? `₹ ${data.palladium}` : "--",
              date: data.date || "--"
            });
          }
        })
        .catch(err => console.error("Failed to fetch prices", err));
    };

    
    fetchPrices();

    
    const intervalId = setInterval(fetchPrices, 30000);

    
    return () => clearInterval(intervalId);
  }, []);

  
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar />
      <div className="container p-5">
        
      <div className="text-center">
        <img
          src="https://verifiedinvesting.com/cdn/shop/articles/vi-education-key-differences-in-gold-silver-platinum-palladium.jpg?v=1718034834&width=1000"
          alt="Gold Silver Platinum Palladium"
          className="img-fluid mb-5"
          style={{width: "90%",maxWidth: "1100px",height: "500px",objectFit: "cover",objectPosition: "center",borderRadius: "12px",display: "block",margin: "0 auto"}}
        />
        <h1 className="mt-3 mb-5">
          Invest in Gold, Silver, Platinum & Palladium
        </h1>
      </div>

      <div className="row text-center g-4">
        {/* Gold Card */}
        <div className="col-md-3">
          <div
            className="card shadow h-100"
            onClick={() => handleNavigation("/gold")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://t3.ftcdn.net/jpg/02/31/29/72/360_F_231297252_HAx1Lp9MDYKgaQB6rF37SYDdtARu8EwG.jpg"
              className="card-img-top"
              alt="Gold"
              style={{ height: "150px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column text-start">
              <h5 className="card-title mb-3">Gold</h5>
              <p className="text-muted mb-1">Live Price: {prices.gold}</p>
              <p className="text-muted mb-3">Date: {prices.date}</p>
              <div className="d-flex justify-content-end mt-auto">
                <p className="text-primary text-decoration-underline mb-0">Know more</p>
              </div>
            </div>
          </div>
        </div>

        {/* Silver Card */}
        <div className="col-md-3">
          <div
            className="card shadow h-100"
            onClick={() => handleNavigation("/silver")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Silver_crystal.jpg"
              className="card-img-top"
              alt="Silver"
              style={{ height: "150px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column text-start">
              <h5 className="card-title mb-3">Silver</h5>
              <p className="text-muted mb-1">Live Price: {prices.silver}</p>
              <p className="text-muted mb-3">Date: {prices.date}</p>
              <div className="d-flex justify-content-end mt-auto">
                <p className="text-primary text-decoration-underline mb-0">Know more</p>
              </div>
            </div>
          </div>
        </div>

        {/* Platinum Card */}
        <div className="col-md-3">
          <div
            className="card shadow h-100"
            onClick={() => handleNavigation("/platinum")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://t4.ftcdn.net/jpg/19/26/10/39/360_F_1926103954_KOJyxPwxLpkgxGXPaf9QOxAD9uA6ke41.jpg "
              className="card-img-top"
              alt="Platinum"
              style={{ height: "150px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column text-start">
              <h5 className="card-title mb-3">Platinum</h5>
              <p className="text-muted mb-1">Live Price: {prices.platinum}</p>
              <p className="text-muted mb-3">Date: {prices.date}</p>
              <div className="d-flex justify-content-end mt-auto">
                <p className="text-primary text-decoration-underline mb-0">Know more</p>
              </div>
            </div>
          </div>
        </div>

        {/* Palladium Card */}
        <div className="col-md-3">
          <div
            className="card shadow h-100"
            onClick={() => handleNavigation("/palladium")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://img.freepik.com/premium-photo/palladium-is-chemical-element-that-room-temperature-contracts-solid-state-metal-used-industry-mineral-extraction-concept_72932-2438.jpg"
              className="card-img-top"
              alt="Palladium"
              style={{ height: "150px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column text-start">
              <h5 className="card-title mb-3">Palladium</h5>
              <p className="text-muted mb-1">Live Price: {prices.palladium}</p>
              <p className="text-muted mb-3">Date: {prices.date}</p>
              <div className="d-flex justify-content-end mt-auto">
                <p className="text-primary text-decoration-underline mb-0">Know more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;