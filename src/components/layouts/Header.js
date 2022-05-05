import React, { Fragment } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import Search from './Search'
import { useSelector } from 'react-redux'

const Header = () => {

  const { cartItems } = useSelector(state => state.cart)


    return (
        <Fragment>
            <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img src="./images/1.png" alt="something"/>
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
      <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/login" className="btn ml-10" id="login_btn">Login</Link>
        <Link to="/cart" style={{ textDecoration: 'none' }} >
        <span id="cart" className="ml-3">Cart</span>
          <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>
      </div>
    </nav>
        </Fragment>
    )

}

export default Header
