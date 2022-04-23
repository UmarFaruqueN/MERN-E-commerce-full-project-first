import { createSlice } from "@reduxjs/toolkit";
export const offersSlice = createSlice({
     name: "offers",
     initialState: { value: [] },

     reducers: {
          setOffers: (state, action) => {
               state.value = action.payload.offers;
          },
     },
});

export const { setOffers } = offersSlice.actions;
export default offersSlice.reducer;
