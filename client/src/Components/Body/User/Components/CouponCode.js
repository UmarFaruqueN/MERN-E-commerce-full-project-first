import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCoupon } from "../../../../utlis/Constants";
import axios from "axios";

const CouponCode = () => {
     const [coupon, setCoupon] = useState([]);
     const [su, setSu] = useState(null);
     useEffect(() => {
          axios.get(getCoupon, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    setCoupon(response.data.couponData);
               })
               .catch((err) => {
                    console.log(err);
                    console.log(err?.response?.data?.message);
               });
     }, []);

     function copy(data) {
          const el = document.createElement("input");
          el.value = data;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
          setSu("Coupon Code Copied");
          setTimeout(() => {
               setSu("");
          }, 500);
     }
     return (
          <Grid item pt={2}>
               <Grid item sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {" "}
                    <Typography color="error" variant="h3">
                         OFFERS
                    </Typography>
               </Grid>
               <Grid item sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography color="rgba(76,228,83,0.89)" sx={{ fontSize: 16 }}>
                         {su}
                    </Typography>
               </Grid>

               {coupon?.map((obj) => (
                    <Grid
                         key={obj._id}
                         item
                         sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    >
                         {" "}
                         <Typography>
                              {" "}
                              Buy {obj.minimumPurchase} ₹ Get {obj.offerAmount} ₹{" "}
                         </Typography>
                         <Button onClick={() => copy(obj._id)} color="success" sx={{ fontSize: 14 }}>
                              Code
                         </Button>
                    </Grid>
               ))}
          </Grid>
     );
};

export default CouponCode;
