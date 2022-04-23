import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
     const navigate = useNavigate();

     const handleClickLogout = () => {
          localStorage.removeItem("token");
          navigate("/");
     };

     return (
          <div>
               <Button onClick={handleClickLogout} color="secondary">
                    Logout
               </Button>
          </div>
     );
};

export default LogOutButton;
