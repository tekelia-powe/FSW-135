import React, {useState, useEffect} from "react"
import User from "./User.js"
const axios = require("axios")

export default function Results() {
    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const [users, setUsers] = useState([])


    
    useEffect(()=>{userAxios.get("/api/user/")
        .then(res => setUsers(res.data))
        .catch(err => console.log(err.response.data.errMsg))
        },
        []
    )
    
    return (
        <div className="publicIssuesHolder">
            {users.map(user => <User {...user}/>)}
        </div>
    )

}

