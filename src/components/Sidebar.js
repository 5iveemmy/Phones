import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Card from "./Card";

function Sidebar() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL =
    "https://eze-mobile-api-staging.herokuapp.com/api/v1/products/price?category=Smartphones&brand=Apple&sort=lowestAsk&hoursInterval=24&limit=20&page=1&slugId=";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // console.log(data.data.data);
        setPhones(data.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className="flex">
      <div className="side-bar">
        <div className="for-category">
          <h2>Categories</h2>
          <ul>
            <li>All</li>
            <li>iphone</li>
            <li>Samsung</li>
            <li>ipad</li>
            <li>Macbook</li>
            <li>Airpods</li>
          </ul>
        </div>
        <div className="filter">
          <h2>Price Filter</h2>
          <progress value="10" max="100">
            10%
          </progress>
          <input type="text" placeholder="Min" />
          <input type="text" placeholder="Max" />
        </div>
        <div className="Storage">
          <ul>
            <li>
              {" "}
              <input type="checkbox" />
              32GB
            </li>
            <li>
              {" "}
              <input type="checkbox" />
              64GB
            </li>
            <li>
              {" "}
              <input type="checkbox" />
              128GB
            </li>
            <li>
              {" "}
              <input type="checkbox" />
              256GB
            </li>
          </ul>
        </div>
      </div>
      <div className="cards">
        <div className="cards-wrap">
          {phones.length > 0 &&
            phones.map((phone) => <Card key={phone.id} {...phone} />)}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
