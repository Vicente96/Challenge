import React from 'react'
import "../principal/Principal.css"
import { useEffect,useState } from "react";
import {  useNavigate } from "react-router-dom";
import {getLocalStorageItem, removeLocalStorageItem} from "../../helpers/LoacalStorage.helper";
import jwt_decode from "jwt-decode";
import axios from 'axios';
const {getUsers} = require ('../../Api/Routes');
export const Principal = () => {

  const [email,setEmail] = useState("");
  const [idRole,setIdRole] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if(getLocalStorageItem("token")){
      var decoded = jwt_decode(getLocalStorageItem("token"));
      setEmail(decoded.user.email);
      setIdRole(decoded.user.idRole);
      console.log(decoded.user.idRole);
    }
},[])

const logOut =()=>{
  removeLocalStorageItem();
  navigate("/login")
}

const UpdateUser = () => {
  get_User();
};

const get_User = async () => {
  const url = `http://${getUsers}/${email}`;
  axios.defaults.headers.common = {'auth-token': getLocalStorageItem("token")}
  axios
    .get(url)
    .then((res) => {
      navigate("/updateuser", { state: res.data })
      console.log(res.data);
      

    })
    .catch((error) => {
      console.log(error);
    });
};


  return (
    <div class="principal">
      <aside>
  <p> {email} </p>
  <a onClick={UpdateUser}>
    <i class="fa fa-user-o" aria-hidden="true"></i>
    Your profile
  </a>
  {idRole!==1 &&(
    <div>
  <a href= "/user">
  <i class="fa fa-user-o" aria-hidden="true"></i>
  Users
</a>
 

  <a href= "/account">
    <i class="fa fa-laptop" aria-hidden="true"></i>
    Accounts
  </a>
  <a href="/team">
    <i class="fa fa-clone" aria-hidden="true"></i>
    Teams
  </a>
  <a href="/assigment">
    <i class="fa fa-star-o" aria-hidden="true"></i>
    Assigment
  </a>
  <a href="/transaction">
    <i class="fa fa-trash-o" aria-hidden="true"></i>
    Transaction
  </a>
  </div>
   )}
  <a onClick={logOut}>
    <i class="fa fa-trash-o" aria-hidden="true"></i>
    Log out
  </a>
</aside>
    </div>
  );
}
