import { createSlice } from "@reduxjs/toolkit";
export const weekNumberSlice= createSlice({
    name:"weekNumber",initialState:{value:[]},
    
    reducers:{

        setWeekNumber:(state,action)=>{
            state.value=action.payload.weekNumber
        }
    }
})

export const {setWeekNumber}=weekNumberSlice.actions;
export default  weekNumberSlice.reducer 