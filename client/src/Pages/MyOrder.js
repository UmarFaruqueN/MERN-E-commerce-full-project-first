import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoginForm } from "../Redux";


import MyOrderPage from "../Components/Body/User/MyOrder/MyOrderPage";

const MyOrder = () => {
     const dispatch = useDispatch();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (!Token) {
               dispatch(setLoginForm({loginForm:true}))
          }
     }, [dispatch]);
     return (
          <>
               <MyOrderPage />{" "}
          </>
     );
};

export default MyOrder;
