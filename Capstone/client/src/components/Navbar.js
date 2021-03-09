import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../context/UserProvider.js'

export default function Navbar(){
  const { logout , token } = useContext(UserContext)

  return (
    <div className="navbar">
      {token && <Link to="/profile">Profile</Link>}
      <Link to="/public"></Link>
      {token && <button onClick={logout}>Logout</button>}
    </div>
  )
}