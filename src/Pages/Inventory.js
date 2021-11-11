import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Products from "../components/Products";
import { STORAGE_PRODUCTS_CART } from "../Utils/constants";
import NewProduct from "../components/AddProduct";
import Navbar from '../components/SideBar/Navbar';
import Axios from "axios"
import { useHistory } from "react-router-dom";

function Inventory() {
  const products = null;
  const [productsCart, setProductsCart] = useState([]);

  const history = useHistory();
  useEffect(() => {
    Axios.get("https://caribeazul-backend-4w2sk.ondigitalocean.app/login").then((response) => {
      if (response.data.loggedIn === false) {
        history.push("/sign-in")
      }
    });
  }, []);

  useEffect(() => {
    getProductsCart();
  }, []);

  const getProductsCart = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART);

    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(",");
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]);
    }
  };

  const addProductCart = (id, name) => {
    const idsProducts = productsCart;
    idsProducts.push(id);
    setProductsCart(idsProducts);
    localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart);
    getProductsCart();
    toast.success(`${name} añadido al carrito correctamente.`);
  };

  return (
    <div>
    <Navbar />
    <NewProduct/>
    <Products products={products} addProductCart={addProductCart} />
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