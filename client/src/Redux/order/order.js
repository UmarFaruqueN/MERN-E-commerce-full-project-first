import { createSlice } from "@reduxjs/toolkit";
export const orderSlice= createSlice({
    name:"order",initialState:{value:[]},
    
    reducers:{

        setOrder:(state,action)=>{
            state.value=action.payload.order
            
        }
    }
})

export const {setOrder}=orderSlice.actions;
export default  orderSlice.reducer 