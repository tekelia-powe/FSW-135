import React, {useState, useContext} from "react"
import { UserContext } from '../context/UserProvider.js'

export default function IssueEditForm(props) {
    const {addIssue, _id} = props
    //const {handleSubmit} = props
    const initInputs = {
        title: props.title || "",
        description: props.description || "",
      }
    const [inputs, setInputs] = useState(initInputs)
    const {editIssue} = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))

    }

    function handleSubmit(e){
        e.preventDefault()
        editIssue(inputs, _id)
        console.log(_id)
        props.toggleCanEdit(prevState => !prevState)
    }


    const { title, description } = inputs
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="title" 
            value={title} 
            onChange={handleChange} 
            placeholder="Title"/>
            <input 
            type="text" 
            name="description" 
            value={description} 
            onChange={handleChange} 
            placeholder="Description"/>
            <button>Save Edits</button>
        </form>
    )
}

