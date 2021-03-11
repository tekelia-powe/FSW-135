import React, { useContext } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
import Issue from './Issue.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
  const { 
    user: {username}, 
    addIssue, issues
   
  } = useContext(UserContext)

  return (
    <div className="public">
      
      
    </div>
  )
}