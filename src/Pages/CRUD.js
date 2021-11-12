import React, {useEffect} from "react";
import { ToastContainer } from "react-toastify";
import Team from "../components/Team/Team"
import Navbar from '../components/SideBar/Navbar';
import Axios from "axios"
import { useHistory } from "react-router-dom";

function CRUD() {
  const history = useHistory();
  useEffect(() => {
    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/login").then((response) => {
      if (response.data.loggedIn === false) {

      }//valide permiso 
     // else if(response.data.loggedIn === false){
//
     // }
    });
  }, []);
  return (
    <div>
      <Navbar />
      <Team />
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

export default CRUD;