import { createSlice } from "@reduxjs/toolkit";
export const addImageSlice= createSlice({
    name:"addImage",initialState:{value:[]},
    
    reducers:{

        setAddImage:(state,action)=>{
            state.value=action.payload.addImage
        }
    }
})

export const {setAddImage}=addImageSlice.actions;
export default  addImageSlice.reducer 