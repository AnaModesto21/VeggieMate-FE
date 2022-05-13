import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useEffect } from "react";
import { deleteUser, clearErrors } from '../layouts/actions/authActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'

import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

const Profile = () => {

    
    const dispatch = useDispatch()
    const navigate = useNavigate()
     const { error: isDeleted } = useSelector(
    (state) => state.product,
  )
  const { loading, error } = useSelector((state) => state.products)
    useEffect(() => {
        dispatch(deleteUser())
    
        if (error) {
          alert.error(error)
          dispatch(clearErrors())
        }
    
        if (isDeleted) {
          alert.success('User deleted successfully')
          navigate('/')
          dispatch({ type: DELETE_USER_RESET })
        }
      }, [dispatch, error, isDeleted, navigate])
    
      const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
      }

    const { user } = useSelector(state => state.auth)
    console.log('state.auth', user);
    console.log('loading', loading);
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Your Profile'} />

                    <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>
                            <button
                                className="btn btn-danger py-1 px-2 ml-2"
                                onClick={() => deleteUserHandler(user._id)}
                                >
                                Delete profile <i className="fa fa-trash"></i>
                                </button>
                            
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    My Orders
                                </Link>
                            

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
