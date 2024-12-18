import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import './NavBar.css'
import './comment.css'
import AddProfile from './component/AddProfile'
import Comments from './component/Comments'
import CreatPost from './component/CreatPost'
import Explore from './component/Explore'
import FollowersList from './component/FollowersList'
import Home from './component/Home'
import MyPost from './component/MyPosts'
import NavBar1 from './component/NavBar1'
import Profile from './component/Profile'
import SearchUser from './component/SearchUser'
import SignIn from './component/SignIn'
import SignUp from './component/SignUp'
import UserPost from './component/UserPost'
import UserProfile from './component/UserProfile'
import { initialvalue, postReducer } from './reducers/postReducer'
import { initialToggle, toggleReducer } from './reducers/toggleReducer'
import { intialState, userReducer } from "./reducers/userReducer"
export const UserContext = createContext();
export const baseURL= process.env.REACT_APP_SERVER_URL

const Routing=()=>{
  const {state,dispatch}=useContext(UserContext);
  const navigate=useNavigate();

  useEffect(()=>{

    const user=JSON.parse(localStorage.getItem("user"))
      
      if(user){
        dispatch({type:"USER",payload:user})
        console.log("page refresh",state)
        navigate("/home")
      }else{
          navigate("/signin")
      }
      //eslint-disable-next-line
  },[])
  return(
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route exact path="/profile" element={<Profile />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/create" element={<CreatPost/>}/>
      <Route path="/comment" element={<Comments/>}/>
      <Route path="/userProfile/:userId" element={<UserProfile/>}/>
      <Route path="/addProfile" element={<AddProfile/>}/>
      <Route path="/searchUser" element={<SearchUser/>}/>
      <Route path="/myposts" element={<MyPost/>}/>
      <Route path="/userposts/:userId" element={<UserPost/>}/>
      <Route path="/followers" element={<FollowersList/>}/>
      <Route path="/explore" element={<Explore/>}/>
    </Routes>
  )
}
 

function App() {
  const[state,dispatch]=useReducer( userReducer,intialState)
  const [value,dispatched]=useReducer(postReducer,initialvalue)
  const [value1,dispatched1]=useReducer(toggleReducer,initialToggle)
  return (
    <UserContext.Provider value={{state,dispatch,value,dispatched,value1,dispatched1}}>
    <BrowserRouter>
    <NavBar1 />
    <Routing />
    <ToastContainer/>
    </BrowserRouter>
    </UserContext.Provider>
    
  )
}

export default App;
