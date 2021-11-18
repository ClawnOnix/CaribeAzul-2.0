import "./detail.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios"

export default function Chart() {

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/orderlist").then(res => {
      setOrderList(res.data)
    })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="chart">
      <h3 className="chartTitle">Detalle</h3>
      <div style={{display: "flex"}}>
      <div style={{width: "150px"}}>
      <p >Orden #</p>
      <p >Cliente</p>
      </div>
      <div style={{width: "150px"}}>
      <p >Fecha</p>
      <p >Status</p>
      </div>
      </div>

      <table style={{ width: "90%", border: "1px solid black" }}>

        <tbody>

          <tr style={{ border: "1px solid black" }}>
            <th >Producto</th>
            <th >Precio U.</th>
            <th >Cantidad</th>
            <th style={{ border: "1px solid black" }}>Total</th>
          </tr>
          {
            [].map((item, index) => {
              return (
                <tr key={index}>
                  <td >{item.name}</td>
                  <td className="widgetLgUser">
                    <span className="widgetLgName">{item.price} </span>
                  </td>
                  <td className="widgetLgDate">{item.quantity}</td>
                  <td className="widgetLgAmount">{item.total}</td>
                </tr>);
            })
          }
        </tbody>
      </table>
    </div>
  );
}
