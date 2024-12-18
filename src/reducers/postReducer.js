

export const initialvalue=null;
export const postReducer=(value,action)=>{
    if(action.type==="comment"){
        return action.payload
    }
    if(action.type==="comments"){
        return action.payload
    }
    if(action.type==="commented"){
        return action.payload
    }
    return value;
}