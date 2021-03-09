import React from 'react'

export default function Issue(props){
  const { title, description, _id } = props
  return (
    <div className="todo">
      <p>Title: {title}</p>
      <p>Description: {description}
      <button> View </button></p>
      <br></br>
      </div>
     
  )
}