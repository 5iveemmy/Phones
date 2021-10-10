import React from "react";
import "./Sidebar.css";

const Card = ({
  name,
  imgUrl,
  amount,
  quantity,
  carrier,
  storageSize,
  grade,
}) => {
  return (
    <div className="card">
      <div className="card-wrap">
        <span className="span">{grade}</span>
        <div className="img-container">
          <img src={imgUrl} alt="phone" className="phone" />
        </div>
        <ul className="phone-specs">
          <li className="iphone">{name}</li>
          <li className="size">
            {carrier} | {storageSize}
          </li>
          <li className="unit">Unit price</li>
          <li className="price">${amount}</li>
          <li className="available">{quantity} Available</li>
        </ul>
        <button className="buy">Buy</button>
      </div>
    </div>
  );
};

export default Card;
