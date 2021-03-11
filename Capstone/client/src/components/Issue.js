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
      <p><span className="title">Title:</span> {title}</p>
      <p><span className="title">Description:</span> {description}</p>
      <button className="delete_btn" onClick={()=>deleteIssue(_id)}>Delete Issue</button>
      <button className="edit_btn"onClick={()=>toggleCanEdit(prevState => !prevState)}>Edit Issue</button>
      </>
    :
    <>
      <IssueEditForm {...props} addissue={addIssue} toggleCanEdit={toggleCanEdit} />
     <button className="delete_btn" onClick={()=>deleteIssue(_id)}>Delete Issue</button>
     <button className="edit_btn"onClick={()=>toggleCanEdit(prevState => !prevState)}>Cancel</button>
   </>
   }
 </div>
  )}
