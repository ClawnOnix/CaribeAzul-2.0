import React, {useState, useEffect} from "react";
import { Col, Card, Button } from "react-bootstrap";
import "./Product.scss";
import { app } from "../../base";


const db = app.firestore();

export default function Product(props) {
  const { product, deleteProduct } = props;
  const [image, setImages] = useState([]);

  useEffect(() => {
     db.collection("albums")
      .doc("inventory")
      .onSnapshot((doc) => {

        let arrimg = doc.data().images.map(item => { 
          if(item.name === product.name){
            return item.url;
          }
          
        });
        const img = `${arrimg[1]}`
        setImages(img);
      });

  }, []);
  
  return (

    <Col xs={3} className="product">
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Img style={{width: "150px", height: "100px"}} src={image !== "undefined" && image !== "null" ? image : "https://cdn.pixabay.com/photo/2015/05/31/15/07/coffee-792113_960_720.jpg"}  />
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>{product.quantity} Disp.</Card.Text>
          <Card.Text>Precio de compra: {product.price.toFixed(2)} DOP / Unidad</Card.Text>
          <Card.Text>Precio de venta: {product.sellPrice.toFixed(2)} DOP / Unidad</Card.Text>
          <Button className="btn1" onClick={() => deleteProduct(product.id)}>
            Eliminar producto
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

