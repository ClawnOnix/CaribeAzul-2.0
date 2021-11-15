import "./widgetLg.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  const [values, setValues] = useState([]);

  useEffect(() => {
    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/orderlist").then(res => {
      setValues(res.data);
    }).catch(err => console.log(err))
  }, []);
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Ordenes</h3>
      <table className="widgetLgTable">
        <tbody>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">no. Orden</th>
          <th className="widgetLgTh">Cliente</th>
          <th className="widgetLgTh">Fecha</th>
          <th className="widgetLgTh">Total</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {
          values.map((item, index) => {
            return (
              <tr className="widgetLgTr" key={index}>
              <td className="widgetLgDate">{item.id}</td>
              <td className="widgetLgUser">
                <span className="widgetLgName">{item.customer} </span>
              </td>
              <td className="widgetLgDate">{item.date}</td>
              <td className="widgetLgAmount">{item.total}</td>
              <td className="widgetLgStatus">{item.status}</td>
            </tr>);
          })
        }
        </tbody>
      </table>
    </div>
  );
}
