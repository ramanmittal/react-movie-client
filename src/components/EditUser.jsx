import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import set from "lodash/set";
import Axios from "axios";
const EditUser = ({ match }) => {

    const userId = match.params.id;
    const history = useHistory();
    const url = `${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GetUser_API}/${userId}`
    useEffect(() => {
        Axios.get(url).then(response => {
            setUser({ FirstName: response.data.firstName, LastName: response.data.lastName })
        })
    }, []);


    let [user, setUser] = useState({ FirstName: "", LastName: "" })
    const { handleSubmit, register, errors } = useForm();
    const onChange = (event) => {
        const { value, name } = event.target;
        setUser((prev) => {
            set(prev, name, value);
            return { ...prev };
        })
    }
    const submit = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_UpdateUser_API}`
        user["Id"] = parseInt(userId)
        Axios.put(url, user).then(response => {
            
            history.push(`/users`)
        })
    }


    return <div className="card">
        <div className="card-header">
            Edit User
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <label htmlFor="FirstName">First Name</label>
                    <input type="text" className="form-control" onChange={onChange} name="FirstName" value={user.FirstName || ""} placeholder="First Name" ref={register({
                        required: true
                    })} />
                    {errors.FirstName && errors.FirstName.type === "required" && <p className="text-danger">This is required</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="LastName">Last Name</label>
                    <input type="text" className="form-control" onChange={onChange} name="LastName" value={user.LastName || ""} placeholder="Last Name" ref={register({
                        required: true
                    })} />
                    {errors.LastName && errors.LastName.type === "required" && <p className="text-danger">This is required</p>}
                </div>
                <br />
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save User</button>
                </div>
            </form>
        </div>

    </div>
}

export default EditUser