import React, { useState ,useContext} from "react";
import { Link ,useNavigate} from "react-router-dom";
import {UserContext} from '../App';
import {toast} from "react-toastify"
import {baseURL} from '../App'
const SignIn = () => {
  const {state,dispatch}=useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate=useNavigate();
  const regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const postData = (event) => {
    event.preventDefault();
    if(!regex.test(email)){
      return window.alert("invalid email")
    }
    console.log("hello");
    fetch(baseURL+"/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.error){
          toast(data.error, { hideProgressBar: true, autoClose: 2000, type: 'error' ,position:'top-right' })

        }else{
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          console.log("state value",data.user)
          toast("loged in", { hideProgressBar: true, autoClose: 2000, type: 'success' ,position:'top-right' })
          navigate("/profile")
        }
        console.log(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <>
    <div className="card" style={{ marginLeft:"320px", display:"flex",position:"fixed",width: "17rem" ,border:"0px",marginTop:"-0px"}}>
      <img src={require('../pictures/mobile.png')} style={{marginTop:"-90px"}} alt="adddd"/>
    </div>
    <div className="mycard" style={{position:"relative"}}>
      <div className="card auth-card " style={{marginTop:"200px"}}>
        <h1>Instagram</h1>
        <form style={{marginTop:"10px"}}>
        
          <div className="mb-3">
            
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Phone number, userName or email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            
          </div>
          <div className="mb-3">
           
            <input
              type="password"
              className="form-control"
              value={password}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          
          <button style={{borderRadius:"10px",width:"100%"}} type="submit" className="btn-primary" onClick={(event)=>postData(event)}>
            LogIn
          </button>
        </form>
        
      </div>
      <div className="card auth-card">
            <h6>Dont have a account?<Link to='/signup'> Sign Up</Link></h6>
        </div>
    </div>
    </>
  )
};
export default SignIn;
