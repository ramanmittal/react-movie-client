import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { set } from "lodash";
import { useHistory } from "react-router-dom";
import Axios from "axios";
const CreateUser = () => {
  const history = useHistory();
  const { handleSubmit, register, errors, setError, watch } = useForm();
  const submit = (data) => {
    Axios.post(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_CreateUser_API}`, data).then(response => {
      history.push(`/users`)
    })

  }
  return <>
    <div className="card">
      <div className="card-header">
        Create User
        </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <label htmlFor="FirstName">First Name</label>
            <input type="text" className="form-control" name="FirstName" placeholder="First Name" ref={register({
              required: true
            })} />
            {errors.FirstName && errors.FirstName.type === "required" && <p className="text-danger">This is required</p>}
          </div>
          <div className="form-group">
            <label htmlFor="LastName">Last Name</label>
            <input type="text" className="form-control" name="LastName" placeholder="Last Name" ref={register({
              required: true
            })} />
            {errors.LastName && errors.LastName.type === "required" && <p className="text-danger">This is required</p>}
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email</label>
            <input type="text" className="form-control" name="Email" placeholder="Email" ref={register({
              required: true, pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
              validate: async value => {
                const response = await Axios.get(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_Email_Availiable}`, { params: { email: value } });
                return response.data;
              }
            })} />
            {errors.Email && errors.Email.type === "required" && <p className="text-danger">This is required</p>}
            {errors.Email && errors.Email.type === "pattern" && <p className="text-danger">{errors.Email.message}</p>}
            {errors.Email && errors.Email.type === "validate" && <p className="text-danger">Email Not Availiable</p>}
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input type="text" className="form-control" name="Password" placeholder="Password" ref={register({
              required: true, pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
                message: "Password should be between 7 to 15 characters at least one numeric digit and a special character"
              }
            })} />
            {errors.Password && errors.Password.type === "required" && <p className="text-danger">This is required</p>}
            {errors.Password && errors.Password.type === "pattern" && <p className="text-danger">{errors.Password.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input type="text" className="form-control" name="ConfirmPassword" placeholder="Confirm Password" ref={register({
              required: true, validate: (value) => {
                return value === watch('Password');
              }
            })} />
            {errors.ConfirmPassword && errors.ConfirmPassword.type === "required" && <p className="text-danger">This is required</p>}
            {errors.ConfirmPassword && errors.ConfirmPassword.type === "validate" && <p className="text-danger">Confirm Password should be Equal to Password.</p>}
          </div>
          <br />
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Save User</button>
          </div>
        </form>
      </div>

    </div>
    
  </>
}

export default CreateUser