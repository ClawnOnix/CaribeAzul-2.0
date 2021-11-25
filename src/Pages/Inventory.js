import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Products from "../components/Products";
import Navbar from '../components/SideBar/Navbar';
import { useHistory } from "react-router-dom";

function Inventory() {
  const products = null;

  const history = useHistory();
  useEffect(() => {
      let data = JSON.parse(sessionStorage.getItem('user'));
      if(!data) {
        history.push("/sign-in");
      }

  }, []);



  return (
    <div>
    <Navbar />
    <Products products={products} />
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

export default Inventory;