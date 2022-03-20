import React from "react";
import {Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = (props) => {
  const { children } = props;
  const { currentUser } = useAuth();
  const location = useLocation();
  let output = currentUser ? (
    children
  ) : (
    <Redirect to="/login" replace state={{ path: location.pathname, search: location.search }} />
  );

  return output;
};

export default ProtectedRoute;