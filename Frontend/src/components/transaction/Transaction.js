import React from 'react'
import "../transaction/Transaction.css"
import { ToastContainer } from "react-toastify";
import { useEffect,useState } from "react";
import {getLocalStorageItem} from "../../helpers/LoacalStorage.helper";
import {invalidData, validData} from '../../helpers/toastyfyNotification';
import axios from 'axios';
import * as yup from "yup";
import {  useNavigate } from "react-router-dom";
const {getTransactions} = require ('../../Api/Routes');


export const Transaction = () => {
  const [transactions,setTransactions] = useState([]);
  useEffect(() => {
    get_Transactions();
},[])

const get_Transactions = async () => {
  const url = `http://${getTransactions}`;
  axios.defaults.headers.common = {'auth-token': getLocalStorageItem("token")}
  axios
    .get(url)
    .then((res) => {
      setTransactions(res.data); 
      
    })
    .catch((error) => {
      invalidData(error);
    });
};

  return (
    <div class = "main">
      
      <table class="rwd-table">
        <tr>
          <th>User</th>
          <th>Team</th>
          <th>Start date</th>
          <th>End Date</th>
        </tr>
        {
         transactions.map( (transaction,key) =>
         <tr key={key}>
             <td className='table-data'>{transaction.idUser }</td>
             <td className='table-data'>{transaction.idTeam }</td>
             <td className='table-data'>{transaction.startDate }</td>
             <td className='table-data'>{transaction.endDate }</td>
         </tr>
         )
       }
       
      </table>
    </div>
  );
}
