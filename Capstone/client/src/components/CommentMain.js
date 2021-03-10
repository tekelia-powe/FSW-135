import React, { useContext } from 'react'
import CommentForm from './CommentForm.js'
import CommentList from './CommentList.js'

import { UserContext } from '../context/UserProvider.js'

export default function CommentMain(){
  const { 
    user: {username}, 
    addComment, comments
   
  } = useContext(UserContext)

  return (
    <div className="profile">
      {/* <h1>Welcome @{username}!</h1> */}
      <h3>Add An Comment</h3>
      <CommentForm addComment={addComment}/>
      <h3>Your Comments</h3>
      <CommentList comments={comments}/>
    </div>
  )
}