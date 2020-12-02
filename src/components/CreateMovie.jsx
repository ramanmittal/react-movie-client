import { setDate } from "date-fns/esm";
import React, { useState } from "react";
import { useForm,Controller } from "react-hook-form"
import {useHistory} from "react-router-dom"
import DatePicker from "react-datepicker";
import Axios from "axios";
import {ShowLoader,HideLoader} from './Loader'
import "react-datepicker/dist/react-datepicker.css";
const CreateMovie = () => {
    const [selectedDate, handleDateChange] = useState();
    const history = useHistory();
    const setDate = (event) => {
        handleDateChange(event)
    }
    const submit = (data) => {
        ShowLoader();
        Axios.post(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_CreateMovies_API}`, data).then(response => {
            HideLoader();
            history.push(`/movies`)
        })
    }
    const { handleSubmit, register, errors, setError, watch, control } = useForm()
    return <div className="card">
        <div className="card-header">
            Create Movie
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="Title" ref={register({ required: true })} />
                    {errors.Title && errors.Title.type === "required" && <p className="text-danger">This is required</p>}
                </div>
                <div className="form-group">
                    <label>Director</label>
                    <input type="text" name="Director" className="form-control" ref={register({ required: true })} />
                    {errors.Director && errors.Director.type === "required" && <p className="text-danger">This is required</p>}
                </div>
                <div className="form-group">
                    <label>Date Released</label>
                    <div>
                        <Controller
                            name="DateReleased"
                            control={control}
                            rules={{ required: true }}
                            render={({ onChange, value, ref }) => {
                                return <DatePicker inputRef={ref} dateFormat={"dd MMM yyyy"} name="DateReleased" selected={value} onChange={onChange} />
                            }}
                        />                       
                        {errors.DateReleased && errors.DateReleased.type === "required" && <p className="text-danger">This is required</p>}
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Add Movie</button>
                </div>
            </form>
        </div>
    </div>
}

export default CreateMovie