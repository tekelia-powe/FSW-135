import React, { useContext, useEffect } from 'react'
import IssueMain from '../components/IssueMain.js'
import CommentMain from '../components/CommentMain.js'
import { UserContext } from '../context/UserProvider.js'

export default function Home(){
  const { 
    user: { 
      username 
    }, 
    addIssue, issues, getUserIssues
   
  } = useContext(UserContext)
  useEffect(() => {
    getUserIssues()
  }, [])
  return (
    <>
      <h1>Welcome, Logged in as {username}!</h1>
      
      <div className="auth-container">
      <h1> All Issues</h1>
      <IssueMain/>
      
      </div>
    </>
    
  )
}