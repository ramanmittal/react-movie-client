import React, { useState } from "react";
import AuthService from "../Services/AuthService";
import { getRoleMenus } from "../Services/GlobalService";
import { useHistory, NavLink } from "react-router-dom";
import LoginStatus from "./LoginStatus";
const obj = {}
const Menu = () => {
    const history = useHistory();
    let [menuObj, setMenuObj] = useState({})
    obj.setMenuObj = () => {
        setMenuObj({})
    }
    const isAuthenticated = AuthService.isAuthenticated;
    const roles = AuthService.getRoles();
    return <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">Movies</h5>
        <nav className="my-2 my-md-0 mr-md-3" menuobj={menuObj}>
            {isAuthenticated ? getRoleMenus(roles).map((menu, index) => <NavLink key={index} className="p-2 text-dark" to={menu.To}>{menu.text}</NavLink>) : ""}
        </nav>
        <LoginStatus></LoginStatus>
    </div>
}
export const setMenuObj = () => {
    obj.setMenuObj();
}
export default Menu