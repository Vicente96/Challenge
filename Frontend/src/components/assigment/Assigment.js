import React from 'react'
import { ToastContainer } from "react-toastify";
import { useEffect,useState } from "react";
import {getLocalStorageItem} from "../../helpers/LoacalStorage.helper";
import {invalidData, validData} from '../../helpers/toastyfyNotification';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
const {getUsers,getTeams,createUserAssigment} = require ('../../Api/Routes');

export const Assigment = () => {
  const navigate = useNavigate();

  const [idUser,setIdUser] = useState("");
  const [users,setUsers] = useState([]);
  const [idTeam,setIdTeam] = useState("");
  const [teams,setTeams] = useState([]);

  useEffect(() => {
    get_Users();
    get_Teams();
},[])

const handleSubmit = async(e) => {
  e.preventDefault();
  
  let data = {
      idUser: idUser,
      idTeam: idTeam,
      startDate: new Date(),
      endDate: new Date()

  };
  console.log(data);
  create_Assigment(data);
}


const get_Users = async () => {
  const url = `http://${getUsers}`;
  axios.defaults.headers.common = {'auth-token': getLocalStorageItem("token")}
  axios
    .get(url)
    .then((res) => {
      setUsers(res.data); 
    })
    .catch((error) => {
      invalidData(error);
    });
};
const get_Teams = async () => {
  const url = `http://${getTeams}`;
  axios.defaults.headers.common = {'auth-token': getLocalStorageItem("token")}
  axios
    .get(url)
    .then((res) => {
      setTeams(res.data); 
    })
    .catch((error) => {
      invalidData(error);
    });
};

const create_Assigment = async (data) => {
  const url = `http://${createUserAssigment}`;
  axios.defaults.headers.common = {'auth-token': getLocalStorageItem("token")}
  axios.post(url,data).then((res) => {
      validData("Assigment created");
      navigate("/");
  }).catch(error => {
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
        <h2>New assigment</h2>
        <form onSubmit={handleSubmit} >
        <h3>User</h3>
        <div class="input-box">
            
            <select onChange={(e) => setIdUser(parseInt(e.target.value))} class="role">{
                users.map((user)=>
                <option value={user.idUser}>{user.name}</option>
                )
            }
            </select>
          </div>
          <h3>Team</h3>
          <div class="input-box">
            
            <select onChange={(e) => setIdTeam(parseInt(e.target.value))} class="role">{
                teams.map((team)=>
                <option value={team.idTeam}>{team.description}</option>
                )
            }
            </select>
          </div>
          <div class="button">
            <input type="Submit" value="Save assigment" />
          </div>
        </form>
      </div>
    </div>
  )
}
