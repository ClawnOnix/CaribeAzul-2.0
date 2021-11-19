import "./detail.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios"
import { toast } from "react-toastify";
import { timeShow } from "../../../Utils/Utils";

export default function Chart() {

  const [orderList, setOrderList] = useState([{
    id: 1,
    customer: "XXXX",
    date: "0000-00-00",
    status: "normal",
    total: 0,
    products: JSON.stringify([{}])
  }]);

  useEffect(() => {
    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/orderlist").then(res => {
      setOrderList(res.data)
    }).catch(err => toast.error("Error al obtener Ordenes!"))

  }, [])
  const json = JSON.stringify([{name:"hola", price: 500, quantity: 1}, {name:"holas", price: 40, quantity: 1}])

  let produtcs = [];
  produtcs = JSON.parse(json);
  let productafter = []

  for (let index = 0; index < produtcs.length; index++) {
  productafter.push(produtcs[index]);
  }


  return (
    <div className="chart">
      <h3 className="chartTitle">Detalle</h3>
      <div style={{display: "flex"}}>
      <div style={{width: "fit-content"}}>
      <p >Orden #{orderList[0].id}</p>
      <p >Cliente: {orderList[0].customer}</p>
      </div>
      <div style={{width: "fit-content", marginLeft: "20px"}}>
      <p >Fecha: {timeShow(orderList[0].date)}</p>
       <p >Status: {orderList[0].status}</p>
      </div>
    </div>

      <table className="table" style={{marginBottom: "0px"}}>

        <tbody>

          <tr >
            <th >Producto</th>
            <th >Precio U.</th>
            <th >Cantidad</th>
            <th >Precio</th>
          </tr>
          {
            
            productafter.map((item, index) => {
              let total = item.price * item.quantity;
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td> {item.price} </td>
                  <td>{item.quantity}</td>
                  <td>{total}</td>
                </tr>);
            })
          }
        </tbody>
      </table>
      <table className="table" style={{marginTop: "0px"}}>
        <tbody>
          <tr>
            <td style={{width:"226.86px"}}><b>Total:</b></td>
            <td></td>
            <td style= {{width:"167.73px"}}><b>{orderList[0].total}</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
