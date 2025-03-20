import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext, baseURL } from "../App";

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const { value, dispatched } = useContext(UserContext)
    const [comment, setComment] = useState("")
    const [data1, setData1] = useState([])
    
    useEffect(() => {
        fetch(baseURL + "/allpost", {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
               console.log("check home date, result", result,"state",state,"state name",state.name,state.picture);
              // console.log("check some",result.map(item=>item.likes.map(like=>like.id===state.id)) ?"true":"flse");
                setData(result)
            })
    }, [data])

    useEffect(()=>{
        fetch(baseURL + "/getalluser", {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
               console.log(result);
              // console.log("check some",result.map(item=>item.likes.map(like=>like.id===state.id)) ?"true":"flse");
                setData1(result)
            })
    },[])
    const likePost = (id) => {
        console.log("id",id);
        fetch(baseURL + "/likes", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: id
        }).then(res => res.json())
            .then(response => {
                console.log("like response",response)
                const newData = data.map(item => {
                    console.log("like map",item)
                    if (item.id === response.post.id) {
                        return response.post
                    } else {
                        return item
                    }
                })
                setData(newData)
                //console.log("response", response, "data", data,"state",state)
            })
    }
    const unLikePost = (id) => {
        console.log("unlike triggered",id);
        fetch(baseURL + "/unLike", {

            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:id
        }).then(res => res.json())
            .then(response => {
                const newData = data.map(item => {
                    if (item.id === response.post.id) {
                        return response.post
                    } else {
                        return item
                    }
                })
                console.log("newdata",newData);
                setData(newData)
                //console.log("response2", response)
            })
    }

    const comments = (item) => {
        dispatched({ type: "comment", payload: item })
        console.log("home item",item);
        navigate("/comment")

    }
    const deletePost = (postId) => {
        console.log("deleted", typeof (postId))
        fetch(baseURL + `/delete/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    if (item.id !== result.id) {
                        return item
                    }
                })
                setData(newData)
            })

    }
    const addComment = (event, value) => {
        event.preventDefault()
        if (value) {
            //commentPost(data1.id, value);
            document.getElementById('formExample').value = ''
        }
    }
    const followers=()=>{
            fetch(baseURL+"/follow",{
                method:"put",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    //followId:userId
                })
            }).then(res=>res.json())
            .then(result=>{
                // dispatch({type:"UPDATED",payload:{followers:result.logedinUser.followers, following: result.logedinUser.following}})
                // localStorage.setItem("user",JSON.stringify(result.logedinUser))
                // console.log("result",result,"profile",profile)
                // setProfile((prevState)=>{
                //    return{
                //     ...prevState,
                //     user:result.user
                //    } 
                // })
                
            })
        }
    
        const unFollow=()=>{
            fetch(baseURL+"/unFollow",{
                method:"put",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    //unFollowId:userId
                })
            }).then(res=>res.json())
            .then(result=>{
                // dispatch({type:"UPDATED",payload:{followers:result.logedinUser.followers, following: result.logedinUser.following}})
                // localStorage.setItem("user",JSON.stringify(result.logedinUser))
                // console.log("result",result,"profile",profile)
                // setProfile((prevState)=>{
                //    return{
                //     ...prevState,
                //     user:result.user
                //    } 
                // })
                
            })
        }

    return (
        <>
            {/* <>{console.log("data checking", data)}</> */}
            {
                data ? <div>
                    {
                        data.map(item => {
                            return (
                                <div className='status col-12 col-md-6 col-lg-4' style={{ width: "30rem", margin: "15px auto" ,position:"relative"}}>
                                    <div style={{ width: "30rem", margin: "15px auto" }}>
                                        <div style={{marginBottom:"30px"}}>
                                            <img style={{ width: "30px", height: "24px", borderRadius: "30px", float: "left" }} src={item.postedby.picture} />
                                            {item.postedby.id !== state.id ?
                                                <Link to={"/userProfile/" + item.postedby.id} style={{ color: "black", float: "left", marginLeft: "4px" }}>{item.postedby.name}</Link>
                                                : <Link to={"/profile"} style={{ color: "black", float: "left", marginLeft: "4px" }}>{item.postedby.name}</Link>}
                                            <i className="material-icons material-symbols-outlined" type="submit" style={{ float: "right" }}>more_horiz</i>
                                            {item.postedby.id === state.id && <i className="material-icons" type="submit" style={{ float: "right" }} onClick={() => deletePost(item.id)}>delete</i>
                                            }
                                        </div>
                                        <div className="card" style={{ width: "30rem", margin: "15px auto" }}>
                                            <div className="card-body">
                                                <img className="card-img-top" src={item.picture} />
                                            </div>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                              {
                                                item.likes && item.likes.length > 0 && (
                                                    <i
                                                        className="material-icons material-symbols-outlined"
                                                        type="submit"
                                                        style={{
                                                        color: item.likes.some(element => element.id === state.id) ? "red" : "black", 
                                                        float: "left" }}
                                                        onClick={() => {
                                                        const isLiked = item.likes.some(element => element.id === state.id);
                                                                         isLiked ? unLikePost(item.id) : likePost(item.id);
                                                                }}
                                                    >
                                                        favorite
                                                    </i>)}

                                                    {item.likes?.length === 0 && ( // Check if likes is empty array
                                                        <i
                                                            className="material-icons"
                                                            type="submit"
                                                            style={{ color: "black", float: "left" }}
                                                            onClick={() => (likePost(item.id))}
                                                        >
                                                        favorite
                                                        </i>
                                                    )}
                                                    <i className="material-icons material-symbols-outlined" type="submit" onClick={() => comments(item)} style={{ float: "left" }}>comment</i>
                                                    <i className="material-icons material-symbols-outlined" type="submit" style={{ float: "left" }}>near_me</i>
                                                    <i className="material-icons material-symbols-outlined" type="submit" style={{ float: "right" }}>turned_in_not</i>
                                        </div>
                                        <div style={{width: "30rem",textAlign:"left",display:"flex" }} >
                                            {item.likes && (item.likes).length}likes
                                        </div>
                                        <div style={{width: "30rem",textAlign:"left",display:"flex" }}>
                                            {item.postedby.id !== state.id ?
                                                <Link to={"/userProfile/" + item.postedby.id} style={{ color: "black" }}><b>{item.postedby.name}</b></Link>
                                                : <Link to={"/profile"} style={{ color: "black" }}><b>{item.postedby.name}</b></Link>}
                                            <p className="card-text" style={{marginLeft:"4px"}}>{item.body}</p>
                                    </div>
                                    <div style={{width: "30rem",textAlign:"left",display:"flex" }} >
                                            <h6 onClick={() => comments(item)}>View all {item.comments &&(item.comments).length} comments</h6>
                                    </div>
                                    <div style={{width: "30rem",textAlign:"left"}} >
                                    <input style={{border:"0px", outline:"0"}} type="text" id='formExample' placeholder='Add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                                    <button className="primary" style={{ float:"right",border:"0px", outline:"0",backgroundColor:"transparent"}} onClick={(event) => { addComment(event, comment) }} >Post</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        })

                    }

                </div> : <h1>Loading</h1>

            }
            <div  style={{width:"20%",height:"100vh",position:"absolute",left:"71%",top:"5%"}}> 
            <div>
                <img style={{width:"32px",height:"28px",borderRadius:"35px",float:"left"}}  src={state && state.picture ? state.picture:""}/>
               <Link to={"/profile"} style={{color:"black",marginLeft:"4px",fontWeight:"bold"}}>{state && state.name? state.name : "null"}</Link> 
            </div>
            <div style={{marginTop:"25px"}}>
               <h6 style={{textAlign:"left",float:"left",fontWeight:"normal"}}>suggested for you</h6> 
               <h6 style={{float:"right"}}>See All</h6>
            </div>
            <div>

            <div style={{marginTop:"80px"}}>
                {
                data1.slice(0,5).map(object =>{
                    return(
                        <div style={{marginTop:"20px"}}>
                        <img style={{width:"32px",height:"28px",borderRadius:"35px",float:"left"}}  src={object.user && object.user.picture ? object.user.picture:""}/>
                        <Link to={"/userProfile/" + object.user.id} style={{color:"black",marginLeft:"4px",fontWeight:"bold"}}>{object.user && object.user.name? object.user.name : "null"}</Link> 
                        {object.user.followers.includes(state._id)?<button type="submit" className="btn btn-primary" style={{marginRight:"2px"}} onClick={()=>unFollow()}>
                       UnFollow
                    </button>:<button type="submit" className="btn-primary" style={{float:"right"}} onClick={()=>followers()}>
                       Follow
                    </button>}
                     </div>
                    )
                    
                })
                }
               
            </div> 
            </div>
             </div>
        </>
    )

}

export default Home;