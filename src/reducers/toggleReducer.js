export const initialToggle=false;
export const toggleReducer=(state,action)=>{
    if(action.type === "toggle"){
        state = action.payload;
        console.log("check toggle",state, action);
        return action.payload;
    }
    return false;
}