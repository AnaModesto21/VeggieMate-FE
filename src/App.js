import './App.css';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';

import ProtectedRoutes from './components/route/ProtectedRoutes';
import { loadUser } from './components/layouts/actions/authActions'

import store from './store'
import axios from 'axios'

// Cart Imports
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

// Order Imports
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'

// Auth or User imports

import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'

// // Admin Imports
// import Dashboard from './components/admin/Dashboard'
// import ProductsList from './components/admin/ProductsList'
// import NewProduct from './components/admin/NewProduct'
// import UpdateProduct from './components/admin/UpdateProduct'
// import OrdersList from './components/admin/OrdersList'
// import ProcessOrder from './components/admin/ProcessOrder'
// import UsersList from './components/admin/UsersList'
// import UpdateUser from './components/admin/UpdateUser'
// import ProductReviews from './components/admin/ProductReviews'

// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Profile from './components/user/Profile'

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())
    const baseURL = `${process.env.REACT_APP_PROJECTS_API}`;
    async function getStripApiKey() {
      const { data } = await axios.get(`${baseURL}stripeapi`);

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)



  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<Home />} />
              <Route path="/shipping" element={<Shipping />} /> 
              <Route path="/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/register" element={<Register />} />
              <Route
   path="/me"
   element={
      <ProtectedRoutes>
          <Profile />
       </ProtectedRoutes>
    }
/>
<Route
   path="/me/update"
   element={
      <ProtectedRoutes>
          <UpdateProfile />
       </ProtectedRoutes>
    }
/>
<Route
   path="/password/update"
   element={
      <ProtectedRoutes>
          <UpdatePassword />
       </ProtectedRoutes>
    }
/>
<Route
   path="/orders/me"
   element={
      <ProtectedRoutes>
          <ListOrders />
       </ProtectedRoutes>
    }
/>
<Route
   path="/order/:id"
   element={
      <ProtectedRoutes>
          <ListOrders />
       </ProtectedRoutes>
    }   
/>
<Route
   path="/shipping"
   element={
      <ProtectedRoutes>
          <Shipping />
       </ProtectedRoutes>
    }   
/>
<Route
   path="/confirm"
   element={
      <ProtectedRoutes>
          <ConfirmOrder />
       </ProtectedRoutes>
    }   
/> 
<Route
   path="/success"
   element={
      <ProtectedRoutes>
          <OrderSuccess />
       </ProtectedRoutes>
    }   
/>              
{stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }
          
          </Routes>
        </div>
        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;