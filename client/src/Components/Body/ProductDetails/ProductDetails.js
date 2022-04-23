import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import ProductHeading from "./components/ProductHeading";
import ImageCarousel from "./components/ImageCarousel";
import ProductDetail from "./components/ProductDetail";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOneProduct } from "../../../utlis/Constants";

const ProductDetails = () => {
     const { _id } = useParams();
     const [productData, setProductData] = useState({});
     // const productData = data.filter((obj) => {
     //      return obj._id == _id;
     // });
     console.log(_id);
     console.log(productData);

     const bannerData = useSelector((state) => state.banners.value);
     const productBanner = bannerData.filter((obj) => {
          return obj.for === "SubCategory";
     });

     useEffect(() => {
          axios.post(getOneProduct, { _id: _id }, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    setProductData(response.data.oneProduct);
               })
               .catch((err) => {
                    console.log(err);
               });
     }, [_id]);

     return (
          <>
               <ProductHeading title={productData?.ModelNumber} />

               <Box sx={{ backgroundColor: "secondary.light", height: "100%", width: "100%" }}>
                    <Container>
                         <Grid container>
                              <Grid item md={6}>
                                   <TransformWrapper>
                                        <TransformComponent>
                                             <ImageCarousel
                                                  images={[
                                                       productData?.Image1,
                                                       productData?.Image2,
                                                       productData?.Image3,
                                                       productData?.Image4,
                                                  ]}
                                             />
                                        </TransformComponent>
                                   </TransformWrapper>
                              </Grid>
                              <ProductDetail data={productData} />
                         </Grid>
                    </Container>
                    {productBanner?.map((obj) => (
                         <img width={"100%"} height={"auto"} src={obj.banner} alt="baners" />
                    ))}
               </Box>
          </>
     );
};

export default ProductDetails;
