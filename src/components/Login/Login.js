import React, { useState } from "react";
import "./Login.scss"
import Axios from "axios";
import { useHistory } from "react-router-dom";


export default function Login() {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function logUser()  {
        Axios.post("https://caribeazul-backend-muvy3.ondigitalocean.app/login", {
            username: username,
            password: password
        }).then((res) => {
            console.log(res)
            if (res.status === 200){
                sessionStorage.setItem("user", JSON.stringify(res.data));
                history.push("/home")
            }
            else{ console.log(res)}
        });
    };

    return (

        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Inicia Sesion</h3>

                    <div className="form-group">
                        <label className="font">User</label>
                        <input type="text" className="form-control" placeholder="Enter email" onChange={(e) => { setUsername(e.target.value) }} />
                    </div>

                    <div className="form-group">
                        <label className="font">Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>

                    <button type="button" className="btn btn-primary btn-block"  style={{marginTop:"5px", width:"100%"}} onClick={() => { logUser() }}>Acceder</button>
                </form>
            </div>
        </div>

    );
}