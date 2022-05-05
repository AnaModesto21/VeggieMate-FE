import './App.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/layouts/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


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
              {/* mudar shipping route para protected route */}
              <Route path="/:id" element={<ProductDetails />} />
              <Route  path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;