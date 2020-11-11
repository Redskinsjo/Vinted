import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Offer = ({ profile_image, username, product_image, price, id }) => {
  return (
    <div className="container-offer">
      <div className="username-offer">
        <img src={profile_image} alt="" />
        <span>{username}</span>
      </div>

      <div className="image-offer">
        <Link to={`/offer/${id}`}>
          <img src={product_image} alt="" />
        </Link>
      </div>

      <div style={{ height: "50px" }}>
        <div>
          <div>
            <span>{price}</span>
            <span></span>
          </div>
          <div>
            <i></i>
            <span></span>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Offer;
