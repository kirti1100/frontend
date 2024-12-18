import React, { useContext, useState } from 'react'
import { UserContext, baseURL } from "../App"
const FollowersList=(userId)=>{
    const {state,dispatch}=useContext(UserContext)
    const [profile,setProfile]=useState(null)
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

    const unFollow=(userId)=>{
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
    
     return(
        <>  
        <>{console.log("check statefollowers",state)}</>
        
        <div className="card" style={{width:"18rem",margin:"18px auto"}}>
            <div className="card-title">
               <h2 style={{float:"left"}}>All Followers</h2>
            </div>
             <div className="card-body">
                <ul>
                    {
                        state.followers.length>0? 
                        state.followers.map(item=>{
                            
                            return(
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    margin: "18px 0px"
                                }}>
                                <li>{item.name}</li>
                                {
                                  state.following.length>0 ?
                                  state.followers.map(user=>{
                                        return(
                                            user._id === item._id && <button type="submit" className="btn btn-primary" onClick={()=>unFollow(item._id)}>
                                            UnFollow
                                         </button>
                                        )
                                     })
                                   : <button type="submit" className="btn btn-primary" onClick={()=>followers(item._id)}>
                                         Follow
                                      </button>
                                }
                               </div>
                            )
                        })
                        :<h2>No Followers</h2>
                    }
                    
                </ul>
             </div>
           </div>
        </>
     )
}
export default FollowersList;