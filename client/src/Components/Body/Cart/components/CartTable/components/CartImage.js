import { Grid } from '@mui/material'
import React from 'react'



const CartImage=(props)=> {
  return (
    <>
<Grid container>
    <Grid item sx={{backgroundColor:"whitesmoke", height:"120px", width:"150px"}}>
        <img height="120px" width="150px" src={props.image} alt="cartimage" />
        
         </Grid>
    

</Grid>

    </>
  )
}

export default CartImage