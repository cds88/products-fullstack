import { useEffect, useState } from "react"
import { axiosClient } from "../utils/axiosClient";

export const useData =()=>{
    const [state, setState] = useState([]);
    useEffect(()=>{
        axiosClient.get("/api/Products").then(response=>{
            console.log("response is ", response )
        }).catch(console.error)
    },[])
}



 