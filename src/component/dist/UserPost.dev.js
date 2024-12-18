"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _App = require("../App");

var _reactRouterDom = require("react-router-dom");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var UserPost = function UserPost() {//     const navigate=useNavigate();
  //     const [data,setData]=useState([])
  //     const{state,dispatch}=useContext(UserContext)
  //     const {userId}=useParams()
  //     useEffect(()=>{
  //         fetch(baseURL+"/userPost",{
  //             method:"get",
  //             headers:{
  //                 "Authorization":"bearer "+localStorage.getItem("jwt")
  //             }
  //         }).then(res=>res.json())
  //         .then(result=>{
  //             console.log(result.myposts)
  //             setData(result.myposts)
  //         })
  //     },[])
  //     // useEffect(()=>{
  //     //     fetch(baseURL+`/user/${userId}`,{
  //     //         headers:{
  //     //             "Authorization":"bearer "+localStorage.getItem("jwt")
  //     //         }
  //     //     }).then(res=>res.json())
  //     //     .then(result=>{
  //     //         console.log("result",result)
  //     //         setData(result.post)
  //     //     })
  //     // },[])
  //     const likePost=(id)=>{
  //         fetch(baseURL+"/likes",{
  //             method:"put",
  //             headers:{
  //                 "Content-Type":"application/json",
  //                 "Authorization":"bearer "+localStorage.getItem("jwt")
  //             },
  //             body:JSON.stringify({
  //                postId:id
  //             })
  //         }).then(res=>res.json())
  //           .then(response=>{
  //             const newData=data.map(item=>{
  //                 if(item._id===response._id){
  //                     return response
  //                 }else{
  //                     return item
  //                 }
  //             })
  //             setData(newData)
  //             console.log("response",response,"data",data)
  //           })
  //     }
  //     const unLikePost=(id)=>{
  //         fetch(baseURL+"/unLike",{
  //             method:"put",
  //             headers:{
  //                 "Content-Type":"application/json",
  //                 "Authorization":"bearer "+localStorage.getItem("jwt")
  //             },
  //             body:JSON.stringify({
  //                postId:id
  //             })
  //         }).then(res=>res.json())
  //           .then(response=>{
  //             const newData=data.map(item=>{
  //                 if(item._id===response._id){
  //                     return response
  //                 }else{
  //                     return item
  //                 }
  //             })
  //             setData(newData)
  //             console.log("response2",response)
  //           })
  //     }
  //    const comments=(item)=>{
  //     dispatch({type:"comment",payload:item})
  //     navigate("/comment")
  //    }
  //    const deletePost=(postId)=>{
  //     console.log("deleted",typeof(postId))
  //     fetch(baseURL+`/delete/${postId}`,{
  //         method:"delete",
  //         headers:{
  //             "Authorization":"bearer "+localStorage.getItem("jwt")
  //         }
  //     }).then(res=>res.json())
  //     .then(result=>{
  //         console.log(result)
  //         const newData=data.filter(item=>{
  //             if(item._id!==result._id){
  //                 return item
  //             }
  //         })
  //         setData(newData)
  //     })
  //    }
  //     return (
  //         <>
  //         {
  //              data?
  //              <div style={{width:"18rem",margin:"18px auto"}}>
  //             <nav>
  //               <Link to={"/userProfile/"+userId}>
  //                 <i className=" material-icons material-symbols-outlined" style={{ color:  "black", float:"left"}}>arrow_back</i>
  //                 </Link>
  //                 <h1 style={{textAlign:"center"}}>Posts</h1>
  //             </nav>
  //              { 
  //                 data.map(item=>{
  //                      return(
  //                      <div className="card" style={{width:"18rem",margin:"18px auto"}}>
  //                  <div className="card-title" >
  //                     { item.postedby._id!==state._id ?
  //                     <Link to={"/userProfile/"+item.postedby._id} style={{color:"black"}}>{item.postedby.name}</Link> 
  //                     : <Link to={"/profile"} style={{color:"black"}}>{item.postedby.name}</Link>}
  //                  {item.postedby._id===state._id && <i className="material-icons" type="submit" style={{float:"right"}} onClick={()=>deletePost(item._id)}>delete</i>
  //                  }
  //                  </div>
  //                  <div className="card-body">
  //                  <img className="card-img-top" src={item.picture} />
  //                      <p className="card-text">{item.body}</p>
  //                     {item.likes.includes(state.postedby._id)?
  //                     <i className="material-icons material-symbols-outlined" style={{color:"black"}} type="submit" onClick={()=>unLikePost(item._id)}>favorite</i> :
  //                     <i className="material-icons material-symbols-outlined" type="submit" style={{color:"red",outlineColor:"black"}} onClick={()=>likePost(item._id)}>favorite</i>}
  //                     <i className="material-icons material-symbols-outlined" type="submit"  onClick={()=>comments(item)}>comment</i>
  //                  </div>
  //              </div>
  //                      )
  //                  })
  //              }
  //          </div>: <h1>Loading</h1>
  //         }
  //         </>
  //     )
};

var _default = UserPost;
exports["default"] = _default;