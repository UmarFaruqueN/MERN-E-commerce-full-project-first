import React from "react";
import { Box } from "@mui/system";
import { Grid, Typography, IconButton, Button } from "@mui/material";

const FilterAndSort = (props) => {
     return (
          <>
               <Box height={"420px"} backgroundColor={"secondary.light"} pl={3}>
                    <Grid item pt={3}>
                         {" "}
                         <Typography variant="h3">Filter By Sub Category </Typography>
                    </Grid>
                    {props.subCat?.map((obj) => (
                         <Grid key={obj.index} item pt={1}>
                              <IconButton
                                   onClick={() => {
                                        props.Filter(obj.subCategory);
                                   }}
                              >
                                   <Typography variant="h4"> {obj.subCategory} </Typography>
                              </IconButton>
                         </Grid>
                    ))}

                    <Grid item pt={1}>
                         <Button color="secondary" variant="contained" onClick={props.ClearFilter}>
                              {" "}
                              Clear Filter
                         </Button>
                    </Grid>

                    <Grid item pt={3}>
                         <Typography variant="h3"> Sort By Price</Typography>
                    </Grid>

                    <Grid item pt={1}>
                         <IconButton
                              onClick={() => {
                                   props.Sort("lowest");
                              }}
                         >
                              <Typography variant="h4">  Highest to low </Typography>
                         </IconButton>
                    </Grid>
                    <Grid item pt={1}>
                         <IconButton
                              onClick={() => {
                                   props.Sort("highest");
                              }}
                         >
                              <Typography variant="h4"> Lowest to High</Typography>
                         </IconButton>
                    </Grid>
                    <Grid item>
                         <IconButton>
                              <Typography
                                   onClick={() => {
                                        props.Sort("");
                                   }}
                                   variant="h4"
                              >
                                   {" "}
                                   Popularity
                              </Typography>
                         </IconButton>
                    </Grid>
               </Box>
          </>
     );
};

export default FilterAndSort;
