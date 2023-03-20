import React from 'react'
import "../user/User.css"
import * as yup from "yup";
import axios from 'axios';
import {invalidData, validData} from '../../helpers/toastyfyNotification';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  useNavigate, useLocation } from "react-router-dom";
import {getLocalStorageItem} from "../../helpers/LoacalStorage.helper"
import { useEffect,useState } from "react";
import jwt_decode from "jwt-decode";
const {createUserRoute,getUsers} = require ('../../Api/Routes');




export const UpdateUser = () => {
    const navigate = useNavigate();
    const [update,setUpdate] = useState(false);
    const [idUser,setIdUser] = useState(0);
    const [name,setName] = useState("");
    const [englishLevel,setEnglishLevel] = useState("");
    const [knowledge,setKnowledge] = useState("");
    const [idRole,setIdRole] = useState(1);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [password2,setPassword2] = useState("");
    const [cvUrl,setCvUrl] = useState("");

    let schema = yup.object().shape({
      
        name: yup.string().min(3).max(50).required(),
        englishLevel: yup.string().min(1).max(50).required(),
        knowledge: yup.string().min(5).max(150).required(),
        cvUrl: yup.string().min(5).max(500).required()
      });
      const { state } = useLocation();

      useEffect(() => {
        console.log(state);
        var decoded = jwt_decode(getLocalStorageItem("token"));
        setEmail(decoded.user.email);
        setName(state.name);
        setEnglishLevel(state.englishLevel);
        setKnowledge(state.knowledge);
        setCvUrl(state.cvUrl);
        setIdRole(state.idRole);
        setIdUser(state.idUser);
      }, []);

  

      const updateUser = async (data) => {
        console.log(data);
        const url = `http://${createUserRoute}/${idUser}`;
        axios.defaults.headers.common = {'auth-token': getLocalStorageItem("token")}
        axios.put(url,data).then((res) => {
            
            navigate("/");
            validData("User created");
        }).catch(error => {
            invalidData(error);
        });
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        let data = {
            name:name,
            englishLevel:englishLevel,
            knowledge:knowledge,
            idRole:idRole,
            email:email,
            password: password,
            cvUrl: cvUrl
        };
        console.log(data);
        const dataValidation = await schema.isValid(data);
        if (dataValidation === true){
            updateUser(data);
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
        <h2>profile</h2>
        <form onSubmit={handleSubmit}>
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
         
          <div class="input-box">
            <input
              type="text"
              placeholder="English level"
              value={englishLevel}
              onChange={(e) => setEnglishLevel(e.target.value)}
              required
            />
          </div>
          <div class="input-box">
            <input
              type="text"
              placeholder="Knowladge"
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
              required
            />
          </div>
          <div class="input-box">
            <input type="text" placeholder="CV" value={cvUrl}
             onChange={(e) => setCvUrl(e.target.value)}
            required />
          </div>
          <div class="button">
            <input type="Submit" value= "update" />
          </div>
        </form>
      </div>
    </div>
  );
}
