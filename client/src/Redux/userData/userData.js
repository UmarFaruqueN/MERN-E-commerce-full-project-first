import { createSlice } from "@reduxjs/toolkit";
export const userDataSlice= createSlice({
    name:"userData",initialState:{value:null},
    
    reducers:{

        setUserData:(state,action)=>{
            state.value=action.payload.userData
        }
    }
})

export const {setUserData}=userDataSlice.actions;
export default  userDataSlice.reducer 