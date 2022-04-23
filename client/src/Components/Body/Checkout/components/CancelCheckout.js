import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CancelCheckout = () => {
     const navigate = useNavigate();

     const Submit = () => {
          Swal.fire({
               title: "Are You Sure?",
               text: "Do You Want To  Cancel This Order !",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, Cancel!",
          }).then((result) => {
               if (result.isConfirmed) {
                    navigate(-1);
                    Swal.fire({
                        position: "bottom-end",
                        icon: "success",
                        title: "Order Canceled",
                        showConfirmButton: false,
                        timer: 1500,
                        width: "15rem",
                   });
               }
          });
     };
     return (
          <>
               <Button  onClick={Submit} variant="contained" color="error"> Cancel This Order</Button>
          </>
     );
};
export default CancelCheckout;
