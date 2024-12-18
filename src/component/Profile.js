import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext, baseURL } from "../App"
const Profile = () => {
    const {state,dispatch}=useContext(UserContext)
    const [posts,setPosts]=useState(null)
    useEffect(()=>{
        fetch(baseURL+"/mypost",{
            method: "GET",
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then(result=>{
            console.log("posts",state,"result",result)
            setPosts(result)
        })
    },[])
    return (
        <>
        <>{console.log("state posts",state)}</>
        { posts ? <div style={{ maxWidth: "800px", margin: "0px auto" }}>
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom:"1px solid black"
        }}>
            <div>
               <Link to="/addProfile">
                <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={state.picture}/>
                </Link>           
            </div>
            <div>
                <h3>{state.name}</h3>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "108%"
                }}>
                    <Link to="/myposts" style={{color:"black"}}><h5>{posts.length} posts</h5></Link>
                    <Link to="/followers" ><h5>{state.followers.length} followers </h5></Link>
                    <Link to="/following" ><h5>{state.following.length} following</h5></Link>
                </div>
                <div>
                    <h5>Big Sur</h5>
                    <h5>welcome to my profile</h5>
                </div>


            </div>

        </div>
        
        <div className='gallery'>
            {
                posts.map(item=>{
                    return(
                        <Link to={"/myposts"}>
                        <img key={item._id} className="item" src={item.picture} alt={item.title}/>
                        </Link>
                    )
                })
            }
        </div>
    </div> : <h1>Loading.......</h1>}
    </>
        
    )

}
export default Profile;