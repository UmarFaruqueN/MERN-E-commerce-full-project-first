import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductListing from "../Components/Body/ProductListing/ProductListing";
import { getProductsbyCat } from "../utlis/Constants";
const subCa=  [{subCategory:"Turbo HD Camera"},{subCategory:"DVR"} ]
const TurboHDDevices=()=> {
  const [data, setData] = useState([]);
     useEffect(() => {
          axios.get(getProductsbyCat,{ headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log(response.data.HD);
                    setData(response.data.HD);
               })
               .catch((err) => {
                    console.log(err);
               });
     }, []);
  return (
    <ProductListing Data={data}subCa={subCa} Category={"Analogue Devices"}/>
  )
}

export default TurboHDDevices


