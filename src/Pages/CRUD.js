import React, {useEffect} from "react";
import { ToastContainer } from "react-toastify";
import Team from "../components/Team/Team"
import Navbar from '../components/SideBar/Navbar';
import { useHistory } from "react-router-dom";

function CRUD() {
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