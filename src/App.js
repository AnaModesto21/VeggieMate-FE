import "./App.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";

import ProtectedRoute from "./components/route/ProtectedRoutes";
import { loadUser } from "./components/layouts/actions/authActions";

import store from "./store";
import axios from "axios";

// Cart Imports
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

// Order Imports
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// Auth or User imports
import Search from "./components/layouts/Search";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/user/Profile";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  
  useEffect(() => {
     console.log('USE EFFECT');
    store.dispatch(loadUser());
    const asd = `${process.env.STRIPE_API_KEY}`;
  console.log('ASD', asd);
  const config = {
   headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
   }
}
    const baseURL = `${process.env.REACT_APP_PROJECTS_API}`;

    async function getStripApiKey() {
      const { data } = await axios.get(`${baseURL}payment/stripeapi`, config);

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/update" element={<UpdatePassword />} />

            <Route
              path="/me"
              element={
                <ProtectedRoute user={user}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/me"
              element={
                <ProtectedRoute>
                  <ListOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
            
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe('pk_test_51KqLPzEadlZGqMYf05rI24gVnVxX2lgcK9A5J8zTPEQjRfsPCHjsRp9L54vvqhsBGni6V8uEta2o1UYC03rmDrot00mhNbsxeM')}>
                    <ProtectedRoute component={Payment}>
                     <Payment />
                    </ProtectedRoute>
                  </Elements>
                }
              />
          
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
