import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MyTripsCard from "./MyTripsCard";

const MyTripsLocationCards = ({ reservations, getUserReservation }) => {
  if (!reservations?.length) {
    return null;
  }

  return (
    <Box sx={{ mx: 2, my: 10 }}>
      <Grid container rowSpacing={3} columnSpacing={3} justifyContent="center">
        {reservations?.map((reservation, index) => {
          return (
            <Grid key={reservation._id} item xs={12} sm={6} md={4} lg={3}>
              <MyTripsCard
                reservation={reservation}
                index={index}
                getUserReservation={getUserReservation}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MyTripsLocationCards;
