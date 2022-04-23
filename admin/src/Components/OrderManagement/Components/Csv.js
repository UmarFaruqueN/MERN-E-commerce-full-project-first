import React from 'react'
import { CSVDownload } from "react-csv";


const Csv=(props)=> {
  return (
    <>
    <CSVDownload data={props.data} target="_blank" />;
    </>
  )
}

export default Csv