import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { UserContext, baseURL } from "../App"
const UserProfile = () => {
    const {state,dispatch}=useContext(UserContext)
    const [profile,setProfile]=useState(null)
    const {userId}=useParams()
    useEffect(()=>{
        console.log("userid userprodile",userId)
        fetch(baseURL+`/user/${userId}`,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("result",result)
            setProfile(result)
        })
    },[state])

    const followers=()=>{
        fetch(baseURL+"/follow",{
            method:"put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                followId:userId
            })
        }).then(res=>res.json())
        .then(result=>{
            dispatch({type:"UPDATED",payload:{followers:result.logedinUser.followers, following: result.logedinUser.following}})
            localStorage.setItem("user",JSON.stringify(result.logedinUser))
            console.log("result",result,"profile",profile)
            setProfile((prevState)=>{
               return{
                ...prevState,
                user:result.user
               } 
            })
            
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
                unFollowId:userId
            })
        }).then(res=>res.json())
        .then(result=>{
            dispatch({type:"UPDATED",payload:{followers:result.logedinUser.followers, following: result.logedinUser.following}})
            localStorage.setItem("user",JSON.stringify(result.logedinUser))
            console.log("result",result,"profile",profile)
            setProfile((prevState)=>{
               return{
                ...prevState,
                user:result.user
               } 
            })
            
        })
    }
    return (
        <>
        {profile? <div style={{ maxWidth: "800px", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom:"1px solid black"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={profile.user.picture}/>
                </div>
                <div>
                    <h3>{profile.user.name}</h3>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "108%"
                    }}>
                        <Link to={"/userposts/"+profile.user._id}><h5>{profile.post.length} posts</h5></Link>
                        <h5>{profile.user.followers.length} followers</h5>
                        <h5>{profile.user.following.length} following</h5>
                    </div>
                    <div>
                        <h5>Big Sur</h5>
                        <h5>welcome to my profile</h5>
                    </div>
                    {console.log(profile.user.followers.includes(state._id),profile.user,state._id)}
                    {profile.user.followers.includes(state._id)?<button type="submit" className="btn btn-primary" onClick={()=>unFollow()}>
                       UnFollow
                    </button>:<button type="submit" className="btn-primary" onClick={()=>followers()}>
                       Follow
                    </button>}
                    
                    

                </div>

            </div>
            
            <div className='gallery'>
                {
                    profile.post.map(item=>{
                        return(
                            <Link to={"/userposts/"+item.postedby._id}>
                            <img key={item._id} className="item" src={item.picture} alt={item.title}/>
                            </Link>
                        )
                    })
                }
            </div>
        </div>:<h2>LOADING!....</h2>}</>
        
    )

}
export default UserProfile;