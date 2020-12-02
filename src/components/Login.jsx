import React, { useState } from "react";
import set from "lodash/set"
import { useForm } from "react-hook-form";
import axios from "axios";
import AuthService from "../Services/AuthService";
import { Redirect , useHistory} from "react-router-dom";
import LoginStatus,{updateLoginStatus} from "./LoginStatus";
import { setMenuObj } from "../components/Menu";
const Login = () => {
    const history = useHistory();
    let [logindetails, setLoginDetails] = useState({ email: "", password: "" })
    const onChange = (event) => {

        const { name, value } = event.target;
        setLoginDetails((prev) => {
            set(prev, name, value);
            return { ...prev };
        })
    }
    const submit = (event) => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_Login_API}`, { EmailAddress: logindetails.email, Password: logindetails.password }).then(function (response) {
            
            AuthService.saveToekn(response.data.token);
            AuthService.saveRoles(response.data.roles);
            AuthService.startRefreshTokenTimer()
            updateLoginStatus()
            setMenuObj()
            if (AuthService.getRoles().includes("Admin")) {
                history.push('/users')
            }
            else if(AuthService.getRoles().includes("User")){
                history.push('/movies')
            }            
        })
    }
    const { handleSubmit, register, errors } = useForm();
    return <div className="card">
        <div className="card-header">
            Login
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" onChange={onChange} name="email" value={logindetails.email} aria-describedby="emailHelp" placeholder="Email" ref={register({
                        required: true, pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })} />
                    {errors.email && errors.email.type === "required" && <p className="text-danger">This is required</p>}
                    <p className="text-danger">{errors.email && errors.email.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" value={logindetails.password} placeholder="Password" ref={register({
                        required: true
                    })} />
                    {errors.password && errors.password.type === "required" && <p className="text-danger">This is required</p>}
                </div>
                <br />
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>

    </div>

}
export default Login