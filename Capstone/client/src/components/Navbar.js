import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserProvider.js'

export default function Navbar(){
  const { logout , token } = useContext(UserContext)

  return (
    <div className="navbar">
      
      {token && <Link to="/home">Home</Link>}
      {token && <Link to="/results">View Results</Link>}
      {/* <Link to="/public"></Link> */}
      {token && <button className="logout_btn" onClick={logout}>Logout</button>}
    </div>
  )
}