import React from "react";
import { useState } from "react";
import "../login/Login.css"
import * as yup from "yup";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import {invalidData, validData} from '../../helpers/toastyfyNotification';
import {setLocalStorageItem} from "../../helpers/LoacalStorage.helper"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const {loginRoute} = require ('../../Api/Routes');



export const Login = () => {
  const navigate = useNavigate();
  const [token,setToken] = useState("");
  let schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(50).required(),
  });
  
const getToken = async (email, password) => {
  const url = `http://${loginRoute}${email}/${password}`;
  axios
    .get(url)
    .then((res) => {
      setToken(res.data);
      console.log(res.data);
      if (res.data.length > 20) {
        setLocalStorageItem("token", res.data);
        navigate("/");
      } else {
        invalidData("Email or password incorrect");
      }
    })
    .catch((error) => {
      invalidData(error);
    });
};

  const sendData = async(e) => {
    e.preventDefault();
    let target = e.target;
    let data = {
      email:target.email.value,
      password: target.password.value
    };
    const dataValidation = await schema.isValid(data);
    dataValidation === true ? getToken(data.email,data.password) : invalidData("Enter correct data");
  }
  return (
    <div class="main">
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <div class="wrapper">
        <h2>Login</h2>
        <form onSubmit= {sendData}>
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter user email"
              name="email"
              required
            />
          </div>
          <div class="input-box">
            <input
              type="password"
              placeholder="Create password"
              name="password"
              required
            />
          </div>
          <div class="button">
            <input type="Submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};
