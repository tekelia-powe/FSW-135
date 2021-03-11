import React, { useContext } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'

import { UserContext } from '../context/UserProvider.js'

export default function IssueMain(){
  const { 
    user: {username}, 
    addIssue, issues
   
  } = useContext(UserContext)

  return (
    <div className="inside-container">
    <div className="profile">
      {/* <h1>Welcome @{username}!</h1> */}
      
      <IssueForm addIssue={addIssue}/>
      
      <IssueList issues={issues}/>
    </div></div>
  )
}