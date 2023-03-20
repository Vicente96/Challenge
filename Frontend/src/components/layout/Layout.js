import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import {Login} from "../../components/login/Login"
import { Principal } from "../../components/principal/Principal";
import { User } from "../user/User";
import { Account } from "../account/Account";
import { Teams } from "../teams/Teams";
import { Assigment } from "../assigment/Assigment";
import { Transaction } from "../transaction/Transaction";
import { UpdateUser } from "../user/UpdateUser";

 const Layout = ({ children }) => {
   return (
     <BrowserRouter>
       <Routes>

        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path="/" element={<Principal />}/>
        <Route path={ROUTES.USER} element={<User />} />
        <Route path={ROUTES.ACCOUNT} element={<Account />} />
        <Route path={ROUTES.TEAM} element={<Teams />} />
        <Route path={ROUTES.ASSIGMENT} element={<Assigment />} />
        <Route path={ROUTES.TRANSACTION} element={<Transaction />} />
        <Route path={ROUTES.UPDATE_USER} element={<UpdateUser />} />

       </Routes>
     </BrowserRouter>
   );
 };

export default Layout;