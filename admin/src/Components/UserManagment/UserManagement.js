import React, { useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { getUsers, updateUserStatus, deleteUser, EditUser, setUserData } from "./";

const UserManagement = () => {
     const dispatch = useDispatch();
     const userData = useSelector((state) => state.userData.value);

     useEffect(() => {
          axios.get(getUsers, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    dispatch(setUserData({ userData: response.data.userData }));
               })
               .catch((err) => {
                    alert(err.data.message);
               });
     }, [dispatch]);

     const Submit = (userInfo) => {
          Swal.fire({
               title: "Are you sure?",
               text: "Do You want to Update User Status!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, Update User!",
          }).then((result) => {
               if (result.isConfirmed) {
                    axios.post(updateUserStatus, userInfo, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              const userStatus = response.data.userStatus;

                              dispatch(setUserData({ userData: response.data.userData }));

                              userStatus?.active
                                   ? Swal.fire({
                                          position: "bottom-end",
                                          icon: "error",
                                          title: "Blocked",
                                          showConfirmButton: false,
                                          timer: 1500,
                                          height: "5rem",
                                          width: "15rem",
                                     })
                                   : Swal.fire({
                                          position: "bottom-end",
                                          icon: "success",
                                          title: "UnBlocked",
                                          showConfirmButton: false,
                                          timer: 1500,
                                          height: "5rem",
                                          width: "15rem",
                                     });
                         })
                         .catch((err) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "error",
                                   title: err.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   height: "5rem",
                                   width: "15rem",
                              });
                         });
               }
          });
     };

     const DeleteUser = (userInfo) => {
          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!",
          }).then((result) => {
               if (result.isConfirmed) {
                    axios.post(deleteUser, userInfo, { headers: { "Content-Type": "application/json" } })
                         .then((response) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "error",
                                   title: response.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   height: "5rem",
                                   width: "15rem",
                              });
                              dispatch(setUserData({ userData: response.data.userData }));
                              console.log(userData);
                         })
                         .catch((err) => {
                              Swal.fire({
                                   position: "bottom-end",
                                   icon: "error",
                                   title: err.data.message,
                                   showConfirmButton: false,
                                   timer: 1500,
                                   height: "5rem",
                                   width: "15rem",
                              });
                         });
               }
          });
     };

     return (
          <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                         <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="left">Email</TableCell>
                              <TableCell align="center">Number</TableCell>
                              <TableCell align="center">Status</TableCell>
                              <TableCell align="center">Block/Unblock</TableCell>
                              <TableCell align="center">Edit</TableCell>
                              <TableCell align="center">Delete</TableCell>
                         </TableRow>
                    </TableHead>
                    <TableBody>
                         {userData.map((user) => (
                              <TableRow key={user._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                   <TableCell component="th" scope="row">
                                        {user.name}
                                   </TableCell>
                                   <TableCell align="left">{user.email}</TableCell>
                                   <TableCell align="center">{user.phone}</TableCell>

                                   <TableCell align="center">{user.active ? "Active" : "Blocked"}</TableCell>
                                   <TableCell align="center">
                                        {user.active ? (
                                             <BlockIcon
                                                  cursor="pointer"
                                                  color="error"
                                                  onClick={() => {
                                                       Submit(user);
                                                  }}
                                             />
                                        ) : (
                                             <DoneIcon
                                                  cursor="pointer"
                                                  color="success"
                                                  onClick={() => {
                                                       Submit(user);
                                                  }}
                                             />
                                        )}
                                   </TableCell>

                                   <TableCell align="center">
                                        <EditUser data={user} />
                                   </TableCell>

                                   <TableCell align="center">
                                        <DeleteIcon
                                             onClick={() => {
                                                  DeleteUser(user);
                                             }}
                                             cursor="pointer"
                                             color="error"
                                        />
                                   </TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </TableContainer>
     );
};

export default UserManagement;
