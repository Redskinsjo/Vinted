import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./index.css";
import io from "socket.io-client";
import feathers from "@feathersjs/client";

// Establish a Socket.io connection
const socket = io("http://localhost:3030");

// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();
client.configure(feathers.socketio(socket));

const Offer = ({ token, setPurchaseClicked, details, setDetails }) => {
  const [offer, setOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const data = await client.service("offers").get(id);

      setOffer(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    // const response = await axios.get(
    //     "https://lereacteurvinted.herokuapp.com/offer/" + id
    // );
    // setOffer(response.data);
    // setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let renderCarousel;
  if (!isLoading && offer && offer.product_pictures.length > 0) {
    renderCarousel = offer.product_pictures.map((pic, index) => {
      return <img key={index} src={pic.url} alt=""></img>;
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
            {isLoading ? null : offer && offer.product_pictures.length === 0 ? (
              <img
                className="one-image-only"
                src={offer ? offer.product_image.url : null}
                alt=""
              />
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
                {token ? (
                  <Link
                    to={{
                      pathname: "/payment",
                      state: {
                        price: offer ? offer.product_price : null,
                        product_name: offer ? offer.product_name : null,
                      },
                    }}
                    className="link-purchase-now"
                  >
                    <button
                      className="purchase-now"
                      onClick={() => {
                        const copyDetails = Object.assign({}, details);
                        const newDetails = Object.assign(copyDetails, {
                          offer: {
                            price: offer.product_price,
                            name: offer.product_name,
                          },
                        });
                        setDetails(newDetails);
                      }}
                    >
                      Acheter maintenant
                    </button>
                  </Link>
                ) : (
                  <button
                    className="purchase-now"
                    onClick={() => {
                      const copyDetails = Object.assign({}, details);
                      const newDetails = Object.assign(copyDetails, {
                        offer: {
                          price: offer.product_price,
                          name: offer.product_name,
                        },
                      });
                      setDetails(newDetails);
                      setPurchaseClicked(true);
                    }}
                  >
                    Acheter maintenant
                  </button>
                )}
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
