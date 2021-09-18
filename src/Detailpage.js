import React from "react";
import styled from "styled-components";
import { useStateValue } from "./Stateprovider";

function Detailpage() {
  const [{ basket, detail, quantity }, dispatch] = useStateValue();
  console.log("basket", basket);
  console.log(quantity);
  const addToBasket = (product) => {
    dispatch({
      type: "ADD_TO_BASKET",
      payload: product,
    });
  };
  return (
    <Wrapper>
      {detail.map((product) => (
        <div className="details">
          <img className="details__image" src={product.image} />
          <div className="details__info">
            <h3>{product.title}</h3>
            <p className="details__price">
              <small>$</small>
              <strong>{product.price}</strong>
            </p>
            <h3>{product.category}</h3>
            <p className="details__title">{product.description}</p>
            <button onClick={() => addToBasket(product)}>Add to Basket</button>
          </div>
        </div>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .details {
    background-color: #fff;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .details h3 {
    margin: 20px 0;
  }
  .details__info {
    padding-left: 20px;
  }
  .details__info > button {
    background: #f0c14b;
    width: 200px;
    height: 30px;
    font-weight: 800;
    font-size: 15px;

    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }
  .details__image {
    object-fit: contain;
    width: 400px;
    height: 500px;
    margin-left: 30px;
  }

  .details__title {
    font-size: 17px;
    font-weight: 400;
    margin: 20px 0;
  }
  .details__qty {
    margin-top: 20px;
    width: 65px;
    height: 29px;
    text-align: center;
  }
`;

export default Detailpage;
