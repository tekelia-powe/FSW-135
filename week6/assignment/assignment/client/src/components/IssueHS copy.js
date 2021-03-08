import React, { useContext } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
import Menu from './Menu.js'
import { UserContext } from '../context/UserProvider.js'

export default function IssueHS(){
  const { 
    user: { 
      username 
    }, 
    addIssue, issues
   
  } = useContext(UserContext)

  return (
    <>
      <h1>Welcome @{username}!</h1>
      <h3>Add An Main Issue</h3>
      <div className="home_container">
      <div className="menu">
         <Menu/>
      </div>

    <div className="main">
        <h1>Hate Speech</h1>
    </div>

    <div className="footer">
      Footer
    </div>
    </div>
    </>
  )
}