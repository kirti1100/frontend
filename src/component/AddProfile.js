import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext, baseURL } from "../App";

const AddProfile=()=>{
        const[file,setFile]=useState("")
        const[url,setUrl]=useState("")
        const navigate=useNavigate();
        const {state,dispatch}=useContext(UserContext)

        useEffect(()=>{
            if(url){
            fetch(baseURL+"/createprofile", {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body: url
              })
                .then((res) => res.json())
          
                .then((data) => {
                  if(data.error){
                    toast(data.error, { hideProgressBar: true, autoClose: 2000, type: 'error' ,position:'top-right' })
          
                  }else{
                    console.log("data profile",data)
                    dispatch({type:"UPDATEPIC",payload:data.picture})
                    localStorage.setItem("user",JSON.stringify({...state,picture:data.picture}))
                    toast("posted successfully", { hideProgressBar: true, autoClose: 2000, type: 'success' ,position:'top-right' })
                    navigate("/profile")
                  }
                  
                })
                .catch((err) => {
                  console.log("error", err);
                });
            }
        },[url])
        const postdata=()=>{
            console.log("file",file)
            const data=new FormData()
            data.append("file",file)
            data.append("upload_preset","insta-clone")
            data.append("cloud_name","dgzgu6c24")
            fetch("https://api.cloudinary.com/v1_1/dgzgu6c24/image/upload",{
                method:"post",
                body:data
            }).then(res=>res.json())
            .then(data1=>{
              console.log("data1",data1)
              setUrl(data1.url)})
            .catch(err=>{console.log(err)})
    
            
        }   
        return (  
            <div className="mycard" > 
            <div className="card auth-card" >

            <div>
                <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src="https://media.istockphoto.com/id/1433039224/photo/blue-user-3d-icon-person-profile-concept-isolated-on-white-background-with-social-member.jpg?s=612x612&w=is&k=20&c=5QujUSZDxlkDAH3j9NAsiW1vA5hLUswspIPbzxUD3GQ=" />
            </div>
            <h2>Add profile photo</h2>
            <p>Add a profile photo so your friends know its you.</p>
            
            <div>
            <input  type="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
            <button type="submit" className="btn-primary" onClick={postdata}>
                            Submit
                        </button>
            </div>
            <Link to="/profile" style={{color:"blue"}}>Skip</Link>
            </div>
             </div>
        )
    };
    

export default AddProfile