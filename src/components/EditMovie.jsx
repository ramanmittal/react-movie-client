import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import { ShowLoader, HideLoader } from './Loader'
import set from "lodash/set";
import { useHistory } from "react-router-dom"
const EditMovie = ({ match }) => {
    let [user, SetUser] = useState({ Title: "", Id: null, Director: "", DateReleased: "" })
    useEffect(() => {
        const url = `${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GetMovie_API}?id=${match.params.id}`
        Axios.get(url).then(response => {
            const data = response.data;
            data.dateReleased = new Date(data.dateReleased)
            SetUser({ Title: data.title, Id: data.id, Director: data.director, DateReleased: data.dateReleased });
            setValue("DateReleased", data.dateReleased ? format(data.dateReleased, "yyyy-MM-dd") : "");
        })
        register("DateReleased", { required: true })
    }, [])
    const { handleSubmit, register, errors, setError, watch, control, setValue } = useForm()
    const onChange = (event) => {
        const { name, value } = event.target
        SetUser(user => {
            set(user, name, value)
            return { ...user }
        })
    }
    const history=useHistory();
    return <div className="card">
        <div className="card-header">
            Edit Movie
        </div>
        <div className="card-body">

            <form onSubmit={handleSubmit((data => {
                ShowLoader();
                data.Id=parseInt(data.Id)
                Axios.post(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_EditMovie_API}`, data).then(response => {
                    HideLoader();
                    history.push("/movies")
                })
            }))}>
                <input type="hidden" name="Id" ref={register} defaultValue={user.Id} />
                <div className="form-group">
                    <label htmlFor="Title">Title</label>
                    <input type="text" name="Title" ref={register({ required: true })} value={user.Title} onChange={onChange} className="form-control" />
                    {errors.Title && errors.Title.type === "required" && <p className="text-danger">This is required</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="Director">Director</label>
                    <input type="text" name="Director" ref={register({ required: true })} value={user.Director} onChange={onChange} className="form-control" />
                    {errors.Director && errors.Director.type === "required" && <p className="text-danger">This is required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="DateReleased">Date Released</label>
                    <div>
                        <DatePicker name="DateReleased" dateFormat={"dd MMM yyyy"} selected={user.DateReleased} onChange={(date) => {

                            SetUser(user => {
                                set(user, "DateReleased", date)
                                setValue("DateReleased", date ? format(date, "yyyy-MM-dd") : "");
                                return { ...user }
                            })
                        }} />
                        {errors.DateReleased && errors.DateReleased.type === "required" && <p className="text-danger">This is required</p>}
                    </div>


                </div>
                <br />
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save Movie</button>
                </div>
            </form>
        </div>
    </div>
}

export default EditMovie