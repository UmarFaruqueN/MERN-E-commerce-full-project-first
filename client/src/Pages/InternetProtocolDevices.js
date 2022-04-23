import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductListing from "../Components/Body/ProductListing/ProductListing";
import { getProductsbyCat } from "../utlis/Constants";
const subCa = [{ subCategory: "IP Camera" }, { subCategory: "NVR" }];

const InternetProtocolDevices = () => {
     const [data, setData] = useState([]);
     useEffect(() => {
          axios.get(getProductsbyCat,{ headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log(response.data.IP);
                    setData(response.data.IP);
               })
               .catch((err) => {
                    console.log(err);
               });
     }, []);
     return <ProductListing Data={data} subCa={subCa} Category={"Network Devices"} />;
};

export default InternetProtocolDevices;
