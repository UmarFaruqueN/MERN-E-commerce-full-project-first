import { Button, Grid, IconButton} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

import {addBanner, getBanner, deleteBanner } from "../";


const BannerView = (props) => {
     const [banners, setBanners] = useState([]);
     const bannerFor = props.title;
     useEffect(() => {
          console.log(bannerFor);

          axios.post(getBanner, { bannerFor: bannerFor }, { headers: { "Content-Type": "application/json" } }).then(
               (response) => {
                    console.log(response.data.allBanner);
                    setBanners(response.data.allBanner);
               }
          );
     }, [bannerFor]);
     console.log(bannerFor);

     const [loader, SetLoader] = useState(false);
     const img1ref = useRef(null);

     const changeRef = (target) => {
          target.current.click();
     };

     const onchangeImg1 = (e) => {
          console.log(e.target);
          if (e.target.files.length > 0) {
               SetLoader(true);
               const img = e.target.files[0];
               // const url = URL.createObjectURL(img);
               let formData = new FormData();
               formData.append("img", img);
               formData.append("data", JSON.stringify(props.title));

               axios.post(addBanner, formData, { headers: { "Content-Type": "multipart/form-data" } })
                    .then((response) => {
                         axios.post(getBanner, bannerFor, { headers: { "Content-Type": "application/json" } }).then(
                              (response) => {
                                   console.log(response.data.allBanner);
                                   setBanners(response.data.allBanner);
                              }
                         );
                         Swal.fire({
                              position: "bottom-end",
                              icon: "success",
                              text: response.data.message,
                              showConfirmButton: false,
                              timer: 1500,
                              width: "15rem",
                         });

                         SetLoader(false);
                    })
                    .catch((err) => {
                         console.log(err);
                         SetLoader(false);
                         Swal.fire({
                              position: "bottom-end",
                              icon: "error",
                              text: err.response.data.message,
                              showConfirmButton: false,
                              timer: 1500,
                              width: "15rem",
                         });
                         console.log(err.response.data.message);
                    });
          }
     };

     const DeleteBanner = (data) => {
          console.log(data);
          axios.post(deleteBanner, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         text: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
               })
               .catch((err) => {
                    console.log(err);
                    Swal.fire({
                         position: "bottom-end",
                         icon: "error",
                         text: err.response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    console.log(err.response.data.message);
               });
     };

     return (
          <>
               <Grid container sx={{ backgroundColor: "#ffffff", justifyContent: "space-around" }}>
                    <Grid item sx={{ display: "flex", justifyContent: "space-around" }} md={12} pb={2} pt={3}>
                         {" "}
                         {loader ? (
                              <CircularProgress color="secondary" />
                         ) : (
                              <Button
                                   color="secondary"
                                   variant="contained"
                                   onClick={() => {
                                        changeRef(img1ref);
                                   }}
                              >
                                   Add {props.title} Image
                              </Button>
                         )}
                         <input hidden ref={img1ref} name="file" type="file" onChange={onchangeImg1} />
                    </Grid>
               </Grid>

               <Grid container mt={2} spacing={3}>
                    {banners.map((obj) => (
                         <Grid  key={obj._id} item md={12} ml={1} sx={{ display: "flex" }}>
                              <Grid item mt={3}>
                                   <img src={obj.banner} alt="banner" width="100%" height="250"></img>
                              </Grid>
                              <Grid item>
                                   {" "}
                                   <IconButton onClick={() => DeleteBanner(obj)}>
                                        <CloseIcon color="error" />
                                   </IconButton>
                              </Grid>
                         </Grid>
                    ))}
               </Grid>
          </>
     );
};

export default BannerView;
