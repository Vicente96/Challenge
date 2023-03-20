import React from 'react'
import { ToastContainer } from "react-toastify";
import { useEffect,useState } from "react";
import {getLocalStorageItem} from "../../helpers/LoacalStorage.helper";
import {invalidData, validData} from '../../helpers/toastyfyNotification';
import axios from 'axios';
import * as yup from "yup";
import {  useNavigate } from "react-router-dom";
const {getAccounts,createTeam} = require ('../../Api/Routes');

export const Teams = () => {
    const navigate = useNavigate();
    const [nameTeam,setNameTeam] = useState("");
    const [idAccount,setIdAccount] = useState("");
    const [accounts,setAccounts] = useState([]);

    let schema = yup.object().shape({
        description: yup.string().min(5).max(50).required()
      });
      
    useEffect(() => {
        get_Accounts();
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        let data = {
            description: nameTeam,
            idAccount:idAccount
        };
        const dataValidation = await schema.isValid(data);
        if (dataValidation === true){
            create_Team(data);
        }else{
            invalidData("Enter correct data");  
        } 
    }
    const create_Team = async (data) => {
      console.log(data);
        const url = `http://${createTeam}`;
        axios.defaults.headers.common = {'auth-token': getLocalStorageItem("token")}
        axios.post(url,data).then((res) => {
            
            navigate("/");
            validData("Account created");
        }).catch(error => {
            invalidData(error);
        });
      };

    const get_Accounts = async () => {
        const url = `http://${getAccounts}`;
        axios.defaults.headers.common = {'auth-token': getLocalStorageItem("token")}
        axios
          .get(url)
          .then((res) => {
            setAccounts(res.data); 
            console.log(accounts[1].A);
          })
          .catch((error) => {
            invalidData(error);
          });
      };
    

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
        <h2>New team</h2>
        <form onSubmit={handleSubmit} >
          <div class="input-box">
            <input
              type="text"
              placeholder="Enter name team"
              name="nameAccount"
              value={nameTeam}
              onChange={(e) => setNameTeam(e.target.value)}
              required
            />
          </div>
          <h3>Account</h3>
          <div class="input-box">
            <select onChange={(e) => setIdAccount(parseInt(e.target.value))} class="role">{
                accounts.map((account)=>
                <option value={account.idAccount}>{account.name}</option>
                )
            }
            </select>
          </div>
          <div class="button">
            <input type="Submit" value="Save team" />
          </div>
        </form>
      </div>
    </div>
  )
}
