import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Singin from "../components/Login/Login";


function Login() {

  return (
    <div>
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