import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
     const navigate = useNavigate();
     useEffect(() => {
          const Token = localStorage.getItem("token");
          if (!Token) {
               navigate("/");
          }
     }, []);
     return <div>Search</div>;
}

export default Search;
