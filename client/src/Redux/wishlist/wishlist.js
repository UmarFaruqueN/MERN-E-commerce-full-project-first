import { createSlice } from "@reduxjs/toolkit";
export const wishlistSlice= createSlice({
    name:"wishlist",initialState:{value:[]},
    
    reducers:{

        setWishlist:(state,action)=>{
            state.value=action.payload.wishlist
            
        }
    }
})

export const {setWishlist}=wishlistSlice.actions;
export default  wishlistSlice.reducer 