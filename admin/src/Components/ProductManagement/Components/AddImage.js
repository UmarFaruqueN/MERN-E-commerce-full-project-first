import React, { useState, useRef } from "react";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";

import { ProductAddAppBar, addImage, setProducts } from "../";
import imageUpload from "../../../assets/imageUpload.jpg";



const useStyles = makeStyles({
     productImgGrid: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
     },
     productImg: { width: "230px", height: "230px" },
});
const AddImage = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const classes = useStyles();
     const { _id } = useParams();
     console.log(_id);

     const [img1State, setImg1State] = useState(null);
     const [img2State, setImg2State] = useState(null);
     const [img3State, setImg3State] = useState(null);
     const [img4State, setImg4State] = useState(null);
     const [loader, SetLoader] = useState(false);

     const img1ref = useRef(null);
     const img2ref = useRef(null);
     const img3ref = useRef(null);
     const img4ref = useRef(null);

     const Submit = (e) => {
          e.preventDefault();
          let formData = new FormData();
          formData.append("img", img1State.img);
          formData.append("img", img2State.img);
          formData.append("img", img3State.img);
          formData.append("img", img4State.img);
          formData.append("data", JSON.stringify(_id));
          SetLoader(true);
          axios.post(addImage, formData, { headers: { "Content-Type": "multipart/form-data" } })
               .then((response) => {
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         text: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    dispatch(setProducts(response.data.allProduct));
                    navigate("/productManagement");
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
     };

     const changeRef = (target) => {
          target.current.click();
     };

     const onchangeImg1 = (e) => {
          console.log(e.target);
          if (e.target.files.length > 0) {
               const img = e.target.files[0];
               const url = URL.createObjectURL(img);
               setImg1State({ img, url });
               console.log(img1State);
          }
     };

     const onchangeImg2 = (e) => {
          console.log(e.target);
          if (e.target.files.length > 0) {
               const img = e.target.files[0];
               const url = URL.createObjectURL(img);
               setImg2State({ img, url });
               console.log(img2State);
          }
     };
     const onchangeImg3 = (e) => {
          console.log(e.target);
          if (e.target.files.length > 0) {
               const img = e.target.files[0];
               const url = URL.createObjectURL(img);
               setImg3State({ img, url });
               console.log(img3State);
          }
     };
     const onchangeImg4 = (e) => {
          console.log(e.target);
          if (e.target.files.length > 0) {
               const img = e.target.files[0];
               const url = URL.createObjectURL(img);
               setImg4State({ img, url });
               console.log(img4State);
          }
     };

     const handleClose = () => {
          navigate("/backFromImage" + _id);
     };

     return (
          <div>
               <ProductAddAppBar Close={handleClose} title={"Add Image"} />
               <Grid pt={3} container rowSpacing={2} columnSpacing={2}>
                    <Grid className={classes.productImgGrid} item xs={6}>
                         <img
                              className={classes.productImg}
                              onClick={() => {
                                   changeRef(img1ref);
                              }}
                              src={img1State?.url || imageUpload}
                         alt="image1" />
                         <input hidden ref={img1ref} name="file" type="file" onChange={onchangeImg1} />
                    </Grid>
                    <Grid className={classes.productImgGrid} item xs={6}>
                         <img
                              className={classes.productImg}
                              onClick={() => {
                                   changeRef(img2ref);
                              }}
                              src={img2State?.url || imageUpload}
                              alt="image2"   />
                         <input hidden ref={img2ref} name="file" type="file" onChange={onchangeImg2} />
                    </Grid>
                    <Grid className={classes.productImgGrid} item xs={6}>
                         <img
                              className={classes.productImg}
                              onClick={() => {
                                   changeRef(img3ref);
                              }}
                              src={img3State?.url || imageUpload}
                              alt="image3"   />
                         <input hidden ref={img3ref} name="file" type="file" onChange={onchangeImg3} />
                    </Grid>
                    <Grid className={classes.productImgGrid} item xs={6}>
                         <img
                              className={classes.productImg}
                              onClick={() => {
                                   changeRef(img4ref);
                              }}
                              src={img4State?.url || imageUpload}
                              alt="image4"  />
                         <input hidden ref={img4ref} name="file" type="file" onChange={onchangeImg4} />
                    </Grid>

                    <Grid display="flex" flexDirection="row-reverse" justifyContent="flex-start" item xs={6.5}>
                         {loader ? (
                              <CircularProgress color="secondary" />
                         ) : (
                              <Button color="secondary" variant="contained" type="submit" onClick={Submit}>
                                   Upload
                              </Button>
                         )}
                    </Grid>
               </Grid>
          </div>
     );
};

export default AddImage;
