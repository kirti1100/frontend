import React, { useState ,useContext} from "react";
import { Link ,useNavigate} from "react-router-dom";
import {toast} from "react-toastify"
import {UserContext,baseURL} from '../App';

const SignUp = () => {
  const {state,dispatch}=useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const navigate=useNavigate();
  const regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const postData = (event) => {
    event.preventDefault();
    if(!regex.test(email)){
      return window.alert("invalid email")
    }
    console.log("hello");
    fetch(baseURL+"/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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
          toast(data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' ,position:'top-right' })
          navigate("/addProfile")
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
      <img src={require('../pictures/mobile.png')} style={{marginTop:"-40px"}} alt="adddd"/>
    </div>
    <div className="mycard">
      <div className="card auth-card " style={{marginTop:"200px"}}>
        <h1>Instagram</h1>
        <form>
          <div className="mb-3">
            
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="full name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            
            <input
              type="email"
              className="form-control"
              value={userName}
              placeholder="userName"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            
          </div>
          <div className="mb-3">
            
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              value={email}
              placeholder="Mobile number or email"
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
         
          <button style={{borderRadius:"10px",width:"100%"}} className="btn-primary" onClick={postData}>
            SignUp
          </button>
        </form>
        
      </div>
      <div className="card auth-card"> 
          <h6>Already have a account?
            <Link to="/signin">sign in</Link>
          </h6>
        </div>
    </div>
    </>
  );
};
export default SignUp;
