import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import EditDetails from "./EditDetails";
import { editName, editEmail,editPhone} from "../../../../../utlis/Constants";
import axios from "axios";
import EditPassword from "./EditPassword";

const EditUserDetail = (props) => {
    useEffect(()=>{
        axios.post()
    },[])
     const userData = useSelector((state) => state.userData.value);
     const [userName, setUserName] = useState(false);
     const [userPhone, setUserPhone] = useState(false);
     const [userEmail, setUserEmail] = useState(false);
     const [userPassword, setPassword] = useState(false);

     const Name = () => {
          setUserName(true);
          setUserPhone(false);
          setUserEmail(false);
          setPassword(false);
     };
     const Phone = () => {
          setUserName(false);
          setUserPhone(true);
          setUserEmail(false);
          setPassword(false);
     };
     const Email = () => {
          setUserName(false);
          setUserPhone(false);
          setUserEmail(true);
          setPassword(false);
     };
     const Password = () => {
          setUserName(false);
          setUserPhone(false);
          setUserEmail(false);
          setPassword(true);
     };

     const Cancel = () => {
          setUserName(false);
          setUserPhone(false);
          setUserEmail(false);
          setPassword(false);
     };
     return (
          <>
               <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                    <Grid item sx={{ display: "flex", alignItems: "baseline", pb: 2, justifyContent: "space-between" }}>
                         <Grid item>
                              <Grid item pb={2}>
                                   <Typography color="text.disabled" variant="h4">
                                        Name
                                   </Typography>
                              </Grid>
                              <Grid item>
                                   {userName ? (
                                        <EditDetails setUp={props.setUp} data={userData?.name} route={editName} Cancel={Cancel} type={"text"} />
                                   ) : (
                                        <Typography variant="h4">{userData?.name}</Typography>
                                   )}
                              </Grid>
                         </Grid>

                        {userName?"": <Grid item>
                              <Button onClick={Name} size="small" color="secondary">
                                   edit
                              </Button>
                         </Grid>}
                    </Grid>
                    <Divider />
                    <Grid item sx={{ display: "flex", alignItems: "baseline", pb: 2, justifyContent: "space-between" }}>
                         <Grid item>
                              <Grid item pb={2}>
                                   <Typography color="text.disabled" variant="h4">
                                        Phone
                                   </Typography>
                              </Grid>
                              <Grid item>
                              {userPhone?<EditDetails data={userData?.phone} route={editPhone} Cancel={Cancel} type={"number"} />:
                                   <Typography variant="h4">{userData?.phone}</Typography>}
                              </Grid>
                         </Grid>
                         <Grid item>
                         {userPhone?"":
                              <Button onClick={Phone} size="small" color="secondary">
                                   edit
                              </Button>}
                         </Grid>
                    </Grid>
                    <Divider />
                    <Grid item sx={{ display: "flex", alignItems: "baseline", pb: 2, justifyContent: "space-between" }}>
                         <Grid item>
                              <Grid item pb={2}>
                                   <Typography color="text.disabled" variant="h4">
                                        Email
                                   </Typography>
                              </Grid>
                              <Grid item>
                                  {userEmail?<EditDetails data={userData?.email} route={editEmail} Cancel={Cancel} type={"email"} />
                                  : <Typography variant="h4">{userData?.email}</Typography>}
                              </Grid>
                         </Grid>
                         <Grid item>
                         {userEmail?"":
                              <Button onClick={Email} size="small" color="secondary">
                                   edit
                              </Button>}
                         </Grid>
                    </Grid>
                    <Divider />
                    <Grid item sx={{ display: "flex", alignItems: "baseline", pb: 2, justifyContent: "space-between" }}>
                         <Grid item>
                              <Grid item pb={2}>
                                   <Typography color="text.disabled" variant="h4">
                                        Password
                                   </Typography>
                              </Grid>
                              <Grid item>
                                   {userPassword?
                                   <EditPassword Cancel={Cancel}/>:
                                   <Typography variant="h4">****</Typography>}
                              </Grid>
                         </Grid>
                         <Grid item>
                         {userPassword?"":
                              <Button onClick={Password} size="small" color="secondary">
                                   edit
                              </Button>}
                         </Grid>
                    </Grid>
                    <Divider />
               </Grid>
          </>
     );
};

export default EditUserDetail;
