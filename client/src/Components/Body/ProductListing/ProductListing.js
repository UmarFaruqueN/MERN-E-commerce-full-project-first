import { Container, Grid, Typography, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Banner from "../Home/Components/Banner/Banner";
import Swal from "sweetalert2";

import axios from "axios";
import { addToCart, addWishlist, } from "../../../utlis/Constants";
import { useDispatch, useSelector } from "react-redux";

import Stock from "./components/Stock";
import Buttons from "./components/Buttons";
import ProductDetail from "./components/ProductDetail";
import FilterAndSort from "./components/FilterAndSort";
import { useNavigate } from "react-router-dom";
import { setUserData, setWishlist, setLoginForm, setCart,setCheckout } from "../../../Redux";

const ProductListing = (props) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const user =localStorage.getItem("user");
    // const allProducts = useSelector((state) => state.products.value);
     const allSubCat = useSelector((state) => state.subCategory.value);
     const [filterData, setFilterData] = useState("");
     console.log(allSubCat);
     const [data, setData] = useState([]);
     const [sortData, setSortData] = useState("");


     const Filter = (filterSubCat) => {
          setData(props.Data.filter((product) => product.SubCategory.indexOf(filterSubCat) >= 0));
          setFilterData(filterSubCat);
     };

     const ClearFilter = () => {
          setData(props.Data);
          setFilterData("");
     };

     const Sort = (sortBy) => {
          setData(
               props.Data
                    .slice()
                    .sort((a, b) =>
                         sortBy === "lowest"
                              ? a.SellingPrice < b.SellingPrice
                                   ? 1
                                   : -1
                              : sortBy === "highest"
                              ? a.SellingPrice > b.SellingPrice
                                   ? 1
                                   : -1
                              : a._id < b._id
                              ? 1
                              : -1
                    )
          );

          setSortData(sortBy);
     };

     useEffect(() => {
          //setSubCat(allSubCat.filter((subcategories) => subcategories.category.indexOf(props.category) >= 0))
          // setData(allProducts.filter((product) => product.Category.indexOf(props.Category) >= 0));
     }, []);

     const Submit = (obj) => {
          if (user) {
               const count = 1;
               const data = { ...obj, user, count };
               console.log(data);
               axios.post(addToCart, data, { headers: { "Content-Type": "application/json" } })
                    .then((response) => {
                         dispatch(setCart({ cart: response.data.cartData }));
                         dispatch(setUserData({ userData: response.data.userData }));
                         Swal.fire({
                              position: "bottom-end",
                              icon: "success",
                              title: response.data.message,
                              showConfirmButton: false,
                              timer: 1500,
                              width: "15rem",
                         });
                    })
                    .catch((err) => {
                         console.log(err);
                         console.log(err.response.data.message);
                         Swal.fire({
                              position: "bottom-end",
                              icon: "success",
                              title: err.response.data.message,
                              showConfirmButton: false,
                              timer: 1500,
                              width: "15rem",
                         });
                    });
          } else {
               dispatch(setLoginForm({ loginForm: true }));
          }
     };

     const Wishlist = (obj) => {
          const data = { ...obj, user,};
          if (user) {
               console.log(data);
               axios.post(addWishlist, data, { headers: { "Content-Type": "application/json" } })
                    .then((response) => {
                         dispatch(setWishlist({ wishlist: response.data.wishlistData }));
                         dispatch(setUserData({ userData: response.data.userData }));
                         Swal.fire({
                              position: "bottom-end",
                              icon: "success",
                              title: response.data.message,
                              showConfirmButton: false,
                              timer: 1500,
                              width: "15rem",
                         });
                    })
                    .catch((err) => {
                         console.log(err);
                         console.log(err.response.data.message);
                         Swal.fire({
                              position: "bottom-end",
                              icon: "error",
                              title: err.response.data.message,
                              showConfirmButton: false,
                              timer: 1500,
                              width: "15rem",
                         });
                    });
          } else {
               dispatch(setLoginForm({ loginForm: true }));
          }
     };


     const BuyNow =(obj)=>{
          const count = 1;
               const data = { ...obj, user, count };
          dispatch(
               setCheckout({
                    checkout: {
                         products: [data],
                         subtotal: (data.SellingPrice-data.Offer)*count,
                         shipping: 100,
                         type:"BuyNow",
                         discount: 0,
                         total: (data.SellingPrice-data.Offer)*count ,
                         address: {},
                    },
               })
          );


         
          navigate("/checkOut");
     }

     return (
          <>
               <Container>
                    <Box width="100%" height="100%" mb={10} pt={13}>
                         {" "}
                         <Banner />
                    </Box>

                    <Grid container>
                         <Grid item sm={3}>
                              <FilterAndSort Sort={Sort} ClearFilter={ClearFilter} Filter={Filter} subCat={props.subCa} />
                         </Grid>

                         <Grid item pl={2} sm={9}>
                              <Grid pt={1} pb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
                                   <Grid>
                                        {" "}
                                        <Typography variant="h4"> ({data.length||props.Data.length}) Products</Typography>
                                   </Grid>
                                   <Grid>
                                        {" "}
                                        <Typography variant="h4">
                                             {" "}
                                             Filtered by {filterData ? filterData : "none"}
                                        </Typography>
                                   </Grid>
                                   <Grid>
                                        {" "}
                                        <Typography variant="h4"> Sort by {sortData ? sortData : "Popularity"}</Typography>
                                   </Grid>
                              </Grid>
                              {data.length>0?
                              <>
                              {data?.map((obj) => (
                                   <Grid container pb={3}>
                                        <Grid item backgroundColor="whitesmoke" pl={2} md={4}>
                                             <IconButton
                                                  onClick={() => {
                                                       navigate("/product/" + obj._id);
                                                  }}
                                             >
                                                  <img height="250px" width="250px" src={obj.Image1} alt="product-img1" />
                                             </IconButton>
                                        </Grid>
                                        <Grid item backgroundColor="secondary.light" md={6}>
                                             <ProductDetail details={obj} />
                                             <Buttons Wishlist={Wishlist}  data={obj} AddTocart={Submit} BuyNow={BuyNow} />
                                        </Grid>
                                        <Stock stock={obj.Stock} />
                                   </Grid>
                              ))} </>:<>
                              {props.Data?.map((obj) => (
                                   <Grid container pb={3}>
                                        <Grid item backgroundColor="whitesmoke" pl={2} md={4}>
                                             <IconButton
                                                  onClick={() => {
                                                       navigate("/product/" + obj._id);
                                                  }}
                                             >
                                                  <img height="250px" width="250px" src={obj.Image1}  alt="productImage2"/>
                                             </IconButton>
                                        </Grid>
                                        <Grid item backgroundColor="secondary.light" md={6}>
                                             <ProductDetail details={obj} />
                                             <Buttons Wishlist={Wishlist}  data={obj} AddTocart={Submit} BuyNow={BuyNow} />
                                        </Grid>
                                        <Stock stock={obj.Stock} />
                                   </Grid>
                              ))} </>}
                         </Grid>
                    </Grid>
               </Container>
          </>
     );
};

export default ProductListing;
