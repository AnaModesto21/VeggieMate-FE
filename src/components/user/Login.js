import React from 'react'
import { Link } from 'react-router-dom';
//, useLocation
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader';
import { login, clearErrors } from '../layouts/actions/authActions';
import { useNavigate } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const Login = ({ history, location }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  const redirect = location ? location.split('=')[1] : '/'

  useEffect(() => {

      if (isAuthenticated) {
          history.push(redirect)
      }

      if (error) {
          alert.error(error);
          dispatch(clearErrors());
      }

  }, [dispatch, alert, isAuthenticated, error, history, redirect])
  

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
}
      return (
        <Fragment>
       
          {loading ? <Loader></Loader> : (
            
               <Fragment>
                    <MetaData title={'Login'} />
                    <div className="row wrapper"> 
		<div className="col-10 col-lg-25">
        <form className="shadow-lg" onSubmit={submitHandle}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mb-4">New user?</Link>
          </form>
		  </div>
    </div>
               </Fragment>
           )}
        </Fragment>
       
      
      
       
      )}

export default Login