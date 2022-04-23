import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductAddForm from "../Components/ProductManagement/Components/ProductAddForm";

const AddProducts = () => {
     const navigate = useNavigate();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (!Token) {
               navigate("/");
          }
     }, [navigate]);
     return <ProductAddForm />;
};

export default AddProducts;
