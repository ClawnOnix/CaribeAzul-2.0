import React, {useEffect, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import Team from "../components/Team/Team"
import Navbar from '../components/SideBar/Navbar';
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading/Loading"

function CRUD() {
  const history = useHistory();
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem('user'));
    if(!data) {
      history.push("/sign-in");
    }
    else if( data.rol !== "admin"){
      setLoading(true);
      toast.error("!SOLO! el Admin puede acceder a esta pagina!")
    }
}, []);
  return (
    <div>
      <Navbar />
      {loading ? <Loading/> :<Team />}
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