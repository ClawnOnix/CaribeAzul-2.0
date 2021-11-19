import "./featuredInfo.scss";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React, {useState, useEffect} from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { timeNow } from "../../../Utils/Utils";

export default function FeaturedInfo() {

  const [values, setValues] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/orderlist").then(res => {
      setValues(res.data);
    }).catch(err => toast.error("Error al obtener Ordenes"))

    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/productlist").then((response) => {
      setResult(response.data);
      }).catch(err => toast.error("Error al obtener Productos!"))
  }, []);

  const total = values.map(item => {
    let gtotal = 0;
    return gtotal += parseFloat(item.total);
  });




  const totalMonth = values.map(item => {

    let dateTime = timeNow();
    let now = new Date(dateTime)
    let endate = new Date(item.date)
    let diff = now.getTime() - endate.getTime();
    let daysDifference = diff/(1000*60*60*24);

    if(daysDifference < 30){
      let gtotal = 0;
      return gtotal += parseFloat(item.total);
    }
    else{
      return 0;
    }

  });

  const invTotal = result.map(item => {
    let itotal = 0;
    let price = parseFloat(item.price) * parseFloat(item.quantity)
    return itotal += price;
  });

  const sumarize = () => {
    let suma = 0.00;
    for (let i = 0; i < total.length ; i++) {
      suma = suma + total[i];
   }
   
   return suma;
   
  };

  const sumarizeMonth = () => {
    if(totalMonth[0] === 0){
      return 0;
    }
    else{
    let suma = 0.00;
    for (let i = 0; i < totalMonth.length ; i++) {
      suma = suma + total[i];
    }
    return suma;
  }  
  };

  const invSumarize = () => {
    let suma = 0.00;
    for (let i = 0; i < invTotal.length ; i++) {
      suma = suma + invTotal[i];
   }

   return suma;
  };

  function Compare() {
    if(parseFloat(sumarize) >= parseFloat(invSumarize)){
    return <ArrowUpward className="featuredIcon positive"/>
    }
    else{ return <ArrowDownward className="featuredIcon negative"/>}
  }

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Venta general</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${sumarize().toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
             <Compare />         
          </span>
        </div>
        <span className="featuredSub">Comparado con el inventario.</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Venta actual</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${sumarizeMonth().toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
          <span className="featuredMoneyRate">
          DOP 
          </span>
        </div>
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
