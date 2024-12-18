import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from '../App';
const CreatPost = () => {
    const [title,setTitle]=useState("")
    const[body,setBody]=useState("")
    const[file,setFile]=useState("")
    const[url,setUrl]=useState("")
    const navigate=useNavigate();
    useEffect(()=>{
        if(url){
        fetch(baseURL+"/createpost", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              title,
              body,
              picture:url
            }),
          })
            .then((res) => res.json())
      
            .then((data) => {
              if(data.error){
                toast(data.error, { hideProgressBar: true, autoClose: 2000, type: 'error' ,position:'top-right' })
      
              }else{
                
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
          console.log("data1")
          setUrl(data1.url)})
        .catch(err=>{console.log(err)})

        
    }   
    return (   
        <div className="card" style={{width:"350px",height:"50vh",margin:"170px auto",position:"relative",borderRadius:"15px"}}>
        <h5 style={{textAlign:"center"}}>Create new post</h5>
        <div className='status' style={{width:"350px"}}></div>
        <div style={{alignItems:"center",display:"flex",justifyContent:"center",marginTop:"47px"}}>
          <i className="material-icons navicon" style={{fontSize:"100px"}}>collections</i>
        </div>
        <div className="mb-3" style={{textAlign:"center"}}>
        <input className="card-title" type="text" placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
         <input className="card-text" type="text" placeholder="Add a caption." value={body} onChange={(e)=>{setBody(e.target.value)}}/>
        </div>
        <h4 style={{textAlign:"center",fontWeight:"normal"}}> Drag photos and videos here</h4>
        <div style={{alignContent:"center",display:"flex",justifyContent:"center",marginTop:"10px"}}>
        <input  type="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
        <div>
                   <button type="submit" className="btn-primary" onClick={postdata}>
                        Submit
                   </button>
               </div>

        </div>

        </div>

        // <div style={{textAlign:"center"}}>
        //     <div className="card" style={{ width: "18rem", margin: "18px auto" }}>
        //         <input className="card-title" type="text" placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
        //         <input className="card-text" type="text" placeholder="Add a caption." value={body} onChange={(e)=>{setBody(e.target.value)}}/>
        //         <input className="btn" type="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
        //         <div>
        //             <button type="submit" className="btn btn-primary" onClick={postdata}>
        //                 Submit
        //             </button>
        //         </div>
        //     </div>
        // </div>
    )
};

export default CreatPost;