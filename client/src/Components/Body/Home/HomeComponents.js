import React, { useEffect } from "react";
import Poster from "./Components/Poster/Poster";
import { Container } from "@mui/material";
import ExclusiveProducts from "./Components/ExclusiveProducts/ExclusiveProducts";
import HomeProducts from "./Components/HomeProductList/HomeProducts";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getProduct } from "../../../utlis/Constants";
import { setProducts } from "../../../Redux/products/products";
import { setSubCategory } from "../../../Redux/subCategory/subCategory";
import { setBanners } from "../../../Redux/banners/banners";
import { useNavigate } from "react-router-dom";
import turbo from "../../../asset/turbo.png"
import ip from "../../../asset/ip.png"
import nvr from "../../../asset/nvr.png"

const HomeComponents = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     useEffect(() => {
          axios.get(getProduct, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log("success");
                    console.log(response.data.allProduct);
                    console.log(response.data.allBanner);
                    dispatch(setProducts({ products: response.data.allProduct }));
                    dispatch(setSubCategory({ subCategory: response.data.allSubCategory }));
                    dispatch(setBanners({ banners: response.data.allBanner }));

               })
               .catch((error) => {
                    console.log(error);
               });
     }, [dispatch]);

     const Turbo = () => {
          navigate("/turboHDDevices");
     };

     const Network = () => {
          navigate("/internetProtocolDevices");
     };

     return (
          <>
               <Container sx={{ paddingTop: "100px" }}>
                    <Poster />
                    <ExclusiveProducts />
                    <HomeProducts pic={turbo} nav={Turbo} title={"Turbo HD Camera"} />
                    <HomeProducts pic={ip} nav={Network} title={"IP Camera"} />
                    <HomeProducts pic={nvr} nav={Network} title={"NVR"} />
                    <HomeProducts pic={turbo} nav={Turbo} title={"DVR"} />
               </Container>
          </>
     );
};

export default HomeComponents;
