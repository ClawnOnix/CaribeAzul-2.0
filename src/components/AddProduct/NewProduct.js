import {React, useState} from "react";
import { Container } from "react-bootstrap";
import "./AddProduct.scss";
import { toast } from "react-toastify";
import Axios from "axios";
import { Input, Button } from "../../Controls";
import AddIcon from '@material-ui/icons/Add';

export default function Products(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  return (
    <Container className="contenedor">
      <div className="row" >
      <h5 className="titulo"> Nuevo producto </h5>
      <Input  style={{width: "30%"}} placeholder="Producto" Iprops={{style: { height: "40px", borderRadius: "10px"}}} onChange={(e) => setName(e.target.value)} />
      <Input  style={{width: "50%", marginLeft: "10px"}} placeholder="Descripcion" Iprops={{style: { height: "40px", borderRadius: "10px"}}}  onChange={(e) => setDescription(e.target.value)}/>
      <Input  type="number" style={{width: "30%", marginTop:"15px"}} placeholder="Precio" Iprops={{style: { height: "40px", borderRadius: "10px"}}} onChange={(e) => setPrice(e.target.value)} />
      <Input  type="number" style={{width: "12%", marginLeft: "10px", marginTop:"15px"}} placeholder="cant." Iprops={{style: { height: "40px", borderRadius: "10px"}}}  onChange={(e) => setQuantity(e.target.value)} />
      <Button className="button" style={{width: "12%", marginLeft: "10px", backgroundColor: "##00FF40"}} startIcon={<AddIcon />}>Img</Button>
      <Button className="button" style={{width: "20%", marginLeft: "10px"}} startIcon={<AddIcon />} onClick={() => {addProducts( name , description, price, quantity )}}>añadir producto</Button>
      </div>
    </Container>
  );
}

function addProducts(name, description, price, quantity){
  price = parseFloat(price);
  price.toFixed(2);
  if(name !== "" || description !== "" || price < 0 || quantity < 0){

    Axios.post("https://caribeazul-backend-4w2sk.ondigitalocean.app/newproduct", {
      name: name,
      description: description,
      quantity: quantity,
      price: price
    }).then( (res) =>{
      console.log(res);
      toast.success("El Producto se ha añadido");
    })

   }
   else{
    return ( toast.error("Tienes que llenar todos los campos correctamente!"));
   }

}