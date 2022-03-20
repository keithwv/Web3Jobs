import React from "react";
import { Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";


const Admin = () => {

  const { logout } = useAuth();
  const signOut = () => {
    console.log(logout);
    logout();
    alert("you logged out")
  };

  return (
  <>
  <div>Admin</div>
  <button onClick={signOut}>SignOut</button>
  <br></br>
  <Typography component="h1" variant="h5" color='white'>Admin Page</Typography>
  </>
  )
};

export default Admin;
