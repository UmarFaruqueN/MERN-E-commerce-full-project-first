import React from "react";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "./utlis/Theme";
import { Routes, Route } from "react-router-dom";

import {
     Login,
     UserHome,
     CategoryHome,
     ProductHome,
     AddProducts,
     BannerHome,
     OrderHome,
     DashBoard,
     OfferManagement,
     ErrorPage,
} from "./Pages/index "
import { AddImage } from "./Components/ProductManagement";
import BackFromImage from "./Components/ProductManagement/Components/BackFromImage";
import EditProduct  from "./Components/ProductManagement/Components/EditProduct";
import EditImage  from "./Components/ProductManagement/Components/EditImage";

function App() {
     return (
          <ThemeProvider theme={customTheme}>
               <div className="App">
                    <Routes>
                         <Route exact path="/" element={<Login />} />
                         <Route exact path="/dashboard" element={<DashBoard />} />
                         <Route exact path="/userManagement" element={<UserHome />} />
                         <Route exact path="/categoryManagement" element={<CategoryHome />} />
                         <Route exact path="/productManagement" element={<ProductHome />} />
                         <Route exact path="/offerManagement" element={<OfferManagement />} />
                         <Route exact path="/bannerManagement" element={<BannerHome />} />
                         <Route exact path="/orderManagement" element={<OrderHome />} />
                         <Route exact path="/addProduct" element={<AddProducts />} />
                         <Route exact path="/addImage:_id" element={<AddImage />} />
                         <Route exact path="/backFromImage:_id" element={<BackFromImage />} />
                         <Route exact path="/editProduct:_id" element={<EditProduct />} />
                         <Route exact path="/editImage:_id" element={<EditImage />} />
                         <Route path="*" element={<ErrorPage />} />
                    </Routes>
               </div>
          </ThemeProvider>
     );
}

export default App;
