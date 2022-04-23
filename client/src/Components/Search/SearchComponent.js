import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import ProductCard from "../Body/Home/Components/HomeProductList/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../Redux/products/products";
import { getProduct } from "../../utlis/Constants";
import axios from "axios";

const SearchComponent = () => {
     const [data, setData] = useState(null);
     const dispatch = useDispatch();
     useEffect(() => {
          axios.get(getProduct, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setProducts({ products: response.data.allProduct }));
               })
               .catch((error) => {
                    console.log(error);
               });
     }, [dispatch]);

     const Change = (e) => {
          e.preventDefault();
          setData(
               tempData.filter((product) => product.Description.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0)
          );
     };

     const Submit = (e) => {
          e.preventDefault();
          setData(
               tempData.filter((product) => product.Description.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0)
          );
     };
     const tempData = useSelector((state) => state.products.value);
     return (
          <>
               <Box pt={14}>
                    <Container>
                         <Grid container>
                              <Grid
                                   xs={12}
                                   item
                                   sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                   }}
                              >
                                   <Paper
                                        elevation={10}
                                        component="form"
                                        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
                                   >
                                        <InputBase
                                        type="input"
                                             onSubmit={(e) => e.preventDefault()}
                                             onChange={(e) => {
                                                  Change(e);
                                             }}
                                             sx={{ ml: 1, flex: 1 }}
                                             placeholder="Search  All Products"
                                             inputProps={{ "aria-label": "search google maps" }}
                                        />
                                        <IconButton
                                        type="button"
                                        onSubmit={(e)=>e.preventDefault()}
                                             onClick={(e) => {
                                                  Submit(e);
                                             }}
                                             sx={{ p: "10px" }}
                                             aria-label="search"
                                        >
                                             <SearchIcon />
                                        </IconButton>
                                   </Paper>
                              </Grid>
                              <Grid xs={12} item pt={5}>
                                   <Grid container spacing={5}>
                                        <ProductCard data={data ? data : tempData} />
                                   </Grid>
                              </Grid>
                         </Grid>
                    </Container>
               </Box>
          </>
     );
};

export default SearchComponent;
