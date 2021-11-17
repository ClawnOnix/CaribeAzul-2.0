import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Singin from "../components/Login/Login";
import Navbar from '../components/SideBar/Navbar';


function Login() {

  return (
    <div>
      <Navbar />
      <Singin />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default Login;