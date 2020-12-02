import React,{useState} from "react";
import globalObject from "../Services/GlobalService";
const obj = {}
const Loader = (props)=>{
    let [isLoading,setIsLoading]=useState(false);
    
    obj.ShowLoader = () => {
        setIsLoading(true)
    }
    obj.HideLoader = () => {
        setIsLoading(false)
    }
   
    return <div className="loader"  {...(!isLoading ? {style: {display:"none"}} : {})}>
        <span className="spin"></span>
    </div>
}
const ShowLoader = ()=>{
    obj.ShowLoader()
}
const HideLoader = ()=>{
    obj.HideLoader()
}
export { ShowLoader,HideLoader}
export default Loader