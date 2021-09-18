import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import React, { useEffect } from "react";
import Product from "./Product";
import { useStateValue } from "./Stateprovider";
import { loadStripe } from "@stripe/stripe-js";
import Detailpage from "./Detailpage";
import CheckoutPage from "./CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
const promise = loadStripe(('pk_test_51IOFc6Lr3AAb1A8aiceu2oP7PmyDHpKYWQGD9F5N7hMtavMGPdYKPQXjsOvQteGO9aOkDsizpQxOmI6dUuw93Irm00tUkv1EZV'));
const App=()=> {
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/cart">
            <Header />
            <Checkout />
          </Route>
          <Route path="/productdetail">
            <Header />
            <Detailpage />
          </Route>
          <Route path="/checkoutpage">
            <Elements stripe={promise}>
              <Header />
              <CheckoutPage />
            </Elements>
          </Route>
          <Route path="/">
            <Header />

            <Product />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;

