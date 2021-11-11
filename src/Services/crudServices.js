import Axios from "axios";


  export function Register(username, password) {
    Axios.post("https://caribeazul-backend-4w2sk.ondigitalocean.app/register", {
        username: username,
        password: password
      }).then((res) => {return res})
   }

  export function Getusers() {
      Axios.get("https://caribeazul-backend-4w2sk.ondigitalocean.app/userlist").then((data) => { return( data)})
   }

  export function Updates(id, username, password) {
      Axios.post("https://caribeazul-backend-4w2sk.ondigitalocean.app/update", {
         id: id,
         username: username,
         password: password
       }).then((res) => {return res})
   }

  export function Delete(id){
     return Axios.delete(`https://caribeazul-backend-4w2sk.ondigitalocean.app/delete/${id}`).then((res) => {return res})
   }




