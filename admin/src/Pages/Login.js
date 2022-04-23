import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopHeader, LoginForm } from "../Components";

const Login = () => {
     const navigate = useNavigate();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (Token) {
               navigate("/userManagement");
          }
     }, [navigate]);
     return (
          <>
               <TopHeader />
               <LoginForm />
          </>
     );
};

export default Login;
