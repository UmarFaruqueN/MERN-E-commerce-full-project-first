import { Grid , Typography } from "@mui/material";

const ProductPrice = (props) => {
     return (
          <>
               <Grid item>
                    <Typography variant="h3"> Price ₹ {props.price} /-</Typography>
               </Grid>{" "}
          </>
     );
};

export default ProductPrice;
