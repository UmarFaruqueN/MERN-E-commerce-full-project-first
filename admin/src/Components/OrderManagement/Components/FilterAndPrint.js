import React, { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import MonthButton from "./components/MonthButton";





const FilterAndPrint = (props) => {
    const [show , setShow]=useState(false)

    const Monthly=()=>{    
        setShow(true)
    }
    const Clear=()=>{
        props.FilterByMonth("")
        props.setData(false)
        setShow(false)
    }
     return (
          <>
               <Grid container pb={2}>
                    <Grid
                         item
                         md={12}
                         sx={{
                              backgroundColor: "#ffffff",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              pl: 2,
                              pr: 2,
                         }}
                    >
                         <Grid item sx={{ display: "flex", alignItems: "center" }}>
                              <Grid item>
                                   {" "}
                                   <Typography variant="h4"> Filter By:</Typography>
                              </Grid>
                              <Grid item>
                                   {" "}
                                   <Button  onClick={Monthly} color="secondary" size="small">
                                        Monthly
                                   </Button>
                              </Grid>
                              {/* <Grid item>
                                   {" "}
                                   <Button color="secondary" size="small">
                                        Weekly
                                   </Button>
                              </Grid> */}
                            {show?  <Grid item>
                                   {" "}
                                   <Button onClick={Clear} color="error" size="small">
                                        Clear Filter
                                   </Button>
                              </Grid>:""}
                         </Grid>

                         <Grid item sx={{ display: "flex" }}>
                              <Grid item>
                                   <IconButton onClick={props.DownloadPdf}>
                                        <PictureAsPdfIcon color="secondary" />
                                   </IconButton>
                              </Grid>
                              <Grid item>
                                   <IconButton onClick={props.DownloadExcel}>
                                        {" "}
                                        <CloudDownloadIcon color="secondary" />
                                   </IconButton>
                              </Grid>
                         </Grid>
                    </Grid>
               </Grid>
               {show?<MonthButton FilterByMonth={props.FilterByMonth} />:""}
          </>
     );
};

export default FilterAndPrint;
