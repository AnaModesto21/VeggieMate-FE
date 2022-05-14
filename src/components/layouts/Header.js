import React, { Fragment } from 'react'
import { Route, Link, Router, Routes } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../layouts/actions/authActions'

import Search from './Search'

import '../../App.css'

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        //user = null;
        alert.success('Logged out successfully.')
    }

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-2 ">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/VeggieMate.png" alt='pageLogo' width='170' class="img-thumbnail"/>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-md-5" id='searchform'>
          <Search />
        </div>
                <div className="col-12 col-md-5 text-right" id="stuff">
                {/* <Link to="/login" className="btn ml-10" id="login_btn">Login</Link> */}
                <Link to="/cart" style={{ textDecoration: 'none' }} >
                <span id="cart" className="ml-3">Cart</span>
                  <span className="ml-1" id="cart_count">{cartItems.length}</span>
                </Link>
{console.log('user', user)}
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-0" 
                            type="button" 
                            id="dropDownMenuButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span id='name'>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link>

                            </div>


                        </div>

                    ) : ( !localStorage.getItem('token') && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link> )
                    } 


                </div>
            </nav>
        </Fragment>
    )
}

export default Header
