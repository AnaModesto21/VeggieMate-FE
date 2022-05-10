import './App.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ProtectedRoute from './components/route/ProtectedRoutes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Profile from './components/user/Profile'

function App() {
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
              <Route path="/register" element={<Register />} />

              <ProtectedRoute path="/me" element={<Profile />} exact />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;