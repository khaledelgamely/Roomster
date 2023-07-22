import { useState } from "react";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { Grid } from "@mui/material";
import CardReview from "./CardReview";
import MoreReview from "./MoreReview";
import { useSelector } from "react-redux";
import {
  getApartmentReviwsState,
  getApartmentTotalReviwsState,
} from "../../store/Slices/apartment";
import { useEffect } from "react";
import AddReview from "./AddReview";
import { Box } from "@mui/system";

function ReviewSection() {
  const apartmentReviews = useSelector(getApartmentReviwsState);
  const apartmentReviewsAverage = useSelector(getApartmentTotalReviwsState);
  let counter = 0;

  const [hasReview] = useState(true);
  return (
    <>
      {hasReview && (
        <>
          <Typography variant="h5" color="initial" sx={{ my: 4 }}>
            Rating ({apartmentReviews.length}){" "}
            {apartmentReviewsAverage === "NaN" ? "" : apartmentReviewsAverage}
            <StarIcon sx={{ color: "#f2fe05" }} />
          </Typography>
          <Grid container spacing={2}>
            {apartmentReviews[0] != undefined &&
              apartmentReviews.map(
                (item) =>
                  counter < 6 && (
                    <Grid item key={item._id} xs={12} sm={6}>
                      <span style={{ display: "none" }}>{counter++}</span>
                      <CardReview item={item} />
                    </Grid>
                  )
              )}
          </Grid>
          <MoreReview />
          <Box component="span" sx={{ margin: "0 1rem" }}></Box>
          <AddReview />
        </>
      )}
    </>
  );
}

export default ReviewSection;
