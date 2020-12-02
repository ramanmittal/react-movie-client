import React, { useState } from "react";
import Login from "./Login";
import AuthService from "../Services/AuthService";
import { useHistory } from "react-router-dom";
const connstObj = {}
const LoginStatus = () => {
    const history = useHistory()
    let [obj, setObj] = useState({})
    connstObj.updateStatus = () => {
        setObj({});
    };
    return <button onClick={()=>{
        if(AuthService.isAuthenticated){
            AuthService.logout()
        }
        updateLoginStatus();
        history.push("/login")
    }} className="btn btn-outline-primary">{AuthService.isAuthenticated ? "Logout" : "Login"}</button>
}
export const updateLoginStatus = ()=>{
     connstObj.updateStatus();
}
export default LoginStatus