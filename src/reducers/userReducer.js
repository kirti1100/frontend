
export const intialState=null;
export const userReducer=(state,action)=>{
    if(action.type==="USER"){
        return action.payload;
    }
    // if(action.type==="comment"){
    //     return action.payload
    // }
    if(action.type==="CLEAR"){
        return null;
    }

    if(action.type==="UPDATED"){
        console.log("check state",state)
        return{
            ...state,
            followers:action.payload.followers,
            following:action.payload.following
    }
    }
    if(action.type==="UPDATEPIC"){
        return{
            ...state,
            picture:action.payload
        }
    }
    return state;
    

}