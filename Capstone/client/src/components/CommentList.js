import React from 'react'
import Comment from './Comment.js'

export default function CommentList(props){
  const { comments, _id } = props
  return (
    <div className="todo-list">
      { comments.map(comment => <Comment {...comment} key={comment._id}/>) }
      
    </div>
  )
}