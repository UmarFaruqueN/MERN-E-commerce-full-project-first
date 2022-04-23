import React, { useState } from "react";
import { Button, Select, MenuItem } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { updateOrder } from "../../../utlis/Constants";
import Swal from "sweetalert2";
import { setOrders } from "../../../Redux";
import { useDispatch } from "react-redux";

const StatusUpdation = (props) => {
     const dispatch = useDispatch();
     const [options, setOptions] = useState(false);
     const [btn, setBtn] = useState(true);
     const [progress, setProgress] = useState(false);

     const handleChange = (obj) => {
          setOptions(false);
          setProgress(true);
          const tempDate =new Date()
          const updateDate = tempDate.toLocaleString();
          const _id = props.data._id;
          const data = { _id: _id, status: obj,updateDate:updateDate };

          console.log(data);
          axios.post(updateOrder, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setOrders({ orders: response.data.allOrders }));
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         text: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         width: "15rem",
                    });
                    setProgress(false);
                    setBtn(true);
               })
               .catch((err) => {
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
                    setProgress(false);
                    setBtn(true);
                    console.log(err?.response?.data?.message);
               });
     };

     const Open = () => {
          setOptions(true);
          setBtn(false);
     };

     return (
          <>
               {progress ? <CircularProgress size={20} color="secondary" /> : ""}
               {options ? (
                    <Select color="secondary" margin="normal" size="small" fullWidth id="status" name="status">
                         <MenuItem onClick={() => handleChange("Item Shipped")} value="Shipped">
                              Item Shipped
                         </MenuItem>
                         <MenuItem onClick={() => handleChange("Item Delivered")} value="Delivered">
                              Item Delivered
                         </MenuItem>
                         <MenuItem onClick={() => handleChange("Canceled by Store")} value="Canceled">
                              Item Canceled
                         </MenuItem>
                    </Select>
               ) : (
                    ""
               )}

               {btn ? (
                    <>
                         {props.data.orderStatus === "User Ordered" ? (
                              <Button onClick={Open} size="small" color="warning">
                                   {" "}
                                   User Ordered
                              </Button>
                         ) : (
                              ""
                         )}

                         {props.data.orderStatus === "Canceled by Store" ? (
                              <Button onClick={Open} size="small" color="error">
                                   {" "}
                                   Item Canceled
                              </Button>
                         ) : (
                              ""
                         )}

                         {props.data.orderStatus === "Item Shipped" ? (
                              <Button onClick={Open} size="small" color="secondary">
                                   {" "}
                                   Item Shipped
                              </Button>
                         ) : (
                              ""
                         )}
                         {props.data.orderStatus === "Item Delivered" ? (
                              <Button onClick={Open} size="small" color="success">
                                   {" "}
                                   Item Delivered
                              </Button>
                         ) : (
                              ""
                         )}

                         {props.data.orderStatus === "User Cancelled" ? (
                              <Button size="small" color="error" disabled>
                                   {" "}
                                   User Cancelled
                              </Button>
                         ) : (
                              ""
                         )}
                    </>
               ) : (
                    ""
               )}
          </>
     );
};

export default StatusUpdation;
