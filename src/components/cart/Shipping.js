import React from 'react'
import { Fragment, useState } from 'react'
import { countries } from 'countries-list'
import MetaData from '../layouts/MetaData'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'

import { saveShippingInfo } from '../layouts/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'


const Shipping = ({ history }) => {
const navigate = useNavigate();
const countriesList = Object.values(countries)

const { shippingInfo } = useSelector(state => state.cart)

const [address, setAddress] = useState(shippingInfo.address)
const [city, setCity] = useState(shippingInfo.city)
const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
const [country, setCountry] = useState(shippingInfo.country)

const dispatch = useDispatch();

const submitHandler = (e) => {
    e.preventDefault()

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }))
    navigate('/confirm');
}

  return (
      <Fragment>
        <MetaData title={'Shipping info'} />
        <div className="row wrapper mt-1">
        <div className="col-10 col-lg-5 mt-0">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-2 mt-2">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input id="postal_code_field" className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required type="text" inputMode="numeric" pattern="^(?(^0000(|-000))|(\d{4}(|-\d{3})))$"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >

                                    {countriesList.map(country => (
                                        <option key={country.name} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                    

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
                </div>
      </Fragment>
  )
}

export default Shipping
