import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../utlis/Constants";
import { setCategory, setSubCategory } from "../../ProductManagement";
import AddNormalOffer from "./AddNormalOffer";
import AddCouponCode from "./AddCouponCode";
import {setOffers} from "../../../Redux"

const AddOffer = () => {
     const dispatch = useDispatch();
     const allCategory = useSelector((state) => state.category.value);
     const allSubCategory = useSelector((state) => state.subCategory.value);

     const [categories, setCategories] = useState(null);
     const [subCategories, setSubCategories] = useState(null);
     const [add, setAdd] = useState(false);
     const [select, setSelect] = useState(false);
     const [coupon, setCoupon] = useState(false);

     useEffect(() => {
          axios.get(getAllProducts, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setCategory({ category: response.data.allCategory }));
                    dispatch(setSubCategory({ subCategory: response.data.allSubCategory }));
                    dispatch(setOffers({ offers: response.data.allOffer }));
                    console.log(response.data.allOffer +"this");
               })
               .catch((error) => {
                    console.log(error);
               });
     }, [dispatch]);

     const Add = () => {
          setAdd(true);
          setSelect(true);
     };

     const Cancel = () => {
          setAdd(false);
          setSelect(false);
          setCoupon(false);
          setCategories(false);
          setSubCategories(false);
     };

     const Coupon = () => {
          setCoupon(true);
          setSelect(false);
     };

     const Category = () => {
          setCategories(true);
          setSelect(false);
     };

     const SubCategory = () => {
          setSubCategories(true);
          setSelect(false);
     };
     return (
          <Grid
               container
               mb={5}
               sx={{
                    backgroundColor: "#ffffff",
                    p: 1,
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
               }}
          >
               <Grid item pb={2} pt={2}>
                    {add ? (
                         ""
                    ) : (
                         <Button onClick={Add} color="secondary" variant="contained">
                              Add Offers
                         </Button>
                    )}

                    {select ? (
                         <Button onClick={Cancel} color="error" variant="contained">
                              Cancel
                         </Button>
                    ) : (
                         ""
                    )}
               </Grid>
               {select ? (
                    <Grid item pb={2}>
                         <Grid item>
                              {" "}
                              <Typography variant="h4">Select Offer Type</Typography>
                         </Grid>

                         <Grid item>
                              <Select variant="outlined" sx={{ color: "black" }} color="secondary" size="small" fullWidth>
                                   <MenuItem onClick={Coupon}> Coupon Code </MenuItem>
                                   <MenuItem onClick={Category}> Category Offer </MenuItem>
                                   <MenuItem onClick={SubCategory}> SubCategory Offer </MenuItem>
                              </Select>
                         </Grid>
                    </Grid>
               ) : (
                    ""
               )}
               <Grid item></Grid>

               {categories ? <AddNormalOffer Cancel={Cancel} title="Category" Cat={allCategory} /> : ""}
               {subCategories ? <AddNormalOffer Cancel={Cancel} title="SubCategory" SubCat={allSubCategory} /> : ""}
               {coupon ? <AddCouponCode title={" Add Coupon Code"} Cancel={Cancel} /> : ""}
          </Grid>
     );
};

export default AddOffer;
