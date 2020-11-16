import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './index.css';

const Offer = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    // const response = await Axios.get(
    //   'https://lereacteur-vinted-api.herokuapp.com/offers'
    // );
    const response = await Axios.get(
      'https://lereacteurvinted.herokuapp.com/offers'
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { id } = useParams();

  let offer;
  if (!isLoading) {
    offer = data.offers.find((offer) => offer._id === id);
  }
  let renderCarousel;
  if (!isLoading && offer && offer.product_pictures.length > 0) {
    renderCarousel = offer.product_pictures.map((pic, index) => {
      return <img key={index} src={pic.url}></img>;
    });
  }

  let renderProductDetails;
  if (!isLoading) {
    renderProductDetails = offer.product_details.map((detail, index) => {
      const keys = Object.keys(detail);
      return (
        <div className="product-detail" key={index}>
          <span>{keys[0]}</span>
          <span>{detail[keys[0]]}</span>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="super-container-main02">
        <div className="container-main02">
          <div className="container-image">
            {offer && offer.product_pictures.length === 0 ? (
              <img src={offer ? offer.product_image.url : null} alt="" />
            ) : (
              <Carousel>{renderCarousel}</Carousel>
            )}
          </div>
          <div className="container-details">
            <div className="price-and-details">
              <h1 className="offer-product-name">
                {offer && offer.product_name}
              </h1>
              <div className="offer-price-detail">
                <i className="fas fa-euro-sign"></i>
                <h2>{offer && offer.product_price}</h2>
              </div>
              {renderProductDetails}
            </div>
            <div className="description-and-purchase">
              <h3>Description</h3>
              <div className="description">
                {offer && offer.product_description}
              </div>
              <div className="purchase">
                <button className="ask-seller">Questionner le vendeur</button>
                <button className="purchase-now">Acheter maintenant</button>
                <button className="add-favorite">Ajouter aux favoris</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
