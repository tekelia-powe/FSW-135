import React from 'react'

export default function Comment(props){
  const { comment, _id } = props
  return (
    <div className="todo">
      
      <h3>{ comment }</h3>
      </div>
  )
}