import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
     name: "product",
     initialState: { value: [] },

     reducers: {
          setProduct: (state, action) => {
               state.value = action.payload.product;
          },
     },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
