import React, { useState } from "react";
import { Grid, _ } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { Link, useHistory } from "react-router-dom"
import axios from "axios";
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import { ShowLoader, HideLoader } from "./Loader"
import format from "date-fns/format";
const User = () => {
    let [open, setOpen] = useState(false)
    let [obj,setObj] = useState({})
    let [selected,setSelected]=useState({});
    const env = process.env;
    const history = useHistory();
    const redirect = (path) => {
        history.push(path)
    }
    const closeDialog = ()=>{
        setOpen(false)
    }
    return <React.Fragment>
        <div className="text-right">
            <Link className="btn btn-primary" to="/createmovies">Create</Link>
        </div>
        <br></br>
        <Grid render={obj}
            server={{
                url: `${env.REACT_APP_SERVER_URL}${env.REACT_APP_Movies_API}`,
                data: (opts) => {
                    return new Promise((resolve) => {
                        axios.get(opts.url).then(response => {                            
                            resolve({
                                data: response.data.data.map(x => [x.title, x.director,format(new Date(x.dateReleased) , "dd MMM yyyy") , _(<><button className="btn btn-primary" onClick={() => {
                                    redirect(`/EditMovie/${x.id}`)
                                }}>Edit</button><button className="btn btn-primary ml-1" onClick={() => {
                                    setSelected(x)
                                    setOpen(true)
                                }}>Delete</button></>)]),
                                total: response.data.total,
                            })
                        })
                    })
                }
            }}
            columns={['Title', 'Director', "Date Released", " "]}
            search={false}
            pagination={{
                enabled: true,
                limit: 10,
                server: {
                    url: (prev, page, limit) => `${prev}?pagesize=${limit}&pagenumber=${page + 1}`
                }
            }}
        />
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Do you want to delete Movie {`${selected.title} directed by  ${selected.director}`}</DialogTitle>
            <DialogActions>
                <button className="btn btn-primary" onClick={closeDialog}>No</button>
                <button className="btn btn-primary" onClick={() => { 
                    ShowLoader();
                    const url=`${env.REACT_APP_SERVER_URL}${env.REACT_APP_DeleteMovie_API}/${selected.id}`
                    axios.delete(url).then(response=>{
                        setObj({})
                        HideLoader();
                        closeDialog();
                    })
                }}>Yes</button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
}

export default User;