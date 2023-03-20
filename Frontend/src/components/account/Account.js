import React from 'react'
import "../account/Account.css"
import { useState } from "react";
import * as yup from "yup";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {getLocalStorageItem} from "../../helpers/LoacalStorage.helper";
import {invalidData, validData} from '../../helpers/toastyfyNotification';
const {createAccount} = require ('../../Api/Routes');

export const Account = () => {
    const navigate = useNavigate();

    const [nameAccount,setNameAccount] = useState("");
    const [clientName,setClientName] = useState("");
    const [responsableName,setResponsableName] = useState("");

    let schema = yup.object().shape({
        name: yup.string().min(5).max(50).required(),
        clientName: yup.string().min(5).max(50).required(),
        responsableName: yup.string().min(5).max(150).required(),
      });

      const create_Account = async (data) => {
        const url = `http://${createAccount}`;
        axios.defaults.headers.common = {'auth-token': getLocalStorageItem("token")}
        axios.post(url,data).then((res) => {
            
            navigate("/");
            validData("Account created");
        }).catch(error => {
            invalidData(error);
        });
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        
        let data = {
            name:nameAccount,
            clientName:clientName,
            responsableName:responsableName
        };
        const dataValidation = await schema.isValid(data);
        if (dataValidation === true){
            create_Account(data);
        }else{
            invalidData("Enter correct data");  
        } 
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
        <h2>New account</h2>
        <form onSubmit={handleSubmit} >
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter name account"
              name="nameAccount"
              value={nameAccount}
              onChange={(e) => setNameAccount(e.target.value)}
              required
            />
          </div>
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter client name"
              name="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter responsable name"
              name="responsableName"
              value={responsableName}
              onChange={(e) => setResponsableName(e.target.value)}
              required
            />
          </div>
          <div class="button">
            <input type="Submit" value="Save account" />
          </div>
        </form>
      </div>
    </div>
  )
}
