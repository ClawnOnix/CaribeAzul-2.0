import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Product from "../Product";
import Loading from "../Loading";
import Axios from "axios"
import "./Products.scss"
import "../AddProduct/AddProduct.scss"
import { toast } from "react-toastify";
import { Input } from "../../Controls";
import { Button } from "../../Controls";
import AddIcon from '@material-ui/icons/Add';
import firebase from 'firebase'
import { app } from '../../base';


const db = app.firestore();
const storage = app.storage();

export default function Products(props) {
  const [result, setResult] = useState([]);
  const [resultFiltered, setResultFiltered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [file, setFile] = useState(null)


  function resetControls() {
    setName("");
    setDescription("");
    setPrice(null)
    setQuantity(null)
    setFile(null);
  }
  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onUpload = async (name) => {
    const storageRef = storage.ref()
    const fileRef = storageRef.child(name)
    await fileRef.put(file)
    db.collection("albums").doc("inventory").update({
      images: firebase.firestore.FieldValue.arrayUnion({
        name: name,
        url: await fileRef.getDownloadURL()
      })
    }).then(() => {
      resetControls();
      getProduct();
      toast.success("El Producto se ha añadido");
    })
  }

  function addProducts(name, description, price, quantity) {

    price = parseFloat(price);
    quantity = parseFloat(quantity);
    if ((name !== "" || description !== "") || (price > 0 || quantity > 0)) {

      setLoading(true);
      Axios.post("https://caribeazul-backend-muvy3.ondigitalocean.app/newproduct", {
        name: name,
        description: description,
        quantity: quantity,
        price: price
      }).then((res) => {
        onUpload(name);
      })

    }
    else {
      return (toast.error("Tienes que llenar todos los campos correctamente!"));
    }

  }

  const getProduct = () => {
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

  function deleteProduct(id) {
    setLoading(true);
    Axios.delete(`https://caribeazul-backend-muvy3.ondigitalocean.app/deleteproduct/${id}`).then(() => {
      toast.error("Se ha eliminado el producto");
      getProduct();
    });

  }


  return (
    <>
      <Container className="contenedor">
        <div className="row" >
          <h5 className="titulo"> Nuevo producto </h5>
          <Input style={{ width: "30%" }} value={name} placeholder="Producto" Iprops={{ style: { height: "40px", borderRadius: "10px" } }} onChange={(e) => setName(e.target.value)} />
          <Input style={{ width: "50%", marginLeft: "10px" }} value={description} placeholder="Descripcion" Iprops={{ style: { height: "40px", borderRadius: "10px" } }} onChange={(e) => setDescription(e.target.value)} />
          <Input type="number" style={{ width: "30%", marginTop: "15px" }} value={price} placeholder="Precio" Iprops={{ style: { height: "40px", borderRadius: "10px" } }} onChange={(e) => setPrice(e.target.value)} />
          <Input type="number" style={{ width: "12%", marginLeft: "10px", marginTop: "15px" }} value={quantity} placeholder="cant." Iprops={{ style: { height: "40px", borderRadius: "10px" } }} onChange={(e) => setQuantity(e.target.value)} />
          <input type="file" style={{ width: "198px", marginLeft: "1px", backgroundColor: "##00FF40", marginTop: "16px" }} value={file} onChange={onFileChange}></input>
          <Button className="button" style={{ width: "20%", marginLeft: "10px" }} startIcon={<AddIcon />} onClick={() => { addProducts(name, description, price, quantity) }}>añadir producto</Button>
        </div>
      </Container>

      <Container>
        <div>
          <h5 className="titulo" style={{ marginTop: "20px" }}> Buscar </h5>
          <Input
            style={{ width: "25%" }}
            placeholder="Producto"
            Iprops={{ style: { height: "40px", borderRadius: "10px" } }}
            onChange={(e) => filterProducts(e.target.value)} />
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
    </>
  );
}
