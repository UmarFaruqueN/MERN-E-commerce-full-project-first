import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";




const useStyles = makeStyles({
     image: {
          width: "100%",
          height: "250px",
          borderRadius: "16px",
          marginTop: "60x",
     },
});
const Banner = () => {

     const data = useSelector((state)=>state.banners.value)
     const homeBanner = data.filter((obj)=>{
          return obj.for==="Home"
     })

    
     const classes = useStyles();
     return (
          <Box sx={{  height: "210px", width: "100%", top: "10%" }}>
               <Box>
                    <Carousel animationHandler={"fade"} showStatus={false} autoPlay={true} showThumbs={false} showArrows={true} infiniteLoop={true}>
                         {homeBanner?.map((obj) => (
                              <div key={obj._id}>
                                   <img  className={classes.image} src={obj.banner} alt="image1" />
                              </div>
                         ))}
                    </Carousel>
               </Box>
          </Box>
     );
};

export default Banner;
