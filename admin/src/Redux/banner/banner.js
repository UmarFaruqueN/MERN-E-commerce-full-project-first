import { createSlice } from "@reduxjs/toolkit";
export const bannerSlice= createSlice({
    name:"banner",initialState:{value:[]},
    
    reducers:{

        setBanner:(state,action)=>{
            state.value=action.payload.banner
        }
    }
})

export const {setBanner}=bannerSlice.actions;
export default  bannerSlice.reducer 