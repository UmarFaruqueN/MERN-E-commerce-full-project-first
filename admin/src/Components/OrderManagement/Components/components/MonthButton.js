import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
const MonthButton = (props) => {
     const [jan, setJan] = useState(true);
     const [feb, setFeb] = useState(true);
     const [mar, setMar] = useState(true);
     const [apr, setApr] = useState(true);
     const [may, setMay] = useState(true);
     const [jun, setJun] = useState(true);
     const [jul, setJul] = useState(true);
     const [aug, setAug] = useState(true);
     const [sep, setSep] = useState(true);
     const [oct, setOct] = useState(true);
     const [nov, setNov] = useState(true);
     const [dec, setDec] = useState(true);

     const Jan = () => {
          props.FilterByMonth("0");
          setJan(false);
          setFeb(true);
          setMar(true);
          setApr(true);
          setMay(true);
          setJun(true);
          setJul(true);
          setAug(true);
          setSep(true);
          setOct(true);
          setNov(true);
          setDec(true);
     };
     const Feb = () => {
          props.FilterByMonth("1");
          setJan(true);
          setFeb(false);
          setMar(true);
          setApr(true);
          setMay(true);
          setJun(true);
          setJul(true);
          setAug(true);
          setSep(true);
          setOct(true);
          setNov(true);
          setDec(true);
     };
     const Mar = () => {
          props.FilterByMonth("2");
          setJan(true);
          setFeb(true);
          setMar(false);
          setApr(true);
          setMay(true);
          setJun(true);
          setJul(true);
          setAug(true);
          setSep(true);
          setOct(true);
          setNov(true);
          setDec(true);
     };

     const Apr = () => {
          props.FilterByMonth("3");
          setJan(true);
          setFeb(true);
          setMar(true);
          setApr(false);
          setMay(true);
          setJun(true);
          setJul(true);
          setAug(true);
          setSep(true);
          setOct(true);
          setNov(true);
          setDec(true);
     };

     const May = () => {
          props.FilterByMonth("4");
          setJan(true);
          setFeb(true);
          setMar(true);
          setApr(true);
          setMay(false);
          setJun(true);
          setJul(true);
          setAug(true);
          setSep(true);
          setOct(true);
          setNov(true);
          setDec(true);
     };

     const Jun = () => {
          props.FilterByMonth("5");
          setJan(true);
          setFeb(true);
          setMar(true);
          setApr(true);
          setMay(true);
          setJun(false);
          setJul(true);
          setAug(true);
          setSep(true);
          setOct(true);
          setNov(true);
          setDec(true);
     };

     const Jul = () => {
          props.FilterByMonth("6");
          setJan(true);
          setFeb(true);
          setMar(true);
          setApr(true);
          setMay(true);
          setJun(true);
          setJul(false);
          setAug(true);
          setSep(true);
          setOct(true);
          setNov(true);
          setDec(true);
     };

     const Aug = () => {
          props.FilterByMonth("7");
          setJan(true);
          setFeb(true);
          setMar(true);
          setApr(true);
          setMay(true);
          setJun(true);
          setJul(true);
          setAug(false);
          setSep(true);
          setOct(true);
          setNov(true);
          setDec(true);
     };

     const Sep = () => {
          props.FilterByMonth("8");
          setJan(true);
          setFeb(true);
          setMar(true);
          setApr(true);
          setMay(true);
          setJun(true);
          setJul(true);
          setAug(true);
          setSep(false);
          setOct(true);
          setNov(true);
          setDec(true);
     };

     const Oct = () => {
          props.FilterByMonth("9");
          setJan(true);
          setFeb(true);
          setMar(true);
          setApr(true);
          setMay(true);
          setJun(true);
          setJul(true);
          setAug(true);
          setSep(true);
          setOct(false);
          setNov(true);
          setDec(true);
     };

     const Nov = () => {
          props.FilterByMonth("10");
          setJan(true);
          setFeb(true);
          setMar(true);
          setApr(true);
          setMay(true);
          setJun(true);
          setJul(true);
          setAug(true);
          setSep(true);
          setOct(true);
          setNov(false);
          setDec(true);
     };

     const Dec = () => {
          props.FilterByMonth("11");
          setJan(true);
          setFeb(true);
          setMar(true);
          setApr(true);
          setMay(true);
          setJun(true);
          setJul(true);
          setAug(true);
          setSep(true);
          setOct(true);
          setNov(true);
          setDec(false);
     };

     return (
          <>
               <Grid container>
                    <Grid
                         item
                         md={12}
                         sx={{
                              backgroundColor: "#ffffff",
                              display: "flex",
                              flexDirection:"column",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                         }}
                    >
                         <Grid item>
                              {" "}
                              {jan ? (
                                   <Button onClick={Jan} color="secondary">
                                        jan
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        jan
                                   </Button>
                              )}
                              {feb ? (
                                   <Button onClick={Feb} color="secondary">
                                        feb
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        feb
                                   </Button>
                              )}
                              {mar ? (
                                   <Button onClick={Mar} color="secondary">
                                        mar
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        mar
                                   </Button>
                              )}
                              {apr ? (
                                   <Button onClick={Apr} color="secondary">
                                        apr
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        apr
                                   </Button>
                              )}
                              {may ? (
                                   <Button onClick={May} color="secondary">
                                        may
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        may
                                   </Button>
                              )}
                              {jun ? (
                                   <Button onClick={Jun} color="secondary">
                                        jun
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        jun
                                   </Button>
                              )}
                              {jul ? (
                                   <Button onClick={Jul} color="secondary">
                                        jul
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        jul
                                   </Button>
                              )}
                              {aug ? (
                                   <Button onClick={Aug} color="secondary">
                                        aug
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        aug
                                   </Button>
                              )}
                              {sep ? (
                                   <Button onClick={Sep} color="secondary">
                                        sep
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        sep
                                   </Button>
                              )}
                              {oct ? (
                                   <Button onClick={Oct} color="secondary">
                                        oct
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        oct
                                   </Button>
                              )}
                              {nov ? (
                                   <Button onClick={Nov} color="secondary">
                                        nov
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        nov
                                   </Button>
                              )}
                              {dec ? (
                                   <Button onClick={Dec} color="secondary">
                                        dec
                                   </Button>
                              ) : (
                                   <Button disabled color="secondary">
                                        dec
                                   </Button>
                              )}
                         </Grid>
                    </Grid>
               </Grid>
          </>
     );
};

export default MonthButton;
