import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-light mt-auto w-100" style={{ padding: "20px 0" }}>
      <div className="container-fluid px-4 px-lg-5">

        <div className="row align-items-center">

          
          <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center bg-dark text-white rounded-circle me-3"
                style={{  width: "35px", height: "35px", fontWeight: "bold", textAlign:"left",marginRight: "10px" }}
              >
                S
              </div>
              <div className="d-flex flex-column" style={{ lineHeight: "1.2" }}>
                <span className="text-secondary" style={{ fontSize: "1.1rem" }}>Simplify Money</span>
                <span className="text-muted" style={{ fontSize: "0.8rem", color: "#adb5bd" }}>
                  &copy; {new Date().getFullYear()} All Rights Reserved
                </span>
              </div>
            </div>
          </div>

          
          <div className="col-md-8">
            <div className="d-flex justify-content-center justify-content-md-end align-items-center" style={{ gap: "45px" }}>
              <Link to="/" className="text-decoration-none text-secondary" style={{ fontSize: "0.95rem" }}>Home</Link>
              <Link to="/gold" className="text-decoration-none text-secondary" style={{ fontSize: "0.95rem" }}>Gold</Link>
              <Link to="/silver" className="text-decoration-none text-secondary" style={{ fontSize: "0.95rem" }}>Silver</Link>
              <Link to="/platinum" className="text-decoration-none text-secondary" style={{ fontSize: "0.95rem" }}>Platinum</Link>
              <Link to="/palladium" className="text-decoration-none text-secondary" style={{ fontSize: "0.95rem" }}>Palladium</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;