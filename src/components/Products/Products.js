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
  const [price, setPrice] = useState("");
  const [sellPrice, SetSellPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState(undefined)


  function resetControls() {
    setName("");
    setDescription("");
    setFile(undefined);
  }
  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onUpload = async (name) => {
    resetControls();
    const storageRef = storage.ref()
    const fileRef = storageRef.child(name)
    await fileRef.put(file)
    db.collection("albums").doc("inventory").update({
      images: firebase.firestore.FieldValue.arrayUnion({
        name: name,
        url: await fileRef.getDownloadURL()
      })
    }).then(() => {

      getProduct();
      toast.success("El Producto se ha añadido");
    })
  }

  function addProducts(name, description, price, quantity, sellPrice) {

    price = parseFloat(price);
    quantity = parseFloat(quantity);
    if ((name !== "" && description !== "") && (price != null && quantity != null) && (price > 0 && quantity > 0) && (sellPrice > 0 && sellPrice != null)) {

      setLoading(true);
      Axios.post("https://caribeazul-backend-muvy3.ondigitalocean.app/newproduct", {
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        sellPrice: sellPrice
      }).then((res) => {
        setPrice("");
        SetSellPrice("");
        setQuantity("");
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
    let filter = result.filter(item => item.name.toLowerCase().includes(product.toLowerCase()));
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
          <Input type="number" style={{ width: "15%", marginLeft: "10px" }} value={price} placeholder="Precio" Iprops={{ style: { height: "40px", borderRadius: "10px" } }} onChange={(e) => setPrice(e.target.value)} />
          <Input type="number" style={{ width: "15%", marginTop: "15px" }} value={sellPrice} placeholder="Precio D. Venta" Iprops={{ style: { height: "40px", borderRadius: "10px" } }} onChange={(e) => SetSellPrice(e.target.value)} />
          <Input type="number" style={{ width: "12%", marginLeft: "10px", marginTop: "15px" }} value={quantity} placeholder="cant." Iprops={{ style: { height: "40px", borderRadius: "10px" } }} onChange={(e) => setQuantity(e.target.value)} />
           <label className="file" htmlFor="getFile" style={{  width: "100px", height: "40px", marginLeft: "10px", backgroundColor: "grey", marginTop: "13px", border: "1px, solid, grey" , borderRadius: "10px", justifyItems: "center"}}> 
            Imagen
           </label>
          <input type="file"  id="getFile" accept="image/*" placeholder="Seleccionar Imagen" style={{display: "none"}} onChange={onFileChange}></input>
          
          <Button className="button" style={{ width: "20%", marginLeft: "10px" }} startIcon={<AddIcon />} onClick={() => { addProducts(name, description, price, quantity, sellPrice) }}>añadir producto</Button>
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
