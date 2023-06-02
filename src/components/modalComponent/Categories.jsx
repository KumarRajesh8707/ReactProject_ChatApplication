import React from "react";
import {useEffect, useState } from "react";


function Categories() {
    const categorie = [
        {
            "id": 1,
            "query": "IT Support",
            "msg": "Please contact IT team",
    
        },
        {
            "id": 2,
            "query": "Laptop Related Issues",
            "msg": "please raise a ticket under: MyHcl->ServiceXchange - download ",
    
        },
        {
            "id": 3,
            "query": "HR Related Issues",
            "msg": "Please raise a ticket under: MyHcl-> SSD",
        },
        {
            "id": 4,
            "query": "Domain Change",
            "msg": "Please connect with your RM",
    
        },
        {
            "id": 5,
            "query": "Tools Installation",
            "msg": "please raise a ticket under: MyHcl->tarmac - download software/Tool, MyHcl->service Xchange->install software - installation",
    
        },
        {
            "id": 6,
            "query": "Other Issues",
            "msg": "Please enter your query",
    
        }
       
    ]
    
    const [opt1, setOpt1] = useState(false);
    const [opt2, setOpt2] = useState(false);
    const [button, setButton] = useState();
    const [msg1, setMsg] = useState();
    const [show, setShow] = useState(true);
    const [inp, setInp] = useState([]);
    const [dism, setDism] = useState(true);
    
    const handleMessage = (value) => {
        setButton(value);
        const res = categorie.map((element1) => {
            if (element1.query === value) {
                setTimeout(() => { setMsg(element1.msg) }, 1000);
            }
        })
        setTimeout(() => {
            setDism("Please elaborate more about your query.")
        }, 2000);
        const timer = setTimeout(() => {
            setOpt2(true)
            setOpt1(false)
        }, 2000);
        return () => clearTimeout(timer);
    
       
    
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpt1(true)
        }, 5000);
        return () => clearTimeout(timer);
    }, [])
    const listItems = categorie.map(
        (element) => {
    
            return (
    
                <button value={element.query} className="btn" key={element.id} onClick={() => handleMessage(element.query)}>
                    {element.query}
    
                </button>
    
            )
        })
        useEffect(() => {
            setTimeout(() => { setOpt1(listItems) }, 4000)
        }, []);
  return (
    <div className="hu">
    <div className="div5">{show ? opt1 :null}</div>
    <div>{inp}</div>
    </div>
    
  )
}

export default Categories;

