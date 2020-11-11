import React from "react";
import { Pagination } from "antd";
import Offer from "../Offer";
import "./index.css";

const Main = ({ data, isLoading }) => {
  let renderOffers;
  if (!isLoading) {
    renderOffers = data.map((offer, index) => {
      return (
        <Offer
          profile_image={offer.owner.account.avatar.url}
          username={offer.owner.account.username}
          product_image={offer.product_image.url}
          price={offer.product_price}
          id={offer._id}
          key={index}
        />
      );
    });
  }

  return (
    <div className="super-container-main">
      <div className="container-main">
        <div className="streamline-main">
          <h2>Fil d'actu</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {" "}
            {isLoading ? "En cours de chargement" : renderOffers}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
