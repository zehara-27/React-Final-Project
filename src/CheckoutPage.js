import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./Stateprovider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";


function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);
  console.log("THE SECRET IS >>>", clientSecret);

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const goToHome = () => {
    dispatch({
      type: "EMPTY_BASKET",
    });
    history.replace("/");
  };

  return (
    <Wrapper>
      <div className="payment">
        <div className="payment__container">
          <h1>
            Checkout (<Link to="/cart">{basket?.length} items</Link>)
          </h1>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Name: zi</h3>
            </div>
            <div className="payment__address">
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              
              <p>5055 W Hacienda Ave</p>
              <p>Las Vegas,NV</p>
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Billing Address</h3>
            </div>
            <div className="payment__address">
              <p>5055 W Hacienda Ave</p>
              <p>Las Vegas,NV</p>
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items and delivery</h3>
            </div>
            <div className="payment__items">
              {basket.map((item) => (
                <div className="checkoutProduct">
                  <img className="checkoutProduct__image1" src={item.image} />
                  <div className="checkoutProduct__info">
                    <p className="checkoutProduct__title">{item.title}</p>
                    <p className="checkoutProduct__price">
                      <small>$</small>
                      <strong>{item.price}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              <form>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button
                    onClick={goToHome}
                    disabled={processing || disabled || succeeded}
                  >
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .payment {
    background-color: white;
  }

  .payment__container > h1 {
    text-align: center;
    padding: 10px;
    font-weight: 400;
    background-color: rgb(234, 237, 237);
    border-bottom: 1px solid lightgray;
  }

  .payment__container > h1 a {
    text-decoration: none;
  }

  .payment__section {
    display: flex;
    padding: 20px;
    margin: 0 20px;
    border-bottom: 1px solid lightgray;
  }

  .payment__title {
    flex: 0.2;
  }

  .payment__address,
  .payment__items,
  .payment__details {
    flex: 0.8;
  }

  .payment__details > form {
    max-width: 400px;
  }

  .payment__details > h3 {
    padding-bottom: 20px;
  }

  .payment__details > form > div > button {
    background: #f0c14b;
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    font-weight: bolder;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }
`;

export default Payment;
