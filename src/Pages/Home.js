import React, { useEffect} from "react";
import { ToastContainer } from "react-toastify";
import Orders from "../components/Order/Order"
import Navbar from '../components/SideBar/Navbar';
import Axios from "axios"
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem('user'));
    if(!data) {
      history.push("/sign-in");
    }
    console.log(data)
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