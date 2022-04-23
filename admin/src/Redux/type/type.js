import { createSlice } from "@reduxjs/toolkit";
export const typeSlice = createSlice({
     name: "type",
     initialState: { value: [] },

     reducers: {
          setType: (state, action) => {
               state.value = action.payload.type;
          },
     },
});

export const { setType } = typeSlice.actions;
export default typeSlice.reducer;
