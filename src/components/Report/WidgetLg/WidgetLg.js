import "./widgetLg.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { timeShow } from "../../../Utils/Utils";
import "../Details/detail.scss"
export default function WidgetLg() {
  const [values, setValues] = useState([]);
  let product = [];
  let productafter = [];
  const [orderList, setOrderList] = useState([{
    id: 0,
    customer: "",
    date: "",
    status: "",
    total: 0,
    products: JSON.stringify(`[{hola: "0", holita: "1"}]`)
  }]);

  useEffect(() => {
    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/orderlist").then(res => {
      setValues(res.data);
    }).catch(err => toast.error("Error al obtener Ordenes!"))
  }, []);

  function details(order) {
      setOrderList(order);
      let json = orderList.products
      product = JSON.parse(json)
      console.log(product)
      for (let index = 0; index < product.length; index++) {
           productafter.push(product[index]);
      }
  };
  return (
    <>
    <>
      <div className="chart">
      <h3 className="chartTitle">Detalle</h3>
      <div style={{display: "flex"}}>
      <div style={{width: "fit-content"}}>
      <p >Orden #{orderList.id !== 0 ? orderList.id : ""}</p>
      <p >Cliente: {orderList.customer}</p>
      </div>
      <div style={{width: "fit-content", marginLeft: "20px"}}>
      <p >Fecha: {orderList.date !== "" ? timeShow(orderList.date) : ""}</p>
       <p >Status: {orderList.status}</p>
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
              console.log(item)
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
            <td style= {{width:"167.73px"}}><b>{orderList.total}</b></td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
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
              <td className="widgetLgDate">{timeShow(item.date)}</td>
              <td className="widgetLgAmount">{item.total}</td>
              <td className="widgetLgStatus">{item.status}</td>
              <td title="info" data-toggle="tooltip" type="button" onClick={() => {details(item)}}><i className="material-icons">info</i></td>
            </tr>);
          })
        }
        </tbody>
      </table>
    </div>
    </>
  );
}
