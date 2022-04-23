import React, { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import { updateType, setType } from "../../";

const EditTypeDialouge = (props) => {
     const [open, setOpen] = useState(false);
     const dispatch = useDispatch();
     //form validation

     const formSchema = Yup.object().shape({
          type: Yup.string().required("Type required"),
     });

     const {
          register,
          formState: { errors },
          handleSubmit,
     } = useForm({
          mode: "onTouched",
          resolver: yupResolver(formSchema),
          defaultValues: {
               type: props.data.type,
               _id: props.data._id,
          },
     });

     //form validation ends here

     const Submit = handleSubmit((data) => {
          console.log(data);
          axios.post(updateType, data, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    Swal.fire({
                         position: "bottom-end",
                         icon: "success",
                         text: response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         height: "5rem",
                         width: "15rem",
                    });
                    console.log(response);

                    dispatch(setType({ type: response.data.typeData }));
                    setOpen(false);
               })
               .catch((err) => {
                    Swal.fire({
                         position: "bottom-end",
                         icon: "error",
                         text: err.response.data.message,
                         showConfirmButton: false,
                         timer: 1500,
                         height: "5rem",
                         width: "15rem",
                    });
                    console.log(err.response.data.message);
               });
     });

     const handleClickOpen = () => {
          setOpen(true);
     };

     return (
          <div>
               <EditIcon cursor="pointer" onClick={handleClickOpen} color="secondary" />
               <Dialog open={open} onClose={Submit}>
                    <DialogTitle>Edit Type</DialogTitle>
                    <DialogContent color="secondary">
                         <DialogContentText color="secondary">Type</DialogContentText>

                         <div className="form-group mb-3">
                              <TextField
                                   label="Type"
                                   color="secondary"
                                   margin="normal"
                                   fullWidth
                                   id="type"
                                   name="type"
                                   {...register("type", {
                                        required: "Type Required",
                                   })}
                              />

                              <DialogContentText color="error">{errors.type?.message}</DialogContentText>
                         </div>
                    </DialogContent>
                    <DialogActions>
                         <Button
                              color="secondary"
                              cursor="pointer"
                              onClick={() => {
                                   setOpen(false);
                              }}
                         >
                              Cancel
                         </Button>
                         <Button color="secondary" cursor="pointer" onClick={Submit}>
                              Submit
                         </Button>
                    </DialogActions>
               </Dialog>
          </div>
     );
};

export default EditTypeDialouge;
