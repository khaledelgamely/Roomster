

import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import image from "../../assets/wallpaperflare.com_wallpaper.jpg";

import { motion, AnimatePresence } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import './Header.css'
import { Link } from "react-router-dom";

export function Header() {
  const xsMotion = {
    initial: { x: -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 0, opacity: 0 },
  };

  const smMotion = {
    initial: { x: -400, opacity: 0 },
    animate: { x: -170, opacity: 1 },
    exit: { x: -200, opacity: 0 },
  };

  const mdMotion = {
    initial: { x: -600, opacity: 0 },
    animate: { x: -310, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  const lgMotion = {
    initial: { x: -600, opacity: 0 },
    animate: { x: -580, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let motionProps;
  if (windowWidth <= 576) {
    motionProps = xsMotion;
  } else if (windowWidth <= 768) {
    motionProps = smMotion;
  } else if (windowWidth <= 1500) {
    motionProps = mdMotion;
  } else {
    motionProps = lgMotion;
  }
  return (
    <Box
      sx={{
        display: "flex",
        height: {
          xs: "auto",
          lg: "80vh",
        },
        mx: {
          xs: "20px",
          lg: "50px",
        },
        mb: 12,
        
      }}
    >
      <Box
        sx={{
          width: {
            xs: "0",
            sm: "30%",
          },
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>

      <Box
        sx={{
          width: {
            xs: "100%",
            lg: "90%",
          },
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: "10px",
          mt: {
            xs: 5,
            lg: 0,
          },
        }}
      >
        <AnimatePresence>
          <motion.div
            initial={mdMotion.initial}
            animate={mdMotion.animate}
            transition={{ delay: 0.7, duration: 0.3 }}
            exit={mdMotion.exit}
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
            }}
            {...(window.innerWidth <= 576 && xsMotion)}
            {...(window.innerWidth > 576 &&
              window.innerWidth <= 768 &&
              smMotion)}
            {...(window.innerWidth > 768 && mdMotion)}
            {...(window.innerWidth > 1500 && lgMotion)}
          >
            <Typography
              variant="h2"
              component="h1"
              color="white"
              align="center"
              sx={{
                backgroundColor: "rgb(255,255,255,0.8)",
                position: "relative",
                zIndex: 1,
                color: "rgb(38, 38, 38)",
                fontFamily: "jost",
                fontWeight: "700",
                lineHeight: {
                  xs: "32px",
                  lg: "60px",
                },
                fontSize: {
                  xs: "20px",
                  sm: "30px",
                  md: "35px",
                  lg: "48px;",
                },
                textAlign: "left",
                width: {
                  lg: "800px",
                  sm: "82%",
                  md: "90%",
                  xs: "90%",
                },
                height: {
                  lg: "95%",
                  sm: "85%",
                  xs: "70%",
                },
                my: 3,
                borderRadius: "10px",
                padding: "30px",
              }}
            >
              Book your stay & <br />
              enjoy a luxury experience
              <motion.div
                initial={{ y: -0, x: -500, opacity: 0 }}
                animate={{ y: -0, x: -0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                exit={{ x: -100, opacity: 0 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  color="white"
                  align="center"
                  sx={{
                    color: "rgb(38, 38, 38)",
                    fontFamily: "jost",
                    fontWeight: "200",
                    lineHeight: {
                      xs: "20px",
                      lg: "35px",
                    },
                    fontSize: {
                      xs: "10px",
                      sm: "16px",
                      lg: "22px",
                    },
                    textAlign: "left",
                    my: {
                      xs: 0,
                      sm: 3,
                    },
                  }}
                >
                  Book your dream room or apartment today and experience <br />{" "}
                  the ultimate comfort and convenience.
                </Typography>
              </motion.div>
              <Link to="/Book"> 
               <Button className="button" 
                sx={{
                  color: "#fff",
                  minWidth: {
                    xs: "25%",
                    sm: "40%",
                  },
                  height:  "25%" ,
                  transition:" all 1000ms",

                  backgroundColor: "#000",
                  fontFamily: "jost",
                  fontWeight: "200",
                  lineHeight: {
                    xs: "20px",
                    lg: "35px",
                  },
                  fontSize: {
                    xs: "8px",
                    sm: "16px",
                    md: "20px",
                    lg: "26px",
                  },
                  textAlign: "left",
                  my: 3,

          
                }}
              >
                Get Explore
              </Button> 
              </Link> 
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
