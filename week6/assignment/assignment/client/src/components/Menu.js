import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const initInputs = {description: "" }

export default function Menu(props){
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

  const {description} = inputs
  return (
    <>
               <Link to="/issueHS" id="link">
            <div className="display">
                    <h1>Hate Speech</h1>
                    {/* <img src={pic}></img> */}
                    
            </div>
            </Link>
            <Link to="/issueFA" id="link">
            <div className="display">
                    <h1>First Amendment</h1>
                    {/* <img src={pic2}></img> */}
            </div>
            </Link>
        
</>
  )
}