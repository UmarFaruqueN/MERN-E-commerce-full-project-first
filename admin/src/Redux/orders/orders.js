import { createSlice } from "@reduxjs/toolkit";
export const ordersSlice= createSlice({
    name:"orders",initialState:{value:[]},
    
    reducers:{

        setOrders:(state,action)=>{
            state.value=action.payload.orders
        }
    }
})

export const {setOrders}=ordersSlice.actions;
export default  ordersSlice.reducer 