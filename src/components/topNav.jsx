import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  FaQuestionCircle, 
  FaPhone, 
  FaGlobe, 
  FaInfoCircle, 
  FaEllipsisV 
} from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { useAuth } from "./contexts/AuthContext";

export default function TopNav() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showSellOverlay, setShowSellOverlay] = useState(false);

  // Navigation items common to all users
  const navItems = [
    { icon: <FaQuestionCircle size={15} />, label: "Help", link: "/help" },
    { icon: <FaPhone size={15} />, label: "Contact", link: "/contact" },
    { icon: <FaGlobe size={15} />, label: "Language", link: "/language" },
    { icon: <FaInfoCircle size={15} />, label: "About", link: "/about" },
  ];
  

  // Determine if seller-specific links should be shown
  const isSeller = currentUser && currentUser.isSeller;

  // When the Sell button is clicked, show the overlay.
  const handleSellClick = () => {
    setShowSellOverlay(true);
  };

  // When the sell overlay is active, wait 2 seconds then navigate.
  useEffect(() => {
    let timer;
    if (showSellOverlay) {
      timer = setTimeout(() => {
        setShowSellOverlay(false);
        navigate("/sell");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showSellOverlay, navigate]);

  return (
    <>
      <style>{`
        .topnav-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 5px;
          background: none;
          border-bottom: 2px solid cyan;
          position: relative;
          top: -20px;
          width: 200px;
        }
        .nav-item {
          position: relative;
          margin: 5px;
        }
        .nav-button {
          background: none;
          border: none;
          color: cyan;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .nav-button:hover {
          color: white;
          transform: scale(1.2);
        }
        .tooltip {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: cyan;
          color: black;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 12px;
          white-space: nowrap;
          box-shadow: 0 0 5px cyan;
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .nav-item:hover .tooltip {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-menu-icon {
          display: none;
          font-size: 13px;
          color: cyan;
          cursor: pointer;
          transition: transform 0.3s ease;
          position:relative;
          top: -7px;
        }
        .mobile-menu-icon:hover {
          transform: scale(1.2);
        }
        .mobile-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          z-index: 1000;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
        }
        .mobile-overlay.show {
          display: flex;
        }
        .mobile-nav-card {
          width: 50%;
          background: none;
          border-bottom: 2px solid cyan;
          padding: 5px 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          transform: translateY(-100%);
          transition: transform 1s ease;
          position: absolute;
          top: 10px;
          right: 40px;
        }
        .mobile-overlay.show .mobile-nav-card {
          transform: translateY(0);
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 5px;
          font-size: 16px;
          background: none;
          border: none;
          color: cyan;
          cursor: pointer;
          z-index: 5000;
        }
        .mobile-nav-button {
          background: none;
          border: none;
          color: cyan;
          font-size: 11px;
          cursor: pointer;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .mobile-nav-button:hover {
          color: white;
          transform: scale(1.1);
        }
        /* Overlay for Sell */
        .sellOverlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 1500;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #00ffff;
          text-align: center;
        }
        .sellOverlay p {
          font-size: 20px;
          margin-bottom: 20px;
          padding: 0 20px;
        }
        .progressBarContainer {
          width: 80%;
          height: 20px;
          border: 2px solid #00ffff;
          border-radius: 10px;
          overflow: hidden;
          background: #000;
        }
        .progressBar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #00ffff, #ff00ff);
          animation: fillProgress 2s forwards;
        }
        @keyframes fillProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        /* Responsive Design */
        @media (max-width: 668px) {
          .topnav-container {
            display: none;
          }
          .mobile-menu-icon {
            display: block;
          }

        
        }
       
         @media (max-width: 1108px) {
         .seller{
          display: none;
         }
         }

      `}</style>

      {/* Seller-specific Links: Only display if currentUser.isSeller is true */}
      {currentUser && currentUser.isSeller && (
        <div className="seller">
          <Link 
            to="/seller-dashboard" 
            className="sell me-4" 
            style={{ textDecoration: 'underline', color: 'white', position: 'relative', top: '-6px', left: '-10px', letterSpacing: '1px', fontWeight: 400, fontSize: '13px' }}
          >
            <i className="fa-sharp fa-solid fa-store"></i>
          </Link>
          <button 
            className="sell" 
            onClick={handleSellClick}
            style={{ textDecoration: 'underline', color: 'white', position: 'relative', top: '-7px', left: '-10px', letterSpacing: '1px', fontWeight: 400, fontSize: '13px', border:'none', cursor:'pointer', background:"none" }}
          >
            Sell
          </button>
        </div>
      )}

<div className="topnav-container">
  {navItems.map((item, index) => (
    <div key={index} className="nav-item">
      <Link to={item.link || "#"} className="nav-button">
        {item.icon}
      </Link>
      <div className="tooltip">{item.label}</div>
    </div>
  ))}
</div>

      {/* Mobile Navigation */}
      <FaEllipsisV
        className="mobile-menu-icon"
        onClick={() => setShowMobileNav(true)}
      />
      <div className={`mobile-overlay ${showMobileNav ? "show" : ""}`}>
        <button
          className="close-button"
          onClick={() => setShowMobileNav(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

       <div className="mobile-nav-card">
       {navItems.map((item, index) => (
     <div key={index} className="nav-item">
      <Link to={item.link || "#"} className="mobile-nav-button">
        {item.icon}
      </Link>
     </div>
     ))}
    </div>

      </div>

      {/* Sell Overlay */}
      {showSellOverlay && (
        <div className="sellOverlay">
          <p>
            Give your product amazing details and a great image to attract buyers!
          </p>
          <div className="progressBarContainer">
            <div className="progressBar"></div>
          </div>
        </div>
      )}
    </>
  );
}
