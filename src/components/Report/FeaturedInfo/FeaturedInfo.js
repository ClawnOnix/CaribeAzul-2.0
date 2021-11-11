import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React, {useState, useEffect} from "react";
import Axios from "axios";

export default function FeaturedInfo() {

  const [values, setValues] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    Axios.get("https://caribeazul-backend-4w2sk.ondigitalocean.app/orderlist").then(res => {
      setValues(res.data);
    }).catch(err => console.log(err))

    Axios.get("https://caribeazul-backend-4w2sk.ondigitalocean.app/productlist").then((response) => {
      setResult(response.data);
      console.log(result)
      }).catch(err => console.log(err))
  }, []);

  const total = values.map(item => {
    let gtotal = 0;
    return gtotal += parseFloat(item.total);
  });

  const invTotal = result.map(item => {
    let itotal = 0;
    let price = parseFloat(item.price) * parseFloat(item.quantity)
    return itotal += price;
  });

  function sumarize() {
    let suma = 0;
    for (let i = 0; i < total.length ; i++) {
      suma += total[i];
   }
   return suma;
  };

  function invSumarize() {
    let suma = 0;
    for (let i = 0; i < invTotal.length ; i++) {
      suma += invTotal[i];
   }
   return suma;
  };

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Venta general</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${sumarize().toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Venta actual</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${sumarize().toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
          <span className="featuredMoneyRate">
          DOP <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Comparado con el mes anterior.</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Costo de Inventario</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${invSumarize().toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
          <span className="featuredMoneyRate">
          DOP
          </span>
        </div>
      </div>
    </div>
  );
}
