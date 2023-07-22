import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarouselCard from "./CarouselCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loadMoreApartments } from "../../store/Slices/apartment";
import { loadMoreApartments } from "../../store/Slices/apartment";
import CircularProgress from '@mui/material/CircularProgress';

const LocationCards = ({ cards }) => {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true)
  const isDataFetched = useSelector(state => state.apartments.isDataFetched); //true

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setLoading(true);
      setPageNum((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (isDataFetched) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll)
    }
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDataFetched])

  useEffect(() => {
    dispatch(loadMoreApartments({ page: pageNum, filterString : "", keyword : "" })).then(() => {
      setLoading(false);
    }).catch((err) => {
      console.log(err, "error")
    })
  }, [pageNum]);

  if (!cards?.length) {
    return null;
  }
  return (
    <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {cards.map((location, index) => {
          return (
            <Grid key={location._id} item xs={12} sm={4} md={4} lg={3}>
              <CarouselCard location={location} index={index} />
            </Grid>
          );
        })}
      </Grid>
      {!isDataFetched && <Grid marginTop="20px" textAlign="center" fontSize={20}>NO Longer Data Available</Grid>}
      {loading && <Grid textAlign="center"><CircularProgress /></Grid>}
    </Box>
  );
};

export default LocationCards;
