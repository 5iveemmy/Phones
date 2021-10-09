import React from "react";
import "./Sidebar.css";
import gadgets from "../images/gadgets.png";

function Interface() {
  return (
    <div className="container">
      <div className="head">
        <div className="input-area">
          <h1 className="shop">SHOP OUR LATEST AVAILABLE STOCK HERE</h1>
          <form className="form">
            <input
              type="text"
              placeholder="Enter Search Term(e.g iPhone x, 128GB or A1)"
              className="for-input"
            />
            <button className="search">
              SEARCH <i class="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
        <div className="for-gadgets">
          <img src={gadgets} alt="gadgets" className="gadgets" />
        </div>
      </div>
    </div>
  );
}

export default Interface;
