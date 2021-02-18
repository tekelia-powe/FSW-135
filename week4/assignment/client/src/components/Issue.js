import React from 'react'

export default function Issue(props){
  const { description, _id } = props
  return (
    <div className="todo">
      <h1>{ description }</h1>
      </div>
  )
}