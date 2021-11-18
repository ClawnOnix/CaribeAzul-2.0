import "./chart.css";
import React, {useState, useEffect} from "react";
import Axios from "axios"

export default function Chart({ title }) {

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/orderlist").then(res => {
            setOrderList(res.data)
        })
        .catch(err => console.log(err))
}, [])

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
    </div>
  );
}
