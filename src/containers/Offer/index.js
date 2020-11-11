import React from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Header from "../../components/Header";
import "./index.css";

const Offer = ({ data, isLoading }) => {
  const { id } = useParams();
  let offer;
  if (!isLoading) {
    offer = data.find((offer) => offer._id === id);
  }
  console.log(offer);
  let renderCarousel;
  if (!isLoading && offer && offer.product_pictures.length > 0) {
    renderCarousel = offer.product_pictures.map((pic, index) => {
      return <img key={index} src={pic.url}></img>;
    });
  }
  return (
    <div>
      <Header />
      <div className="super-container-main02">
        <div className="container-main02">
          <div className="container-image">
            {offer && offer.product_pictures.length === 0 ? (
              <img src={offer ? offer.product_image.url : null} alt="" />
            ) : (
              <Carousel>{renderCarousel}</Carousel>
            )}
          </div>
          <div className="container-details"></div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
