import React from 'react'

export default function Issue(props){
  const { description, _id } = props
  return (
    <div className="todo">
      
      <h3>{ description }</h3>
      </div>
  )
}