import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Offer = ({
  profile_image,
  username,
  product_image,
  price,
  size,
  name,
  id,
}) => {
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

      <div className="product-details">
        <div className="price-and-likes">
          <div className="price">
            <i className="fas fa-euro-sign"></i>
            <span>{price}</span>
          </div>
          <div className="likes">
            <i className="far fa-heart"></i>
            <span></span>
          </div>
        </div>
        <div className="size">{size}</div>
        <div className="brand">{name}</div>
      </div>
    </div>
  );
};

export default Offer;
