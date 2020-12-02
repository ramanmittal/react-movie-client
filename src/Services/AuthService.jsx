import axios from "axios";
import { setMenuObj } from "../components/Menu";
class AuthService {
    constructor(){

    }
    static get isAuthenticated(){
        return !!localStorage.getItem("jwttoken");
    }

    static saveToekn(token){
        localStorage.setItem("jwttoken",token);
    }
    static saveRoles(roles){
        localStorage.setItem("roles", roles.join(","))
    }
    static getRoles() {
        const roles = localStorage.getItem("roles");
        if (roles != null) {
            return roles.split(",")
        }
        return [];
    }
    static logout(){        
        localStorage.removeItem("jwttoken");        
        localStorage.removeItem("roles");
        AuthService.stopRefreshTokenTimer();  
        setMenuObj()   
        axios.post(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_Logout_API}`,{}).then(response => {
            
        })   
    }
    static getToken(){
       return localStorage.getItem("jwttoken");
    }

    static setToken(token){
        axios.defaults.headers.common['Authorization'] = token;
    }

    static removeToken(){
        delete axios.defaults.headers.common['Authorization'];
    }

    static refreshToken() {
        axios.get(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_RefreshToken_API}`).then(response => {
            AuthService.saveToekn(response.data.token);
            AuthService.saveRoles(response.data.roles);
            AuthService.startRefreshTokenTimer();
        })
    }
    static refreshTimout = 0;
    static startRefreshTokenTimer(){
        const jwtToken = JSON.parse(atob(AuthService.getToken().split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        AuthService.refreshTimout = setTimeout(() => {
            AuthService.refreshToken();
        }, timeout);
    }
    static stopRefreshTokenTimer() {
        clearTimeout(AuthService.refreshTimout);
    }
}
export default AuthService

