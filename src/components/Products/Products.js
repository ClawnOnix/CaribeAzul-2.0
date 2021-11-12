import React, {useState, useEffect} from "react";
import { Container, Row } from "react-bootstrap";
import Product from "../Product";
import Loading from "../Loading";
import Axios from "axios"
import "./Products.scss"
import { toast } from "react-toastify";
import { Input } from "../../Controls";

export default function Products(props) {
  const [result, setResult] = useState([]);
  const [resultFiltered, setResultFiltered] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProduct =  () => {
    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/productlist").then((response) => {
      setResult(response.data);
      setLoading(false);
      });
   }


 useEffect(() => {
   getProduct();
 }, [])
    

  async function filterProducts(product) {
    let filter = result.filter(item => item.name.includes(product));
    await setResultFiltered(filter);
 };

 function deleteProduct(id){
  
  Axios.delete(`https://caribeazul-backend-muvy3.ondigitalocean.app/deleteproduct/${id}`).then(() => {
     toast.error("Se ha eliminado el producto");
     window.location.reload();
  });

}

 
  return (
    
      <Container>
      <div>
      <h5 className="titulo" style={{ marginTop: "20px" }}> Buscar </h5>
      <Input 
      style={{ width: "25%" }} 
      placeholder="Producto" 
      Iprops={{style: { height: "40px", borderRadius: "10px"}}}
      onChange={(e) => filterProducts(e.target.value)}/>
      </div>
      <Row>
        {loading || !result ? (
          <Loading />
        ) : (
          resultFiltered !== null ?
          resultFiltered.map((product, index) => (
            <Product
              key={index}
              product={product}
              deleteProduct={deleteProduct}
            />
          )) :
          result.map((product, index) => (
            <Product
              key={index}
              product={product}
              deleteProduct={deleteProduct}
            />
          ))
        )}
      </Row>
    </Container>
  );
}
