import React, { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "./Stateprovider";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = (id) => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: id });
  };

  return (
    <Wrapper>
      <div className="checkout__left">
        <div>
          {basket?.map((item) => (
            <div className="checkoutProduct">
              <img className="checkoutProduct__image1" src={item.image} />

              <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{item.title}</p>
                <p className="checkoutProduct__price">
                  <small>$</small>
                  <strong>{item.price}</strong>
                </p>
                <button
                  onClick={() => removeFromBasket(item.id)}
                  className="remove__button"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .checkout__title {
    margin-right: 10px;
    padding: 10px;
    border-bottom: 1px solid lightgray;
    margin-left: 20px;
  }
  .checkoutProduct__image1 {
    width: 180px;
    height: 180px;
    margin-top: 20px;
    margin-left: 20px;
  }
  .remove__button {
    background-color: white;
  }
`;

export default Checkout;
