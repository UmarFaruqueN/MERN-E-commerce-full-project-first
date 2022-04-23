import { createSlice } from "@reduxjs/toolkit";
export const subCategorySlice = createSlice({
     name: "subCategory",
     initialState: { value: [] },

     reducers: {
          setSubCategory: (state, action) => {
               state.value = action.payload.subCategory;
          },
     },
});

export const { setSubCategory } = subCategorySlice.actions;
export default subCategorySlice.reducer;
