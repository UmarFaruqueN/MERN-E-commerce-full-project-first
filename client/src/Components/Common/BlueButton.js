import React from 'react';
import { Button } from '@mui/material';




const BlueButton=(props)=> {


  return (
      <>
      <Button  sx={{marginLeft:"10px"}} variant="contained" color="secondary">{props.title}</Button>
      </>
    
  )
}

export default BlueButton