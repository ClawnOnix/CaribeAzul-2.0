import React, {useState, useEffect} from "react";
import { Col, Card, Button } from "react-bootstrap";
import "./Product.scss";
import { app } from "../../base";


const db = app.firestore();

export default function Product(props) {
  const { product, deleteProduct } = props;
  const [image, setImages] = useState([]);

  useEffect(() => {
    const unmount = db.collection("albums")
      .doc("inventory")
      .onSnapshot((doc) => {
        setImages(doc.data().images !== undefined ? doc.data().images.filter(item => item.name === product.name) : [] || []);
      });
      return unmount
  }, []);
  
  return (

    <Col xs={3} className="product">
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Img src={image.url} alt="https://cdn.pixabay.com/photo/2018/02/01/20/43/shopping-3124078_960_720.jpg" />
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>{product.quantity} Disp.</Card.Text>
          <Card.Text>{product.price.toFixed(2)} DOP / Unidad</Card.Text>
          <Button className="btn1" onClick={() => deleteProduct(product.id)}>
            Eliminar producto
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

