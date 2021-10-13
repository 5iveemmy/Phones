import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Card from "./Card";
import gadgets from "../images/gadgets.png";

function Sidebar() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");

  // const SEARCH_API =
  //   "https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=0&maxPrice=2500&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus";
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

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   fetch(SEARCH_API + searchTerm)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPhones(data.data);
  //     });
  // };

  // const handleOnChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

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
    <>
      <div className="container">
        <div className="head">
          <div className="input-area">
            <h1 className="shop">SHOP OUR LATEST AVAILABLE STOCK HERE</h1>
            <form
              className="form"
              // onSubmit={handleOnSubmit}
            >
              <input
                type="text"
                placeholder="Enter Search Term(e.g iPhone x, 128GB or A1)"
                className="for-input"
                // value={searchTerm}
                // onChange={handleOnChange}
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
      <div className="flex">
        <div className="side-bar">
          <div className="for-category">
            <h2>Categories</h2>
            <ul className="categories">
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
    </>
  );
}

export default Sidebar;
