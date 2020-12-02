import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import Menu from './components/Menu';
import React from "react";
import Login from './components/Login';
import * as Router from "react-router-dom";
import User from './components/User';
import ProtectedRoute from './Services/ProtectedRoute';
import axios from "axios"
import AuthService from './Services/AuthService';
import EditUser from './components/EditUser';
import CreateUser from './components/CreateUser';
import Loader from './components/Loader';
import Home from './components/Home';
import Movies from './components/Movies';
import CreateMovie from './components/CreateMovie';
import EditMovie from './components/EditMovie';
function App() {
  axios.interceptors.request.use(req => {
    const token = AuthService.getToken();
    if (token) {
      req.headers.common['Authorization'] = `Bearer ${token}`;     
    }
    req.withCredentials = true;
    return req
  });
  console.log("hi")
  return (<React.Fragment>
    <Loader></Loader>
    <Menu >

    </Menu>
    <div className="container">      
      <Router.Switch>
        <ProtectedRoute exact path="/users" component={User} roles={["Admin"]}></ProtectedRoute>
        <ProtectedRoute exact path="/EditUser/:id" roles={["Admin"]} component={EditUser}></ProtectedRoute>
        <Router.Route exact path="/login" component={Login}></Router.Route>
        <Router.Route exact path="/" component={Home}></Router.Route>
        <ProtectedRoute exact path="/createuser" roles={["Admin"]} component={CreateUser}></ProtectedRoute>
        <ProtectedRoute exact path="/movies" roles={["User"]} component={Movies}></ProtectedRoute>
        <ProtectedRoute exact path="/createmovies" roles={["User"]} component={CreateMovie}></ProtectedRoute>
        <ProtectedRoute exact path="/EditMovie/:id" roles={["User"]} component={EditMovie}></ProtectedRoute>
      </Router.Switch>
    </div>

  </React.Fragment>)
}

export default App;





