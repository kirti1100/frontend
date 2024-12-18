import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext, baseURL } from "../App";

const MyPost = () => {
    const navigate=useNavigate();
    const [data,setData]=useState([])
    const{state,dispatch,value,dispatched}=useContext(UserContext)
    
    useEffect(()=>{
        fetch(baseURL+"/mypost",{
            method:"get",
            headers:{
                "Authorization":localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.myposts)
        })
    },[])
    const likePost=(id)=>{
        fetch(baseURL+"/likes",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               postId:id
            })
        }).then(res=>res.json())
          .then(response=>{
            const newData=data.map(item=>{
                if(item._id===response._id){
                    return response
                }else{
                    return item
                }
            })
            setData(newData)
            console.log("response",response,"data",data)
          })
    }
    const unLikePost=(id)=>{
        fetch(baseURL+"/unLike",{
           
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               postId:id
            })
        }).then(res=>res.json())
          .then(response=>{
            const newData=data.map(item=>{
                if(item._id===response._id){
                    return response
                }else{
                    return item
                }
            })
            setData(newData)
            console.log("response2",response)
          })
    }
    
   const comments=(item)=>{
    dispatched({type:"comments",payload:item})
    navigate("/comment")
    
   }
   const deletePost=(postId)=>{
    console.log("deleted",typeof(postId))
    fetch(baseURL+`/delete/${postId}`,{
        method:"delete",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData=data.filter(item=>{
            if(item._id!==result._id){
                return item
            }
        })
        setData(newData)
    })

   }
    return (
        <>
        {
             data?
             <div style={{width:"18rem",margin:"18px auto"}}>
            <nav>
              <Link to="/profile">
                <i className=" material-icons material-symbols-outlined" style={{ color:  "black",float:"left",marginTop:"20px"}}>arrow_back</i>
                </Link>
                <h1 style={{textAlign:"center"}}>Posts</h1>
            </nav>
             { 
                data.map(item=>{
                     return(
                        
                     <div className="card" style={{width:"18rem",margin:"18px auto"}}>
                            
                 <div className="card-title" >
                    { item.postedby._id!==state._id ?
                    <Link to={"/userProfile/"+item.postedby._id} style={{color:"black"}}>{item.postedby.name}</Link> 
                    : <Link to={"/profile"} style={{color:"black"}}>{item.postedby.name}</Link>}
                    
                 {item.postedby._id===state._id && <i className="material-icons" type="submit" style={{float:"right"}} onClick={()=>deletePost(item._id)}>delete</i>
                 }
                 </div>
                 <div className="card-body">
                 <img className="card-img-top" src={item.picture} />
 
                     <p className="card-text">{item.body}</p>
                    {item.likes.includes(state._id)?
                    <i className="material-icons material-symbols-outlined" style={{color:"black"}} type="submit" onClick={()=>unLikePost(item._id)}>favorite</i>
                     :
                    <i className="material-icons material-symbols-outlined" type="submit" style={{color:"red",outlineColor:"black"}} onClick={()=>likePost(item._id)}>favorite</i>}
                    <i className="material-icons material-symbols-outlined" type="submit"  onClick={()=>comments(item)}>comment</i>
                    
                 </div>
                 
             </div>
             
 
                     )
                     
                 })
                 
             }
             
            
         </div>: <h1>Loading</h1>
         
        }
        
        </>
    )

}

export default MyPost;