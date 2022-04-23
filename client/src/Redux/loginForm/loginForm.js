import { createSlice } from "@reduxjs/toolkit";
export const loginFormSlice= createSlice({
    name:"loginForm",initialState:{value:false},
    
    reducers:{

        setLoginForm:(state,action)=>{
            state.value=action.payload.loginForm
        }
    }
})

export const {setLoginForm}=loginFormSlice.actions;
export default  loginFormSlice.reducer 