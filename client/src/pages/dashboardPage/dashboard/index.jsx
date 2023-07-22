import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Header from "../../../components/dashboardComponent/Header";
import GeographyChart from "../../../components/dashboardComponent/GeographyChart";
import StatBox from "../../../components/dashboardComponent/StatBox";
import ProgressCircle from "../../../components/dashboardComponent/ProgressCircle";
import { getApartmentsState } from "../../../store/Slices/apartment";
import Roomster from "../../../API/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const apartemnts = useSelector(getApartmentsState);
  let totalPrice = 0;
  apartemnts.forEach((apartment) => {
    apartment.reservationsArr.forEach((reservation) => {
      totalPrice += reservation.totalPrice;
    });
  });

  const mostResApartemnt = apartemnts.reduce((acc, curr) => {
    if (curr.reservationsArr.length > acc.length) {
      return curr;
    } else {
      return acc;
    }
  }, []);

  const [usersCount,setUsersCount]=useState(0);
  const [apartmentsCount,setApartmentsCount]=useState(0);
  const [reservationsCount,setReservationsCount]=useState(0);

const RoomsterStates=async ()=>{
  try{
    const res =await Roomster.get('user/getStats');
        console.log(res.data);
        setUsersCount(res.data.usersCount);
        setApartmentsCount(res.data.apartmentsCount);
        setReservationsCount(res.data.reservationsCount);
}
catch(err){
  console.log(err);
}
  }

  useEffect(()=>{
    RoomsterStates();
  },[]);
const webBenefits=(totalPrice*.004).toFixed(2);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={usersCount}
            subtitle="All Users"
            progress={usersCount / 1000}
            increase={`+${usersCount / 200} %`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={apartmentsCount}
            subtitle="All Apartments"
            progress={apartmentsCount / 100}
            increase={`+${apartmentsCount / 100} %`}
            icon={
              <ApartmentIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={reservationsCount}
            subtitle="All Reservation"
            progress={reservationsCount / 10000}
            increase={`+${reservationsCount / 10000} %`}
            icon={
              <AddBusinessIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${webBenefits} $`}
            subtitle="Website benefits"
            progress={(webBenefits) / totalPrice}
            increase={`+${(webBenefits) / totalPrice}%`}
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle progress={`${totalPrice / 1000000}`} size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              ${totalPrice} revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Most Reserved
          </Typography>
          <Typography variant="h6" fontWeight="600" sx={{ padding: "20px" }}>
            Title:{" "}
            <span style={{ color: colors.greenAccent[600], marginLeft: "7px" }}>
              {mostResApartemnt.title}
            </span>
          </Typography>
          <Typography variant="h6" fontWeight="600" sx={{ padding: "20px" }}>
            Type:{" "}
            <span style={{ color: colors.greenAccent[600], marginLeft: "7px" }}>
              {mostResApartemnt.type}
            </span>
          </Typography>
          <Typography variant="h6" fontWeight="600" sx={{ padding: "20px" }}>
            Cost / Night :{" "}
            <span style={{ color: colors.greenAccent[600], marginLeft: "7px" }}>
              {mostResApartemnt.price} $
            </span>
          </Typography>
          <Typography variant="h6" fontWeight="600" sx={{ padding: "20px" }}>
            Owner :{" "}
            <span style={{ color: colors.greenAccent[600], marginLeft: "7px" }}>
              {mostResApartemnt.user?.fullName}
            </span>
          </Typography>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
