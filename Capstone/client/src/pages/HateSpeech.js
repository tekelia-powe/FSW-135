import React, { useContext } from 'react'
// import IssueForm from './IssueForm.js.js'
// import IssueList from './IssueList.js.js'
import IssueMain from '../components/IssueMain.js'
import { UserContext } from '../context/UserProvider.js'

export default function HateSpeech(){
  const { 
    user: { 
      username 
    }, 
    addIssue, issues
   
  } = useContext(UserContext)

  return (
    <>
      <h1>{username}</h1>
    </>
  )
}