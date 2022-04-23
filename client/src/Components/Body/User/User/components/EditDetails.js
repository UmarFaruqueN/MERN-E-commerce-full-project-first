import { Button, TextField, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { setUserData } from "../../../../../Redux";
import { useDispatch } from "react-redux";

const EditDetails = (props) => {
     const user = localStorage.getItem("user");
     const dispatch = useDispatch();
     const [data, setData] = useState(null);
     const [su, setSu] = useState(null);
     const [er, setEr] = useState(null);

     const Submit = () => {
          const allData = {
               update: data,
               user: user,
          };
          console.log(allData);
          axios.post(props.route, allData, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setUserData({ userData: response.data.userData }));
                    console.log(response);
                    setSu(response.data.message);
                    setTimeout(() => {
                         setSu(null);
                         props.Cancel();
                    }, 1000);
                    setEr(null);
                    props.setUp(50)
               })
               .catch((err) => {
                    setSu(null);
                    console.log(err.response.data.message);
                    setEr(err?.response?.data?.message);
                    props.setUp(55)
               });
     };

     return (
          <>
               <Grid item sx={{ display: "flex" }}>
                    {" "}
                    <Grid item>
                         {er ? (
                              <Typography variant="h4" color="error">
                                   {er}
                              </Typography>
                         ) : (
                              ""
                         )}
                         {su ? (
                              <Typography variant="h4" color="rgba(76,228,83,0.89)">
                                   {su}
                              </Typography>
                         ) : (
                              ""
                         )}

                         <TextField
                              onChange={(e) => {
                                   setData(e.target.value);
                              }}
                              type={props.type}
                              defaultValue={props.data}
                              size="small"
                         />
                    </Grid>
                    <Grid item>
                         <Button onClick={Submit} size="small" color="secondary">
                              Submit
                         </Button>
                    </Grid>
                    <Grid item>
                         <Button onClick={() => props.Cancel()} size="small" color="error">
                              Cancel
                         </Button>
                    </Grid>
               </Grid>
          </>
     );
};

export default EditDetails;
