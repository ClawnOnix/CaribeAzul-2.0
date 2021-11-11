import React, { useEffect} from "react";
import { ToastContainer } from "react-toastify";
import Orders from "../components/Order/Order"
import Navbar from '../components/SideBar/Navbar';
import Axios from "axios"
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  useEffect(() => {
    Axios.get("https://caribeazul-backend-4w2sk.ondigitalocean.app/login").then((response) => {
      if (response.data.loggedIn === false) {
        history.push("/sign-in")
      }
    });
  }, []);
  return (
    <div>
      <Navbar />
      <Orders />
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

export default Home;