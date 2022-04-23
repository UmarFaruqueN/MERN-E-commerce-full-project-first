import { Grid } from '@mui/material';
import React from 'react';
import { useTimer } from 'react-timer-hook';

const MyTimer=({ expiryTimestamp })=> {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
  ///  start,
   // pause,
  //  resume,
  //  restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
   
      <Grid item>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </Grid>
      
  
  );
}

export default MyTimer