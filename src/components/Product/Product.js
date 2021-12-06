import React, { useState, useEffect } from "react";
import { Col, Card, Button } from "react-bootstrap";
import "./Product.scss";
import { app } from "../../base";
import 'firebase/storage';
import "bootstrap/dist/css/bootstrap.min.css";

const db = app.firestore();

export default function Product(props) {
  const { product, deleteProduct } = props;
  const [image, setImages] = useState([]);

  useEffect(() => {
    loadimage();
  }, []);

  const loadimage = () => {
    db.collection("albums")
      .doc("inventory")
      .onSnapshot((doc) => {

        let arrimg = doc.data().images.map(item => {
          if (item.name.toLowerCase() === product.name.toLowerCase()) {
            return item.url;
          }

        });
        const img = `${arrimg[0]}`
        setImages(img);

      });
  }

  return (

    <Col xs={3} className="product">
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Img style={{ width: "150px", height: "100px" }} src={image !== "undefined" ? image : "https://cdn.pixabay.com/photo/2015/05/31/15/07/coffee-792113_960_720.jpg"} />
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>{product.quantity} Disp.</Card.Text>
          <Card.Text>Compra: {product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} DOP</Card.Text>
          <Card.Text>Venta: {product.sellPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} DOP</Card.Text>
          <Button className="btn1" onClick={() => deleteProduct(product.id)}>
            Eliminar producto
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

