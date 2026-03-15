import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm font-weight-bold">
      <div className="container">
        
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div 
            className="d-flex align-items-center justify-content-center bg-dark text-white rounded-circle me-2" 
            style={{ width: "35px", height: "35px", fontWeight: "bold", textAlign:"left",marginRight: "10px"}}
          >
            S
          </div>
          <span className="fw-bold">Simplify Money</span>
        </Link>

        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle fw-semibold"
                href="#metals"
                id="metalsDropdown"
                role="button"
                onClick={(e) => { e.preventDefault(); setDropdownOpen(!dropdownOpen); }}
                aria-expanded={dropdownOpen ? "true" : "false"}
              >
                Metals
              </a>
              <ul className={`dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2 ${dropdownOpen ? 'show' : ''}`} aria-labelledby="metalsDropdown" style={{ right: 0, left: "auto" }}>
                <li><Link className="dropdown-item" to="/gold" onClick={() => setDropdownOpen(false)}>Gold</Link></li>
                <li><Link className="dropdown-item" to="/silver" onClick={() => setDropdownOpen(false)}>Silver</Link></li>
                <li><Link className="dropdown-item" to="/platinum" onClick={() => setDropdownOpen(false)}>Platinum</Link></li>
                <li><Link className="dropdown-item" to="/palladium" onClick={() => setDropdownOpen(false)}>Palladium</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;