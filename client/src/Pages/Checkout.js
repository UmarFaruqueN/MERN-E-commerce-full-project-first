import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import { setLoginForm } from "../Redux";

import CheckOutPage from "../Components/Body/Checkout/CheckOutPage";

function Checkout() {
     const dispatch = useDispatch();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (!Token) {
               dispatch(setLoginForm({loginForm:true}))
          }
     }, [dispatch]);
    
     return (
          <>
               <CheckOutPage />
          </>
     );
}

export default Checkout;
