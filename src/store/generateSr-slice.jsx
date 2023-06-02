import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    
        userName: '',
        issueType: '',
        comments: '',
        isLoading: false,
    };
const generatesrSlice = createSlice({
    name : "generatesr",
    initialState,
    reducers:{
        
        updateUser(state, action){
            state.userName=action.payload
            console.log(state.userName)
        },
        updateIssueType(state,action)
        {
            state.issueType=action.payload
            console.log(state.issueType)
        },
        updateComment(state,action){
            state.comments=action.payload
            console.log(state.comments)
        },
        setLoading: (state,action) => {
            state.isLoading = action.payload
            console.log(state.isLoading)
        }, 
    },
  })
console.log(generatesrSlice.actions);
export const generateSrActions = generatesrSlice.actions;
export default generatesrSlice.reducer;