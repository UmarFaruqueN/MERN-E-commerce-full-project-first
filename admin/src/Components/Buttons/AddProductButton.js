import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { List, Select, MenuItem } from "@mui/material";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { Box } from "@mui/system";
import { Container, DialogContent, DialogContentText, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { addProduct } from "../../utlis/Constants";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
});

const AddProductButton = () => {
     const [open, setOpen] = useState(false);
     const [category, setCategory] = useState(null);
     const [subCategory, setSubCategory] = useState(null);
     const allCategory = useSelector((state) => state.category.value);
     const allSubCategory = useSelector((state) => state.subCategory.value);
     const allType = useSelector((state) => state.type.value);

     const handleClickOpen = () => {
          setOpen(true);
     };

     const handleClose = () => {
          setOpen(false);
     };

     //form validation

     const formSchema = Yup.object().shape({
          ProductName: Yup.string().required("Product Name Required"),
          ModelNumber: Yup.string().required("Model  Number Required"),
          Category: Yup.string().required("Category Required"),
          SubCategory: Yup.string().required("Sub Category Required"),
          Type: Yup.string().required("Type Required"),
          Stock: Yup.string().required("Stock Required"),
          LandingCost: Yup.string().required("LandingCost Required"),
          Profit: Yup.string().required("Profit Required"),
          Description: Yup.string().required("Description Required"),
     });

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm({
          mode: "onTouched",
          resolver: yupResolver(formSchema),
          reValidateMode: 'onChange',
          defaultValues: {},
     });

     const Submit = handleSubmit((data) => {
          axios.post(addProduct, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    setOpen(false);
               })
               .catch((err) => {
                    console.log(err);
               });
     });

     const handleChange = (event)=>{
            
            setCategory(event.target.value);
           

     }

     useEffect(()=>{
       const filterData =allSubCategory.filter((obj) => (obj.category == category));
        setSubCategory(filterData)
     },[category])
     
     
     return (
          <div>
               <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                    Add Products
               </Button>
               <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar sx={{ position: "relative" }}>
                         <Toolbar>
                              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                   <CloseIcon />
                              </IconButton>
                              <Box sx={{ flexGrow: "2" }} />

                              <Box sx={{ mr: 2, display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                                   <DashboardCustomizeIcon sx={{ fontSize: 31, color: "text.hint", pr: 1 }} />
                                   <Typography variant="h2" fontWeight="700" noWrap color="text.hint" component="div">
                                        ZETETIKOZ
                                   </Typography>
                                   <Typography sx={{ ml: 2, flex: 1 }} variant="h3" color="secondary" component="div">
                                        Add Products
                                   </Typography>
                              </Box>
                              <Box sx={{ flexGrow: "2" }} />

                              <Button autoFocus color="inherit" onClick={Submit}>
                                   Next
                              </Button>
                         </Toolbar>
                    </AppBar>

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

                                   <DialogContentText color="error">{errors.Category?.message}</DialogContentText>
                              </Grid>

                              <Grid item xs={4}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        Sub Category
                                   </DialogContentText>

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

                                   <DialogContentText color="error">{errors.SubCategory?.message}</DialogContentText>
                              </Grid>

                              <Grid item xs={4}>
                                   <DialogContentText variant="h3" color="text.hint">
                                        Type
                                   </DialogContentText>

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
                                        Profit %
                                   </DialogContentText>

                                   <TextField
                                        label="Profit"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        id="Profit"
                                        name="Profit"
                                        {...register("Profit", {
                                             required: "Profit %  Required",
                                        })}
                                   />

                                   <DialogContentText color="error">{errors.Profit?.message}</DialogContentText>
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
                                        })}
                                   />

                                   <DialogContentText color="error">{errors.Description?.message}</DialogContentText>
                              </Grid>
                         </Grid>
                    </Container>
               </Dialog>
          </div>
     );
};

export default AddProductButton;
