import React, {useEffect} from 'react';
import Navbar from '../components/SideBar/Navbar';
import Chart from "../components/Report/Chart/Chart";
import FeaturedInfo from "../components/Report/FeaturedInfo/FeaturedInfo";
import "./reports.css";
import WidgetLg from "../components/Report/WidgetLg/WidgetLg";
import Axios from "axios"
import { useHistory } from "react-router-dom";

function Reports() {
  const data =[]
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
    <div className="home">
      <FeaturedInfo />
      <Chart data={data} title="Análisis de usuario" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetLg/>
      </div>
    </div>
    </div>
  );
}

export default Reports;
