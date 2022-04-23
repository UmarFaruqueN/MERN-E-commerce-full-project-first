import { createSlice } from "@reduxjs/toolkit";
export const bannersSlice= createSlice({
    name:"banners",initialState:{value:[]},
    
    reducers:{

        setBanners:(state,action)=>{
            state.value=action.payload.banners
            
        }
    }
})

export const {setBanners}=bannersSlice.actions;
export default  bannersSlice.reducer 