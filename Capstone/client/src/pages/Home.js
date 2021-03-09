import React, { useContext } from 'react'
// import IssueForm from './IssueForm.js.js'
// import IssueList from './IssueList.js.js'
import Menu from '../components/Menu.js'
import HateSpeech from '../pages/HateSpeech.js'
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
      <h1>Welcome, Logged in as {username}!</h1>
      
      <div className="home_container">
      <div className="menu">
      <Menu/>
      </div>
      <HateSpeech />
      <div className="main">
      
      </div>

    {/* <div className="footer">
      Footer
    </div> */}
    </div>
    </>
  )
}