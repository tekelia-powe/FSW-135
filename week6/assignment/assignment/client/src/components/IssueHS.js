import React, { useContext, useEffect } from 'react'
import CommentForm from './CommentForm.js'
import CommentList from './CommentList.js'
import Menu from './Menu.js'
import { UserContext } from '../context/UserProvider.js'

export default function IssueHS(){
  const { 
    user: { 
      username 
    }, 
    addComment, comments, getComments
   
  } = useContext(UserContext)

  useEffect(() => {
    getComments()
 },[])

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
        <CommentForm addComment={addComment}/>
         <h3>Your Issues</h3>
         <CommentList comments={comments}/>
    </div>
      
    <div className="footer">
      Footer
    </div>
    </div>
    </>
  )
}