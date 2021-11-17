import React, {useEffect} from 'react';
import Navbar from '../components/SideBar/Navbar';
import Chart from "../components/Report/Chart/Chart";
import FeaturedInfo from "../components/Report/FeaturedInfo/FeaturedInfo";
import "./reports.css";
import WidgetLg from "../components/Report/WidgetLg/WidgetLg";
import { useHistory } from "react-router-dom";

function Reports() {
  const data =[]
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
