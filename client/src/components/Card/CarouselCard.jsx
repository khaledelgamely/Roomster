import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

// mui icons
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// 3rd party
import SwipeableViews from "react-swipeable-views";
// react icons
import { AiFillStar, AiFillHeart, AiTwotoneDelete } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import {
  flexBetween,
  dFlex,
  carouselDot,
  fixedIcon,
  carouselImage,
  fixedBottom,
} from "../../theme/commonStyles.jsx";
import "./CarouselCard.css";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite, addFavorite } from "../../store/Slices/userSlice.jsx";
import { useNavigate } from "react-router";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import CurrencySign from "../../utils/CurrencySign.jsx";
// eslint-disable-next-line react/prop-types
const CarouselCard = ({ location }) => {
  const navigate = useNavigate();
  const SignySelector = useSelector((state) => state.currency.selected);
  const currencySelector = useSelector((state) => state.currency.currency);
  const { user } = useSelector((state) => {
    return state.user;
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const favoriteList = useSelector((state) => {
    return state.user?.user?.favourites;
  });
  const [isFavorite, setIsFavorite] = React.useState(
    favoriteList?.find((favorite) => favorite._id === location._id)
  );
  // console.log(favoriteList);
  const maxSteps = location.images.length;
  //? to check for we in wish list page
  const wishListPage = window.location.pathname === "/wishlist";
  const dispatch = useDispatch();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // jumps when we click the next arrow
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // when we click the back arrow
  };

  const handleStepChange = (step) => {
    setActiveStep(step); // handle swipe change
  };

  const Like = () => {
    // dispatch(addFavorite({ userId: user._id, locationId: location._id }));
    dispatch(addFavorite({ userId: user._id, location: location }));
    setIsFavorite((prev) => !prev);
  };
  const disLike = () => {
    // dispatch(deleteFavorite({ userId: user._id, locationId: location._id }));
    dispatch(deleteFavorite({ userId: user._id, location: location }));
    setIsFavorite((prev) => !prev);
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want delete review",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(
            deleteFavorite({ userId: user._id, location: location })
          );
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
          e.target.closest(".reviewCard").remove();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Box
        className="carouselCard"
        sx={{
          flexGrow: 1,
          position: "relative",
        }}
      >
        <Box sx={fixedIcon} style={{ cursor: "pointer" }}>
          {wishListPage ? (
            <AiTwotoneDelete
              size={30}
              fill="#8e0707"
              onClick={(e) => handleDelete()}
            />
          ) : isFavorite ? (
            <AiFillHeart
              size={24}
              color="#fff"
              fill="#b12929"
              onClick={(e) => disLike()}
            />
          ) : (
            <FaRegHeart
              size={24}
              color="#fff"
              onClick={(e) => {
                if (user._id === "") {
                  navigate("/login");
                } else {
                  Like();
                }
              }}
            />
          )}
        </Box>

        {location.images.length && (
          <SwipeableViews
            axis={"x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {location.images.map((step) => {
              return (
                <div key={step.publicId}>
                  <Box
                    component="img"
                    sx={carouselImage}
                    src={step.url}
                    alt={step.publicId}
                  ></Box>
                </div>
              );
            })}
          </SwipeableViews>
        )}

        <Box sx={fixedBottom}>
          <MobileStepper
            sx={{ backgroundColor: "transparent" }}
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                sx={carouselDot}
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                sx={carouselDot}
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
              </Button>
            }
          />
        </Box>

        <Link to={`/housingDetails/${location._id}`} className="Link">
          <Box sx={flexBetween}>
            <Box sx={{ mt: 2 }}>
              <Typography component="h3"> {location.title}</Typography>

              {/* <Typography component="h4"> {location.days}</Typography> */}

              <Typography component="h5"> {location.price * currencySelector[SignySelector]}{' '}{CurrencySign[SignySelector]}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box sx={dFlex}>
                {location.avgRating ? (
                  <>
                    {location.avgRating?.toFixed(1)}{" "}
                    <AiFillStar size={18} color="#FFC95F" />
                  </>
                ) : (
                  <>
                    <AiFillStar size={18} />
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Link>
      </Box>
    </motion.div>
  );
};
CarouselCard.propTypes = {
  location: PropTypes.any,
};

export default CarouselCard;
