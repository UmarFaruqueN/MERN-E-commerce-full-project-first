import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleOffer } from "../../../utlis/Constants";
import { setOffers } from "../../../Redux";
import Swal from "sweetalert2";
import axios from "axios";

const CouponView = () => {
     const dispatch = useDispatch();

     const offerData = useSelector((state) => state.offers.value);

     const DeleteThis = (data) => {
          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!",
          }).then((result) => {
               if (result.isConfirmed) {
                    axios.post(deleOffer, data, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "success",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });

                              dispatch(setOffers({ offers: response.data.allOffer }));
                         })
                         .catch((err) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "error",
                                   title: err.response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   width: "15rem",
                              });
                              console.log(err.response.data.message);
                         });
               }
          });
     };

     return (
          <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                         <TableRow>
                              <TableCell align="left">Type</TableCell>
                              <TableCell align="left">Head</TableCell>
                              <TableCell align="left">Offer</TableCell>
                              <TableCell align="left">Minimum Purchase</TableCell>
                              <TableCell align="left">Code</TableCell>
                              <TableCell align="left">Expire On</TableCell>
                              <TableCell align="left"></TableCell>
                         </TableRow>
                    </TableHead>
                    <TableBody>
                         {offerData.map((obj) => (
                              <TableRow key={obj._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                  <TableCell align="left">{obj.title}</TableCell>
                                   <TableCell align="left">{obj.type}</TableCell>
                                   <TableCell align="left">{obj.offerAmount}</TableCell>
                                   <TableCell align="left">{obj.minimumPurchase}</TableCell>
                                   <TableCell align="left">{obj.type === "Coupon Code" ? obj._id : "N/A"}</TableCell>
                                   <TableCell align="left">{obj.type === "Coupon Code" ? obj.expireAt: "N/A"}</TableCell>
                                   <TableCell align="left">
                                        <IconButton
                                             onClick={() => {
                                                  DeleteThis(obj);
                                             }}
                                        >
                                             <Delete color="error" />
                                        </IconButton>
                                   </TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </TableContainer>
     );
};

export default CouponView;
