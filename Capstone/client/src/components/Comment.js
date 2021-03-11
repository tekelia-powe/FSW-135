// import React from 'react'

// export default function Comment(props){
//   const { comment, _id } = props
//   return (
//     <div className="todo">
      
//       <h3>{ comment} {_id}</h3>
//       </div>
//   )
// }

import React from "react"

function Comment(props) {
  const { username, comment, _id } = props
  var num = 0;
  

    return (
        <>

        <h4>Comment: {comment}</h4><br></br>
        <button onClick={()=> props.deleteComment(props._id)}>Delete Comment</button>
        </>
    )

}

export default Comment
