import React, { useState } from 'react'

const initInputs = {description: "" , title:"" }

export default function IssueForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addIssue } = props

  function handleChange(e){
    const {name, value} = e.target
    
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addIssue(inputs)
    console.log(inputs)
    setInputs(initInputs)
  }

  const {description, title} = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Issue Title"/>
        <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description of Issue"/>
      <button>Add Issue</button>
    </form>
  )
}