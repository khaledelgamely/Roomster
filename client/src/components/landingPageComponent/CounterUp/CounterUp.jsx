/* eslint-disable react/prop-types */
import {  Grid, Typography } from "@mui/material";
import CountUp from "react-countup";
import PersonIcon from "@mui/icons-material/Person";
import CottageIcon from "@mui/icons-material/Cottage";
import StarIcon from '@mui/icons-material/Star';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const CounterCard = ({ end = 10 }) => {
  
  return (
    <CountUp
      enableScrollSpy={true}
      scrollSpyOnce={true}
      start={0}
      end={end}
      duration={4}
      delay={0.5}
      style={{
        color: "#9b9183",
        fontSize: "60px",
        fontFamily:"Old Standard TT",
        textAlign: "center",
      }}
    />
  );
};
function CounterUp() {
  return (
    <Grid
      container
      spacing={4}
      className="justify-content-center align-items-center"
      sx={{
        background: "#EFEBE1",
        width: "100vw",
        minHeight: "250px",
      }}
    >
    <Grid item xs={12} sm={6} md={2} className="p-4 mx-3 text-center">
    <div className="d-flex flex-column justify-content-center align-items-center">
      <PersonIcon
        sx={{
          color: "#9b9183",
          fontSize: "80px",
          textAlign: "center",
        }}
      />
      <Typography sx={{fontSize:'16px'}}> All users </Typography>
      <CounterCard end={700} className="mb-0" />
    </div>
  </Grid>
  <Grid item xs={12} sm={6} md={2} className="p-4 mx-3 text-center">
    <div className="d-flex flex-column justify-content-center align-items-center">
      <CottageIcon
        sx={{
          color: "#9b9183",
          fontSize: "80px",
          textAlign: "center",
        }}
      />
      <Typography sx={{fontSize:'16px'}}> Roomster Apartments </Typography>
      <CounterCard end={250} className="mb-0" />
    </div>
  </Grid>
  <Grid item xs={12} sm={6} md={2} className="p-4 mx-3 text-center">
    <div className="d-flex flex-column justify-content-center align-items-center">
      <CreditScoreIcon
        sx={{
          color: "#9b9183",
          fontSize: "80px",
          textAlign: "center",
        }}
      />
      <Typography sx={{fontSize:'16px'}}> All Reservations </Typography>
      <CounterCard end={390} className="mb-0" />
    </div>
  </Grid>
  <Grid item xs={12} sm={6} md={2} className="p-4 mx-3 text-center">
    <div className="d-flex flex-column justify-content-center align-items-center">
      <StarIcon
        sx={{
          color: "#9b9183",
          fontSize: "80px",
          textAlign: "center",
        }}
      />
      <Typography sx={{fontSize:'16px'}}> FIVE STAR RATINGS </Typography>
      <CounterCard end={345} style={{ marginBottom: "0 !important"}} />
    </div>
  </Grid>
    </Grid>
  );
}
export default CounterUp;
