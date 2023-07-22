import { Grid } from "@mui/material";
import FilterAndSearch from "../../components/homeComponents/FilterAndSearch";
import LocationCards from "../../components/Card/LocationCard";
// import { locations as cardLocations } from "../../data/allData.jsx";
import "./homeStyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getApartments,
  getApartmentsState,
} from "../../store/Slices/apartment";
import { useEffect } from "react";
import { SkeletonCard } from "../../utils/SkeletonPage";
function Homepage() {
  const dispatch = useDispatch();
  const apartments = useSelector(getApartmentsState);
  const { loading } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    dispatch(getApartments({ page: 1 }));
  }, [dispatch]);
  return (
    <>
      {!loading ? (
        <>
          <FilterAndSearch />
          <Grid container columnSpacing={2} rowSpacing={4} style={{marginLeft: '-7px' ,marginTop: "208px"}}>
            <LocationCards cards={apartments} />;
          </Grid>
        </>
      ) : (
        <SkeletonCard />
      )}
    </>
  );
}

export default Homepage;
