import React, { useState } from 'react'

const initInputs = {description: "" }

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

  const {description} = inputs
  return (
    // <form onSubmit={handleSubmit}>
    //   <input 
    //     type="text" 
    //     name="description" 
    //     value={description} 
    //     onChange={handleChange} 
    //     placeholder="Description"/>
    //   <button>First Amendment Rights</button>
    //   <button>Add Comments</button>
    //   <button>Add Comments</button>
    //   <button>Add Comments</button>
    //   <button>Add Comments</button>
    // </form>
    <div>
            {/* <Link to="/Movies" id="link"> */}
            <div className="display">
                    <h1>Hate Speech</h1>
                    {/* <img src={pic}></img> */}
                    
            </div>
            {/* </Link> */}
            {/* <Link to="/TvShows" id="link"> */}
            <div className="display">
                    <h1>First Amendment</h1>
                    {/* <img src={pic2}></img> */}
            </div>
            {/* </Link> */}
        </div>

  )
}