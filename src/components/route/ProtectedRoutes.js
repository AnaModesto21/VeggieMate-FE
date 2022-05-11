import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../layouts/actions/authActions";
 
const ProtectedRoute = ({ children }) => {
  const {
    isAuthenticated = false,
    //loading = true,
    user,
  } = useSelector((state) => state.auth);
 
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [isAuthenticated, dispatch, user]);
 
  //if (loading) return <h1>loading...</h1>;
 
  console.log('isAuthenticated', isAuthenticated);
  //console.log('loading', loading);
  console.log('user', user);

  if (isAuthenticated) {
    // if (user.role !== "admin") {
    //   return <Navigate to="/" />;
    // }
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
 
export default ProtectedRoute;