import React from 'react'
import {Grid , Divider, Typography, IconButton} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

const TitleBar=(props) =>{
  return (
      <>
    <Grid
    width="100%"
    height="50px"
    sx={{ backgroundColor: "#0156ff", display: "flex", alignItems: "center" , justifyContent:"space-between" }}
>
  <Grid item sx={{display:"flex",}}>
    <Typography pl={2} color="primary" variant="h3">
         {" "}
         {props.number}
    </Typography>
    <Typography pl={2} color="primary" variant="h3">
         {" "}
         {props.title}{" "}
    </Typography>
    </Grid>
    <Grid item> <IconButton onClick={props.addAddress} color='primary'>{props.btn?<AddIcon/>:""} </IconButton></Grid>
</Grid>
<Divider />
</>
  )
}

export default TitleBar