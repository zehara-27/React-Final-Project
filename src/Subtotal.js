import React from "react";

import styled from "styled-components";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./Stateprovider";
import { useHistory } from "react-router";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();

  const history = useHistory();
  const getBasketTotal = (basket) =>
    basket.reduce((amount, item) => item.price + amount, 0);

  return (
    <Wrapper>
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <div>
              <p>
                {" "}
                Subtotal ({basket.length} items): <strong>{value}</strong>
              </p>
            </div>
          )}
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
        <button onClick={(e) => history.push("/checkoutpage")}>Checkout</button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .subtotal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    height: 100px;
    padding: 20px;
    background-color: #f3f3f3;
    border: 1px solid #dddddd;
    border-radius: 3px;
  }
  .subtotal__gift {
    display: flex;
    align-items: center;
    margin-top: 13px;
  }
  .subtotal__gift > input {
    margin-right: 5px;
  }
  .subtotal > button {
    background: #f0c14b;
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }
`;
export default Subtotal;
