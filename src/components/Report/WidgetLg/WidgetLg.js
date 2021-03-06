import "./widgetLg.scss";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { timeShow } from "../../../Utils/Utils";
import "../Details/detail.scss"
export default function WidgetLg() {
  const [values, setValues] = useState([]);
  let products = [];
  const [product, setProduct] = useState([]);
  const [orderList, setOrderList] = useState([{
    id: 0,
    customer: "",
    date: "",
    status: "",
    total: 0,
    products: [],
    ITBIS: 0,
    descueneto: 0,
  }]);

  useEffect(() => {
    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/orderlist").then(res => {
      setValues(res.data);
      detail(res.data[0]);
    }).catch(err => toast.error("Error al obtener Ordenes!"))
  }, []);

  function detail(order) {
    if (order) {
      setOrderList(order)
      setProduct(order.products);

    }

  }

  function deleteOrder(order) {
    Axios.put(`https://caribeazul-backend-muvy3.ondigitalocean.app/deleteorder`, {
      id: order.id,
      status: "Eliminada"
    }).then((res) => {
      if (res.status === 200){
        setValues(
          values.filter((val) => {
            return val.id !== order.id;
          }));
        toast.error({ isOpen: true, message: 'La orden ha sido Eliminada' })
      }   
    }).catch(err => toast.error("Error al eliminar orden"));
  }





  return (
    <>
      <>
        <div className="chart">
          <h3 className="chartTitle">Detalle</h3>
          <div style={{ display: "flex" }}>
            <div style={{ width: "fit-content" }}>
              <p >Orden #{orderList.id !== 0 ? orderList.id : ""}</p>
              <p >Cliente: {orderList.customer}</p>
            </div>
            <div style={{ width: "fit-content", marginLeft: "20px" }}>
              <p >Fecha: {orderList.date !== "" ? timeShow(orderList.date) : orderList.date}</p>
              <p >Status: {orderList.status}</p>
            </div>
          </div>

          <table className="table" style={{ marginBottom: "0px" }}>

            <tbody>

              <tr >
                <th >Producto</th>
                <th >Precio U.</th>
                <th >Cantidad</th>
                <th >Precio</th>
              </tr>
              {
                product.map((item, index) => {
                  let total = item.sellPrice * item.quantity;
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td> {item.sellPrice} </td>
                      <td>{item.quantity}</td>
                      <td>{total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                    </tr>);
                })
              }
            </tbody>
          </table>
          <table className="table" style={{ marginTop: "0px", marginBottom: "0px" }}>
            <tbody>
              <tr>
                <td style={{ width: "226.86px", textAlign: "left" }}><b>ITBIS:</b></td>
                <td>&nbsp;</td>
                <td style={{ width: "120.73px" }}><b>{orderList.ITBIS ? orderList.ITBIS.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0.00}</b></td>
              </tr>
            </tbody>
          </table>
          <table className="table" style={{ marginTop: "0px",  marginBottom: "0px" }}>
            <tbody>
              <tr>
                <td style={{ width: "226.86px", textAlign: "left" }}><b>Descuento:</b></td>
                <td>&nbsp;</td>
                <td style={{ width: "120.73px" }}><b>{orderList.descuento ? orderList.descuento.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0.00}</b></td>
              </tr>
            </tbody>
          </table>
          <table className="table" style={{ marginTop: "0px",  marginBottom: "0px"}}>
            <tbody>
              <tr>
                <td style={{ width: "226.86px", textAlign: "left" }}><b>Total:</b></td>
                <td>&nbsp;</td>
                <td style={{ width: "120.73px" }}><b>{orderList.total ? orderList.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0.00}</b></td>
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
                    <td className="widgetLgAmount">{item.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                    <td className="widgetLgStatus">{item.status}</td>
                    <td title="info" data-toggle="tooltip" type="button" onClick={() => { detail(item) }}><i className="material-icons">info</i></td>
                    {item.status !== "Eliminada" ? <td title="delete" data-toggle="tooltip" type="button" onClick={() => { deleteOrder(item) }}><i className="material-icons">delete</i></td> : null}
                  </tr>);
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
