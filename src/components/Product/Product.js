import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import "./Product.scss";

export default function Product(props) {
  const { product, deleteProduct } = props;
  
  return (

    <Col xs={3} className="product">
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
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

