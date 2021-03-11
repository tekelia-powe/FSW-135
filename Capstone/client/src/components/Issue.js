import React, {useState, useContext} from "react"
import IssueEditForm from "./IssueEditForm.js"
import { UserContext } from '../context/UserProvider.js'

export default function Issue(props){
  const { title, description, _id } = props
  const [canEdit, toggleCanEdit] = useState(false)
  const {addIssue, deleteIssue, editIssues} = useContext(UserContext)

  console.log(canEdit)
  return (
    <div className="issue">
      {
        !canEdit?
        <>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <button onClick={()=>deleteIssue(_id)}>Delete Issue</button>
      <button onClick={()=>toggleCanEdit(prevState => !prevState)}>Edit Issue</button>
      </>
    :
    <>
      <IssueEditForm {...props} addissue={addIssue} toggleCanEdit={toggleCanEdit} />
     <button onClick={()=>deleteIssue(_id)}>Delete Issue</button>
     <button onClick={()=>toggleCanEdit(prevState => !prevState)}>Cancel</button>
   </>
   }
 </div>
  )}
