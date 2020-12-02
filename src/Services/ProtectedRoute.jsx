import { rest } from "lodash";
import React from "react";
import Login from "../components/Login";
import AuthService from "./AuthService";
import { Route, Redirect } from "react-router-dom";
import Home from "../components/Home";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
    if (!AuthService.isAuthenticated)
        return <Redirect to={{ pathname: "/login" }} />
    const userRoles = AuthService.getRoles()
    if (roles != undefined && roles.filter(value => userRoles.includes(value)).length == 0) {
       return <Home {...rest}></Home>
    }
    const { computedMatch, ...rest1 } = rest
    return <Component match={computedMatch} {...rest1} />
}

export default ProtectedRoute;