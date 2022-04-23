import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userData/userData";
import categoryReducer from "./category/category";
import subCategoryReducer from "./subCategory/subCategory";
import productReducer from "./product/product";
import offersReducer from "./offers/offers";
import productsReducer from "./products/products";
import typeReducer from "./type/type";
import bannerReducer from "./banner/banner";
import ordersReducer from "./orders/orders";


export default configureStore({
     reducer: {
          userData: userDataReducer,
          category: categoryReducer,
          subCategory: subCategoryReducer,
          type: typeReducer,
          product: productReducer,
          products: productsReducer,
          offers: offersReducer,
          banner:bannerReducer,
          orders:ordersReducer,
     
         
     },
});
