import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoginForm } from "./";
import CartPage from "../Components/Body/Cart/CartPage";

const Cart = () => {
     const dispatch = useDispatch();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (!Token) {
               dispatch(setLoginForm({loginForm:true}))
          }
     }, [dispatch]);
     return (
          <div>
               <CartPage />
          </div>
     );
};

export default Cart;
