import React, { useState } from 'react'

const initInputs = {comment : "" }

export default function CommentForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addComment } = props

  function handleChange(e){
    const {name, value} = e.target
    
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addComment(inputs)
    console.log(inputs)
    setInputs(initInputs)
  }

  const {description, title} = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="comment" 
        value={title} 
        onChange={handleChange} 
        placeholder="Please enter comment "/>
        
      <button>Add</button>
    </form>
  )
}