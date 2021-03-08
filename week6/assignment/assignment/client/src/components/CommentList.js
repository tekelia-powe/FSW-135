import React from 'react'
import Comment from './Comment.js'

export default function CommentList(props){
  const { comments } = props
  console.log(comments)
  return (
    <div className="todo-list">
     
      {comments.map(comment => <Comment {...comment} key={comment._id}/>) }
    </div>
  )
}