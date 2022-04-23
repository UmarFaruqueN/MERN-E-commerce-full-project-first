import React, { useState, useEffect } from "react";
import {
     Button,
     Select,
     MenuItem,
     Container,
     DialogContentText,
     Grid,
     TextField,
     IconButton,
     CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

import { updateProduct, ProductAddAppBar, setProducts } from "..";

const EditProduct = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const [progress, setProgress] = useState(false);
     const [edit, setEdit] = useState(false);
     const [category, setCategory] = useState(null);
     const [subCategory, setSubCategory] = useState(null);
     const allProduct = useSelector((state) => state.products.value);
     const allCategory = useSelector((state) => state.category.value);
     const allSubCategory = useSelector((state) => state.subCategory.value);
     const allType = useSelector((state) => state.type.value);

     const { _id } = useParams();
     const productData = allProduct?.filter((obj) => {
          return obj._id === _id;
     });
     console.log(_id);
     console.log(productData);

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm({
          mode: "onTouched",
          reValidateMode: "onChange",
          defaultValues: {
               _id: productData[0]?._id,
               ProductName: productData[0]?.ProductName,
               ModelNumber: productData[0]?.ModelNumber,
               Category: productData[0]?.Category,
               SubCategory: productData[0]?.SubCategory,
               Type: productData[0]?.Type,
               Stock: productData[0]?.Stock,
               LandingCost: productData[0]?.LandingCost,
               SellingPrice: productData[0]?.SellingPrice,
               Description: productData[0]?.Description,
               CategoryOffer: productData[0]?.CategoryOffer,
               SubCategoryOffer: productData[0]?.SubCategoryOffer,
               TypeOffer: productData[0]?.TypeOffer,
               ProductOffer: productData[0]?.ProductOffer,
               CouponOffer: productData[0]?.CouponOffer,
               Customers: productData[0]?.Customers,
               Image1: productData[0]?.Image1,
               Image1id: productData[0]?.Image1id,
               Image2: productData[0]?.Image2,
               Image2id: productData[0]?.Image2id,
               Image3: productData[0]?.Image3,
               Image3id: productData[0]?.Image3id,
               Image4: productData[0]?.Image4,
               Image4id: productData[0]?.Image4id,
               rating: productData[0]?.rating,
               Offer: productData[0]?.Offer,
               OfferType: productData[0]?.OfferType,
          },
     });

     // Submiting form data

     const Submit = handleSubmit((data) => {
          axios.post(updateProduct, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    navigate("/");
                    dispatch(setProducts({ products: response.data.allProduct }));
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         text: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    setProgress(false);
               })
               .catch((err) => {
                    setProgress(false);
                    console.log(err);
                    console.log("ENTHO ERRORE UND");
                    Swal.fire({
                         position: "bottom-end",
                         icon: "error",
                         text: err?.response?.data?.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    console.log(err?.response?.data?.message);
               });
     });

     const handleClose = () => {
          navigate("/productManagement");
     };

     // for dropdown in the form

     const handleChange = (event) => {
          setCategory(event.target.value);
     };

     useEffect(() => {
          const filterData = allSubCategory.filter((obj) => obj.category === category);
          setSubCategory(filterData);
     }, [category,allSubCategory]);

     return (
          <div>
               <ProductAddAppBar Close={handleClose} title={"Add Product"} />
               <Container sx={{ paddingTop: "10px" }}>
                    <Grid pt={10} container rowSpacing={2} columnSpacing={2}>
                         <Grid item xs={6}>
                              <DialogContentText variant="h3" color="text.hint">
                                   Product Name
                              </DialogContentText>

                              <TextField
                                   label="Product Name"
                                   color="secondary"
                                   margin="normal"
                                   fullWidth
                                   id="ProductName"
                                   name="ProductName"
                                   {...register("ProductName", {
                                        required: "Product Name Required",
                                   })}
                              />

                              <DialogContentText color="error">{errors.ProductName?.message}</DialogContentText>
                         </Grid>

                         <Grid item xs={6}>
                              <DialogContentText variant="h3" color="text.hint">
                                   Model Number
                              </DialogContentText>

                              <TextField
                                   label="Model Number"
                                   color="secondary"
                                   margin="normal"
                                   fullWidth
                                   id="ModelNumber"
                                   name="ModelNumber"
                                   {...register("ModelNumber", {
                                        required: "Model  Number Required",
                                   })}
                              />

                              <DialogContentText color="error">{errors.ModelNumber?.message}</DialogContentText>
                         </Grid>

                         <Grid item xs={4}>
                              <DialogContentText variant="h3" color="text.hint">
                                   Category
                              </DialogContentText>
                              {edit ? (
                                   <Select
                                        label="Category"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        id="Category"
                                        name="Category"
                                        {...register("Category", {
                                             required: "Category Required",
                                        })}
                                        onChange={handleChange}
                                   >
                                        {allCategory?.map((obj) => (
                                             <MenuItem value={obj.category}>{obj.category}</MenuItem>
                                        ))}
                                   </Select>
                              ) : (
                                   <DialogContentText sx={{ pt: 2 }} variant="h3" color="text">
                                        {productData[0]?.Category}
                                        <IconButton
                                             color="secondary"
                                             onClick={() => {
                                                  setEdit(true);
                                             }}
                                        >
                                             <EditIcon sx={{ fontSize: "16px" }} />
                                        </IconButton>
                                   </DialogContentText>
                              )}

                              <DialogContentText color="error">{errors.Category?.message}</DialogContentText>
                         </Grid>

                         <Grid item xs={4}>
                              <DialogContentText variant="h3" color="text.hint">
                                   Sub Category
                              </DialogContentText>

                              {edit ? (
                                   <Select
                                        label="SubCategory"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        id="SubCategory"
                                        name="SubCategory"
                                        {...register("SubCategory", {
                                             required: "SubCategory Required",
                                        })}
                                   >
                                        {subCategory?.map((obj) => (
                                             <MenuItem value={obj.subCategory}>{obj.subCategory}</MenuItem>
                                        ))}
                                   </Select>
                              ) : (
                                   <DialogContentText sx={{ pt: 2 }} variant="h3" color="text">
                                        {productData[0]?.SubCategory}
                                        <IconButton
                                             color="secondary"
                                             onClick={() => {
                                                  setEdit(true);
                                             }}
                                        >
                                             <EditIcon sx={{ fontSize: "16px" }} />
                                        </IconButton>
                                   </DialogContentText>
                              )}

                              <DialogContentText color="error">{errors.SubCategory?.message}</DialogContentText>
                         </Grid>

                         <Grid item xs={4}>
                              <DialogContentText variant="h3" color="text.hint">
                                   Type
                              </DialogContentText>

                              {edit ? (
                                   <Select
                                        label="Type"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        id="Type"
                                        name="Type"
                                        {...register("Type", {
                                             required: "Type Required",
                                        })}
                                   >
                                        {allType?.map((obj) => (
                                             <MenuItem key={obj._id} value={obj.type}>
                                                  {obj.type}
                                             </MenuItem>
                                        ))}
                                   </Select>
                              ) : (
                                   <DialogContentText sx={{ pt: 2 }} variant="h3" color="text">
                                        {productData[0]?.Type}
                                        <IconButton
                                             color="secondary"
                                             onClick={() => {
                                                  setEdit(true);
                                             }}
                                        >
                                             <EditIcon sx={{ fontSize: "16px" }} />
                                        </IconButton>
                                   </DialogContentText>
                              )}

                              <DialogContentText color="error">{errors.Type?.message}</DialogContentText>
                         </Grid>

                         <Grid item xs={4}>
                              <DialogContentText variant="h3" color="text.hint">
                                   Stock
                              </DialogContentText>

                              <TextField
                                   label="Stock"
                                   color="secondary"
                                   margin="normal"
                                   fullWidth
                                   type="number"
                                   id="Stock"
                                   name="Stock"
                                   {...register("Stock", {
                                        required: "Stock  Required",
                                   })}
                              />

                              <DialogContentText color="error">{errors.Stock?.message}</DialogContentText>
                         </Grid>

                         <Grid item xs={4}>
                              <DialogContentText variant="h3" color="text.hint">
                                   Landing Cost
                              </DialogContentText>

                              <TextField
                                   label="LandingCost"
                                   color="secondary"
                                   margin="normal"
                                   type="number"
                                   fullWidth
                                   id="LandingCost"
                                   name="LandingCost"
                                   {...register("LandingCost", {
                                        required: "Landing Cost  Required",
                                   })}
                              />

                              <DialogContentText color="error">{errors.LandingCost?.message}</DialogContentText>
                         </Grid>

                         <Grid item xs={4}>
                              <DialogContentText variant="h3" color="text.hint">
                                   SellingPrice
                              </DialogContentText>

                              <TextField
                                   label="SellingPrice"
                                   color="secondary"
                                   margin="normal"
                                   fullWidth
                                   type="number"
                                   id="SellingPrice"
                                   name="SellingPrice"
                                   {...register("SellingPrice", {
                                        required: "SellingPrice %  Required",
                                   })}
                              />

                              <DialogContentText color="error">{errors.SellingPrice?.message}</DialogContentText>
                         </Grid>

                         <Grid item xs={12}>
                              <DialogContentText variant="h3" color="text.hint">
                                   Description
                              </DialogContentText>

                              <TextField
                                   label="Description"
                                   color="secondary"
                                   margin="normal"
                                   fullWidth
                                   id="Description"
                                   name="Description"
                                   {...register("Description", {
                                        required: "Description   Required",
                                        minLength: { value: 30, message: "Minimum 30 Charecters" },
                                        maxLength: { value: 30, message: "Maximum 30 Charecters" },
                                   })}
                              />

                              <DialogContentText color="error">{errors.Description?.message}</DialogContentText>
                         </Grid>
                         <Grid display="flex" flexDirection="row-reverse" justifyContent="flex-start" item xs={7}>
                              {" "}
                              {progress ? (
                                   <CircularProgress />
                              ) : (
                                   <Button color="secondary" variant="contained" onClick={Submit}>
                                        Update Product
                                   </Button>
                              )}
                         </Grid>
                    </Grid>
               </Container>
          </div>
     );
};

export default EditProduct;
