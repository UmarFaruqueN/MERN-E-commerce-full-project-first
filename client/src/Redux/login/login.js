import { createSlice } from "@reduxjs/toolkit";
export const loginSlice= createSlice({
    name:"login_state",initialState:{value:false},
    
    reducers:{

        change_login_state:(state,action)=>{
            state.value=action.payload.login_state
        }
    }
})

export const {change_login_state}=loginSlice.actions;
export default  loginSlice.reducer 