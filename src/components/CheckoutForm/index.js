import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./index.css";

const CheckoutForm = ({ price, product_name, details, setDetails }) => {
    const [succeed, setSucceed] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const firstTax = (0.4).toFixed(2);
    const secondTax = (0.8).toFixed(2);
    const total = Number(price) + Number(firstTax) + Number(secondTax);
    console.log(total);

    const copyDetails = Object.assign({}, details);
    const newDetails = Object.assign(copyDetails, {
        offer: {
            price: Number(total.toFixed(2)),
            name: details.offer.name,
        },
    });
    console.log(details);
    console.log(newDetails);

    const handleClick = async (e) => {
        try {
            const cardElement = elements.getElement(CardElement);
            const stripeResponse = await stripe.createToken(cardElement, {
                name: details.user._id,
            });
            const stripeToken = stripeResponse.token.id;

            const response = await axios.post(
                "https://lereacteurvinted.herokuapp.com/payment",
                {
                    stripeToken,
                    details: newDetails.offer,
                }
            );
            if (response.data.status === "succeeded") {
                setSucceed(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="super-container-checkoutform">
            <div className="container-checkoutform">
                {succeed ? (
                    <div className="valid-checkout">
                        <i
                            style={{ color: "lightgreen", fontSize: "66px" }}
                            className="far fa-check-circle"
                        ></i>
                        <span>Payment succeeded !</span>
                    </div>
                ) : (
                    <div className="checkoutform">
                        <div className="order-summary">
                            <h2>Résumé de la commande</h2>
                            <div>
                                <span>Commande</span>
                                <div>
                                    <span>{details.offer.price}</span>
                                    <i className="fas fa-euro-sign"></i>
                                </div>
                            </div>
                            <div>
                                <span>Frais protection acheteurs</span>
                                <div>
                                    <span>{firstTax}</span>
                                    <i className="fas fa-euro-sign"></i>
                                </div>
                            </div>
                            <div>
                                <span>Frais de port</span>
                                <div>
                                    <span>{secondTax}</span>
                                    <i className="fas fa-euro-sign"></i>
                                </div>
                            </div>
                        </div>
                        <div className="total-and-payment">
                            <div>
                                <span className="strong">Total</span>
                                <div>
                                    <span className="strong">
                                        {total.toFixed(2)}
                                    </span>
                                    <i className="fas fa-euro-sign"></i>
                                </div>
                            </div>
                            <p>
                                Il ne vous reste plus qu'une étape pour vous
                                offrir{" "}
                                <span className="strong">{product_name}</span>.
                                Vous allez payer{" "}
                                <span className="strong">
                                    {total.toFixed(2)} euros
                                </span>
                                (frais de protection et frais de port inclus).
                            </p>
                        </div>
                        <div className="CC-details">
                            <CardElement />
                        </div>
                        <div>
                            <button
                                className="button-payment"
                                onClick={handleClick}
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutForm;
