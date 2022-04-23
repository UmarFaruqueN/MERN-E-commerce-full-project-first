import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";


const useStyles = makeStyles({
     image: {
          width: "100%",
          height: "300px",
     },
});

const ImageCarousel = (props) => {
     const classes = useStyles();
     return (
          <Box
               sx={{
                    height: "500px",
                    display: "flex",
                    alignItems: "center",
                    
               }}
          >
               <Box sx={{backgroundColor:"whitesmoke"}}>
                    <Carousel showThumbs={false} showArrows={true} infiniteLoop={true}>
                         {props.images?.map((obj) => (
                              <div key={props.images.index}>
                                   <img key={props.images.index} className={classes.image} src={obj} alt="image1" />
                              </div>
                         ))}
                    </Carousel>
               </Box>
          </Box>
     );
};

export default ImageCarousel;
