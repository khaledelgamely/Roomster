import { Grid } from "@mui/material";
import Roomster from "../../API/config";
import { useState } from "react";
import MyTripsLocationCards from "../../components/Card/MyTripsLocationCard";

import { useSelector } from "react-redux";

import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function MyTrips() {
  const user = useSelector((state) => state.user.user);
  const [reservations, setReservation] = useState([]);
  const [page, setPage] = useState(1);

  const getUserReservation = async (page, userId) => {
    if (user._id !== "") {
      try {
        const { data } = await Roomster.get(
          `user/${userId}/reservations?page=${page}&limit=10000000000`
        );
        setReservation((prevReservations) => [...data]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // any one who will implement infinite scroll use this function
  const getMoreUserReservation = async (userId) => {
    try {
      setPage((prev) => prev++);

      const reservationsData = await Roomster.get(
        `user/${userId}/reservations?page=${page}`
      );
      console.log(reservationsData.data);
      reservations.push(...reservationsData.data);
      setReservation(reservations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserReservation(1, user._id);
  }, [user._id]);

  return (
    <>
      {reservations && (
        <Grid container columnSpacing={2} rowSpacing={4}>
          <MyTripsLocationCards
            reservations={reservations}
            getUserReservation={() => {
              getUserReservation(1, user._id);
            }}
          />
          ;
        </Grid>
      )}
    </>
  );
}

export default MyTrips;
