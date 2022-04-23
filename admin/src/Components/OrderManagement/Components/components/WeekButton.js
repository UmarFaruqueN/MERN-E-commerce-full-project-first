import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const WeekButton = (props) => {
     const [weekNumber, setWeekNumber] = useState(0);

     const Left = () => {
          if (weekNumber === 0) {
               const weekNum = props.allOrders[0].weekNumber;
               setWeekNumber(weekNum);
               props.FilterByWeek(weekNum - 1);
          }
          props.FilterByWeek(weekNumber - 1);
     };
     const Right = () => {
          if (weekNumber === 0) {
               const weekNum = props.allOrders[0].weekNumber;
               setWeekNumber(weekNum);
               props.FilterByWeek(weekNum + 1);
          }
          props.FilterByWeek(weekNumber + 1);
     };
     return (
          <>
               <Grid container>
                    <Grid
                         item
                         md={12}
                         sx={{
                              backgroundColor: "#ffffff",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                         }}
                    >
                         <Grid item sx={{ display: "flex", alignItems: "center", p: 1 }}>
                              <Grid item>
                                   {" "}
                                   <IconButton onClick={Left}>
                                        {" "}
                                        <KeyboardArrowLeftIcon color="secondary" />
                                   </IconButton>
                              </Grid>
                              <Grid item>
                                   <Typography>Week Number {props.w}</Typography>
                              </Grid>
                              <Grid item>
                                   {" "}
                                   <IconButton onClick={Right}>
                                        {" "}
                                        <KeyboardArrowRightIcon color="secondary" />
                                   </IconButton>
                              </Grid>
                         </Grid>
                    </Grid>
               </Grid>
          </>
     );
};

export default WeekButton;
