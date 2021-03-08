import React, { useContext } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
import Menu from './Menu.js'
import { UserContext } from '../context/UserProvider.js'

export default function Home(){
  const { 
    user: { 
      username 
    }, 
    addIssue, issues
   
  } = useContext(UserContext)

  return (
    <>
      <h1>Welcome @{username}!</h1>
      
      <div className="home_container">
      <div className="menu">
      <Menu/>
      
      {/* <h3>Your Issues</h3>
      <IssueList issues={issues}/> */}
    </div>

    <div className="main">
      {/* <IssueForm addIssue={addIssue}/> */}
      
      {/* <h3>Your Issues</h3>
      <IssueList issues={issues}/> */}
    </div>

    <div className="footer">
      Footer
    </div>
    </div>
    </>
  )
}