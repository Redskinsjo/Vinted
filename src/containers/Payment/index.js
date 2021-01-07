import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/index";

const stripePromise = loadStripe(
    "pk_test_51HoVKPD5Cg0Rg5MbhkCgGirlDYdyKIEZ4Bhs6SV8axN1k7IwSleCid8yXwJfxCXuM9BJ8m2VSWsYhzUinPzStA1X008GEZ2LwG"
);

const Payment = ({
    details,
    setDetails,
    purchaseClicked,
    setPurchaseClicked,
}) => {
    const routerLoc = useLocation();
    if (purchaseClicked) {
        setPurchaseClicked(false);
    }
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm
                price={
                    routerLoc.state?.price
                        ? routerLoc.state.price
                        : details.offer.price
                }
                product_name={
                    routerLoc.state?.product_name
                        ? routerLoc.state.product_name
                        : details.offer.name
                }
                details={details}
                setDetails={setDetails}
            />
        </Elements>
    );
};

export default Payment;
