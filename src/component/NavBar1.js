import InstagramIcon from '@mui/icons-material/Instagram';
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "../NavBar.css";

const NavBar1 = () => {
  const navigate = useNavigate();
  const [result,setResult]=useState([]);
  const [isOpen,setIsOpen]=useState(false);
  const { state, dispatch,value1, dispatched1 } = useContext(UserContext);

  useEffect(()=>{
    if(state){
      setResult(navList);
    }
  },[state]);
  const navList = [
         {
          path:"/home",
          icon:"home",
          name: "Home"

         },
         {
          path:"/searchUser",
          icon:"search",
          name: "search"

         },
         {
          path:"/explore",
          icon:"explore",
          name: "explore"

         },
         {
          path:"/reels",
          icon:"movie",
          name: "Reels"

         },
         {
          path:"/messages",
          icon:"message",
          name: "messages"

         },
         {
          path:"/notification",
          icon:"favorite",
          name: "notification"

         },
         {
          path:"/create",
          icon:"add_box",
          name: "Create"

         },
         {
          path:"/profile",
          icon:"person",
          name: "Profile"

         }
  ]
  
  const toggle1=()=>{
    dispatched1({type:"toggle" ,payload:isOpen});
    setIsOpen(!isOpen);
    console.log("nav bard",value1);
  }
  return (
    <>
    {
      state ? 
    
    <div class="wrapper">
      <div class="sidebar" style={{width: isOpen? "220px" : "90px"}}>
        <h4 style={{display: isOpen? "block" : "none"}}>instagram</h4>
        <i className="material-icons" style={{ padding : "0px 40px", color: "white",display: isOpen? "none" : "block"}}><InstagramIcon/></i>
        <div className='status' style={{width:isOpen? "220px" : "90px"}}></div>
        <div class="routinglist"> 
          {
            result.map((item,index)=>(
              
             <div className="nav-link" >
              <i className="material-icons navicon " onClick={toggle1} style={{ float: "left", padding: "10px"}}>
                {item.icon}
              </i>
              <Link className="nav-link navname"  onClick={toggle1} to={item.path} key={index} style={{display: isOpen? "block" : "none"}}>
              {item.name}
            </Link>
            </div>
            
            ))
          }
          </div>
          <div>
          <button
          type="submit"
          className="btn btn-primary"
          style={{ display: isOpen? "block" : "none" ,justifyContent:"center",marginLeft:"2px",width:"210px",marginBottom:"10px",borderRadius:"20px",backgroundColor:"slategrey" }}
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            navigate("/signin");
          }}
        >
          Logout
        </button>
          </div>
      </div>
    </div> : ""} </>
  );
};
export default NavBar1;
