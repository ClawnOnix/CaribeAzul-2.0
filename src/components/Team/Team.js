import "./Team.scss";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from 'react-bootstrap';
import { Input, Button } from "../../Controls";
import AddIcon from '@material-ui/icons/Add';
import Axios from "axios";
import { roles } from "../../Utils/constants";

function Team() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [userList, setUserList] = useState([]);
  const [userUpdate, setUserUpdate] = useState([]);

  
  function addUser() {

    if(username !== "" || password !=="")
    {
      Axios.post("https://caribeazul-backend-muvy3.ondigitalocean.app/register", {
        username: username,
        password: password,
        role: role 
      }).then(() => {
        handleClose()
        setUserList([
          ...userList,
          {
            username: username,
            password: password,
            role: role
          },
        ]);
      });
    }
    
  };

  function getUser() {
    Axios.get("https://caribeazul-backend-muvy3.ondigitalocean.app/userlist").then((response) => {
      setUserList(response.data);
    });
  };

  function updateUser(id){
  Axios.put(`https://caribeazul-backend-muvy3.ondigitalocean.app/update`).then((response) => {
      setUserList(
        userList.filter((val) => {
          return val.id !== id;
        })
      );
      handleClose2()
    });
  }

  function deleteUser(id) {
    Axios.delete(`https://caribeazul-backend-muvy3.ondigitalocean.app/deleteuser/${id}`).then((response) => {
      setUserList(
        userList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  function updateModal(user){
   setUserUpdate(user);
   handleShow2();
  }

  getUser();
  return (
    <div className="container">
        <div style={{marginLeft:"10px",marginRight:"10px"}}>
        <div >
          <h2><b>Usuarios</b></h2>
            <Button 
            style={{width: "170px", marginRight:"10px", marginLeft:"0px"}} 
            startIcon={<AddIcon />}
            onClick={handleShow}>
              Nuevo Usuario
            </Button>
          <div >
            <div className="search" style={{marginTop:"10px"}}>
              <form className="form-inline">
              <Input
                            placeholder="Usuario"
                            name="sUser"
                            style={{width: "250px"}}
                            Iprops={{style: { height: "40px", borderRadius: "10px"}}}
                        />

              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div style={{width: "600px"}}>
            <table className="table">
              <tbody>
                <tr>
                  <th>#</th>
                  <th>Nombre </th>
                  <th style={{alignSelf: "center"}}>Contraseña</th>
                  <th>Rol</th>
                  <th style={{alignSelf: "center"}}>Editar / Eliminar</th>
                </tr>
                {
                  userList.map((user, index)=> {
                    return(     
                    
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>***********</td>
                      <td>{user.role}</td>
                      <td style={{ display: "inline-flex", alignContent: "center"}}>
                        <div className="edit" title="Edit" data-toggle="tooltip" type="button" onClick={() => {updateModal(user)}}><i className="material-icons">&#xE254;</i></div>
                        <div className="delete" title="Delete" type="button" data-toggle="tooltip" style={{ color: "red" }} onClick={() => {deleteUser(user.id)}}><i className="material-icons">&#xE872;</i></div>
                      </td>
                    </tr>
                    );
                  })
                }
                </tbody>
            </table>
          </div>
        </div>

        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header  >
              <Modal.Title>Añadir Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <Input className="form-control" id="nameInput" placeholder="Nombre" onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                <div className="form-group mt-3">
                  <Input type="password" className="form-control" id="passwordInput" placeholder="Contraseña" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className="form-group mt-3">
                <select id="selectRole" style={{ width: "33%" }} className="form-select" aria-label="Default select example" onChange={(e) => { setRole(e.target.value) }}>
                    {roles.map(options => (
                      <option key={options.id} value={options.title}>
                        {options.title}
                      </option>
                    ))}
                  </select>
                </div>

                <Button type="button"  className="button" onClick={() => {addUser()}}>Añadir</Button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button   className="button" onClick={handleClose}>
                Cerrar
              </Button>

            </Modal.Footer>
          </Modal>

        </div>

        <div className="model_box">
          <Modal
            show={show2}
            onHide={handleClose2}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title>Actualizar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <Input  className="form-control" id="nameInput2" placeholder={userUpdate.username} onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                <div className="form-group mt-3">
                  <Input type="password" className="form-control" id="passwordInput2" placeholder={userUpdate.password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className="form-group mt-3">
                <select id="selectRole2" style={{ width: "33%" }} className="form-select" aria-label="Default select example" onChange={(e) => { setRole(e.target.value) }}>
                    {roles.map(options => (
                      <option key={options.id} value={options.title}>
                        {options.title}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="button" className="button" onClick={() => {updateUser()}}>Actualizar</Button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary"  className="button" onClick={handleClose2}>
                Cerrar
              </Button>

            </Modal.Footer>
          </Modal>

        </div>     
      </div>
    </div>
  );
}            
export default Team;
