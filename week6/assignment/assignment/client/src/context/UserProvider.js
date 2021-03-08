import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){
  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "", 
    comments: [],
    errMsg: ''
  }
  
  const [userState, setUserState] = useState(initState)

  function handleAuthErr(errMsg){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  function resetAuthErr(){
    setUserState(prevState => ({
      ...prevState,
      errMsg: ''
    }))
  }

  function signup(credentials){
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function login(credentials){
    axios.post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getComments()
        getUserIssues()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      issues: []
    })
  }

  function addComment(newComment){
    userAxios.post('/api/comment', newComment)
  
      .then(res => {
        setUserState(prevState =>({
          ...prevState,
          comments: [...prevState.comments, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }
  
  function getUserIssues(){
    userAxios.get("/api/comment/user")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          comments: [res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function getComments(){
    userAxios.get("/api/comment")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          comments: [res.data]
        }))
        console.log(res.data)
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addComment,
        resetAuthErr,
        getComments
      }}>
      { props.children }
    </UserContext.Provider>
  )
}