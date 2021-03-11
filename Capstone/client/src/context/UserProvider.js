import React, { useState, useEffect} from 'react'
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
    issues: []
    // comments: [],
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
      // comments: [],
    })
  }

  function addIssue(newIssue){
    userAxios.post('/api/issue', newIssue)
  
      .then(res => {
        setUserState(prevState =>({
          ...prevState,
          issues: [...prevState.issues, res.data]
        }))
        
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function addComment(newComment){
    userAxios.post('/api/comment', newComment)
  
      .then(res => {
        // setUserState(prevState =>({
        //   ...prevState,
        //   comments: [...prevState.comments, res.data]
        // }))
        console.log(res)
      })
      .catch(err => console.log(err.response.data.errMsg))
  }
  
  function getUserIssues(){
    // if(!localStorage.getItem('token')) return
      userAxios.get('/api/issue/user')
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          issues: res.data
        }))
        
      })
      .catch(err => console.log(err.response.data.errMsg))
  }
  function deleteIssue(issueId) {
    userAxios.delete(`/api/issue/${issueId}`)
        .then(res => setUserState(prevState => ({
            ...prevState,
            issues: prevState.issues.filter(issue => issue._id !== issueId)
        })))
        .catch(err => console.log(err)
    )
    return getUserIssues()

}

function editIssue(newEntry, issueId) {
    userAxios.put(`/api/issue/${issueId}`, newEntry)
        .then(res => setUserState(prevState => ({
            ...prevState,
            issues: prevState.issues.map(issue => issue._id !== issueId? issue: res.data)
        })))
}

  useEffect(() => {
    getUserIssues()
  }, [])
  
  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addIssue,
        addComment,
        getUserIssues,
        resetAuthErr,
        editIssue,
        deleteIssue
      }}>
      { props.children }
    </UserContext.Provider>
  )
}