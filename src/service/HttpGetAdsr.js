import axios from "axios";
import { useState } from "react";
export const HttpGetAdsr=()=>{
    const [srData, setSrData] = useState([]);
        axios.get('http://localhost:8080/sr/GetAllSR', {
            
        })
            .then((result) => {
                if (result) {
                    setSrData(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    // console.log(srData);
    return srData;

}