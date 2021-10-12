import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Card from "./Card";

function Sidebar() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL =
    "https://eze-mobile-api-staging.herokuapp.com/api/v1/products/price?category=Smartphones&brand=Apple&sort=lowestAsk&hoursInterval=24&limit=20&page=1&slugId=";

  const reduceMultipleArray = (array) => {
    return [].concat.apply([], array);
  };
  const shareProperty = (data) => {
    return data.map((data) => {
      const { name, imgUrl, slugId, rank } = data;
      return data.data.map((item) => ({
        name,
        imgUrl,
        slugId,
        rank,
        ...item.price,
      }));
    });
  };

  const destruct = (data) => {
    return reduceMultipleArray(shareProperty(data));
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.data.data);
        console.log(
          destruct(data.data.data).sort((a, b) => b.amount - a.amount)
        );
        setPhones(destruct(data.data.data).sort((a, b) => b.amount - a.amount));
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
          {/* <progress value="10" max="100">
            10%
          </progress> */}
          <div className="range-filter">
            <div className="range-controls">
              <div className="scale">
                {" "}
                <div class="bar"></div>
                <span className="for-min">$100</span>
                <div className="toggle min-toggle"></div>
                <span className="for-max">$1000</span>
                <div className="toggle max-toggle"></div>
              </div>
            </div>
          </div>
          <center>
            <input type="text" className="min" placeholder="Min" />
            <input type="text" className="max" placeholder="Max" />
          </center>
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
