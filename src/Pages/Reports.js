import React, {useEffect} from 'react';
import Navbar from '../components/SideBar/Navbar';
import Detail from "../components/Report/Details/Details";
import FeaturedInfo from "../components/Report/FeaturedInfo/FeaturedInfo";
import "./reports.css";
import WidgetLg from "../components/Report/WidgetLg/WidgetLg";
import { useHistory } from "react-router-dom";

function Reports() {
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
    <div className="home">
      <FeaturedInfo />
      <Detail />
      <div className="homeWidgets">
        <WidgetLg/>
      </div>
    </div>
    </div>
  );
}

export default Reports;
