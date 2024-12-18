import React, { useContext, useState } from 'react'
import { UserContext, baseURL } from "../App"
import '../comment.css'
const Comments = () => {
    const { value } = useContext(UserContext)
    const { state } = useContext(UserContext)
    const [data, setData] = useState(value)
    const [comment, setComment] = useState("")
    const commentPost = (id, text) => {
        console.log("comment post call", value)
        fetch(baseURL + "/comment", {
            method: "put",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id,
                text: text
            })
        }).then(res => res.json())
            .then(response => {
                console.log("comment fetchresponse", response)
                return setData(response);
            })
    }
    const addComment = (event, value) => {
        event.preventDefault()
        console.log("add cmomment call", event)
        if (value) {
            commentPost(data._id, value);
            document.getElementById('formExample').value = ''
        }
        

    }
    const deleteComment = (commentId) => {
        console.log("commmentid", commentId, value)
        fetch(baseURL + `/deleteComment/${commentId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: data._id
            })
        }).then(res => res.json())
            .then(result => {
                console.log("result", result)
                setData(result)

            })
    }
    return (
        <div style={{ width: "40rem", height: "400px", margin: "130px 330px", position: "fixed" }}>
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light" style={{ width: "20rem", height: "400px", float: "left", position: "fixed" }}>
                    <img style={{ width: "20rem", height: "493px", float: "left" }} src={value.picture} />
                </div>
                <div className="card-content" style={{ height: "400px", float: "right", marginLeft: "20rem", float: "right" }}>
                    <div className='card-title' style={{ marginTop: "0px" }}>
                        <img style={{ width: "24px", height: "24px", borderRadius: "30px", marginLeft: "2px" }} src={value.postedby.picture} />
                        <h6 style={{ marginLeft: "10px", display: "inline" }}> {value.postedby.name}</h6>
                        <i className="material-icons" style={{ float: "right" }}>more_horiz</i>
                    </div>
                    {
                        data.comments.map(record => {
                            return (
                                <div style={{ marginLeft: "2px", padding: "4px" }}>
                                    <img style={{ width: "24px", height: "24px", borderRadius: "30px" }} src={record.postedby.picture} />
                                    <h6 style={{ display: "inline", marginLeft: "10px" }}><span>{record.postedby.name} </span>{record.text}
                                        {record.postedby._id === state._id &&
                                            <i className="material-icons" type="submit" style={{ float: "right" }} onClick={() => deleteComment(record._id)}>delete</i>}
                                    </h6>

                                </div>


                            )
                        })

                    }
                </div>
                <div style={{}}>
                <i className="material-icons material-symbols-outlined" type="submit" style={{ float:"left",marginLeft: "20rem"}}>favorite_border</i>
                    <i className="material-icons material-symbols-outlined" type="submit" style={{ float:"left"}}>comment</i>
                    <i className="material-icons material-symbols-outlined" type="submit" style={{ float: "right" }}>turned_in_not</i>
                    
                </div>
                <div style={{marginLeft:"20rem"}}>
                    <img style={{ width: "24px", height: "24px", borderRadius: "30px", float:"left" }} src={value.postedby.picture} />
                    <h6 style={{marginLeft:"2rem"}}>liked by {} and {(data.likes).length} others</h6>
                </div>
                <div className='card-footer' style={{ marginLeft: "20rem",backgroundColor:"transparent" }}>
                    <input type="text" id='formExample' placeholder='Add a comment' style={{border:"0px", outline:"0",backgroundColor:"transparent"}} value={comment} onChange={(e) => { setComment(e.target.value) }} />
                    <button className="primary" for='formExample' onClick={(event) => { addComment(event, comment) }} style={{ float: "right" ,border:"0px", outline:"0",backgroundColor:"transparent"}}>Post</button>

                </div>
            </div>
        </div>
    )
}
export default Comments

