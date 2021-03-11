import React, {useState, useEffect} from "react"
import Comment from "./Comment.js"
import axios from "axios"
import CommentForm from "./CommentForm.js"

export default function UserIssue(props) {
    const { title, description, _id, upVotes, downVotes, username } = props

    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })
     const [votes, setVotes] = useState({upVotes: props.upVotes || 0, downVotes: props.downVotes || 0})
     const [voteErrMsg, setVoteErr] = useState("")
     const [commentToggle, setCommentToggle] = useState(false)
     const [comments, setComments] = useState([])
     const [comment, setComment] = useState([])

    useEffect(
        ()=> {
        userAxios.get(`/api/comment/${_id}`)
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
        }
    , [])


         
    function upVote(issueId) {
        userAxios.put(`api/issue/upvotes/${issueId}`)
            .then(res => setVotes(prevVotes => ({...prevVotes, upVotes: res.data.upVotes || prevVotes.upVotes})))
            .catch(err => setVoteErr(err.response.data.errMsg))
      }
  
    function downVote(issueId) {
        userAxios.put(`api/issue/downvotes/${issueId}`)
          .then(res => setVotes(prevVotes => ({...prevVotes, downVotes: res.data.downVotes})))
          .catch(err => console.log(err.response.data.errMsg))
    }

    function handleChange(e){
        const {name, value} = e.target
        setComment(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))

    }



    function addComment(newComment) {
        userAxios.post("api/comment", newComment)
            .then(res => {
                setComments(prevComments => [...prevComments, res.data])
            })
            .catch(err => console.log(err))
        // setComment("")
    }

    function deleteComment(commentId) {
        userAxios.delete(`/api/comment/${commentId}`)
            .then(res => setComments(prevState => prevState.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err))
    }
  






    return (
        !commentToggle?
            <div className="issue">
                    <h1>{ title }</h1>
                    <h3>{ description }</h3>
                    <h3>UpVotes: {votes.upVotes}</h3>
                    <h3>DownVotes: {votes.downVotes}</h3>
                    {comments.map(comment => <Comment {...comment} deleteComment={deleteComment}/>)}
                    <button onClick={()=>upVote(_id)}>UpVote</button>
                    <button onClick={()=>downVote(_id)}>DownVote</button>
                    <button onClick={()=>setCommentToggle(prevToggle => !prevToggle)}>Add Comments</button>
                    <p style={{color:"red"}}>{voteErrMsg}</p> 
            </div>

            :

            <div className="issue">
                {/* <div className="issue">
                    <h1>{ title }</h1>
                    <h3>{ description }</h3>
                    <h3>UpVotes: {votes.upVotes}</h3>
                    <h3>DownVotes: {votes.downVotes}</h3>
                    <button onClick={()=>upVote(_id)}>UpVote</button>
                    <button onClick={()=>downVote(_id)}>DownVote</button>
                    <button onClick={()=>setCommentToggle(prevToggle => !prevToggle)}>View Comments</button>
                    <p style={{color:"red"}}>{voteErrMsg}</p> 
            </div> */}
                <CommentForm addComment={addComment} username={username}/>
                {comments.map(comment => <Comment {...comment} deleteComment={deleteComment}/>)}
                <button onClick={()=>setCommentToggle(prevToggle => !prevToggle)}>Back</button>
            </div>
        
        
    )
}

