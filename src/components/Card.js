import React from "react";
import "./Sidebar.css";
import backandRed from "../images/backandRed.png";

const Card = () => {
  return (
    <div className="card">
      <div className="card-wrap">
        <span className="span">B!</span>
        <img src={backandRed} alt="phone" className="phone" />
        <ul className="phone-specs">
          <li className="iphone">iPhone 7</li>
          <li className="size">Unlocked | 256GB</li>
          <li className="unit">Unit price</li>
          <li className="price">$450</li>
          <li className="available">1500 Available</li>
        </ul>
        <button className="buy">Buy</button>
      </div>
    </div>
  );
};

export default Card;
