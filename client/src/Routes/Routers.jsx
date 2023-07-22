import { Route, Routes, useLocation } from "react-router";
import Homepage from "../pages/homePage/homepage";
import SignInSide from "../pages/loginPage";
import Signup from "../pages/registerPage";
import Profile from "../pages/profile/Profile";
import HousingDetails from "../pages/housingDetails/HousingDetails";
import ManageHousing from "../pages/manageHousing/manageHousing";
import WishList from "../pages/WishList/WishList";
import MyTrips from "../pages/MyTrips/MyTrips";
import MessagePage from "../pages/messagePage/MessagePage";
import UserGuard from "../Gurd/UserGurd";
import UserApartments from "../pages/userApartments/UserApartments";
import ConfirmationPage from "../pages/ConfirmationPage ";
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Users from "../pages/dashboardPage/users/Users";
import Team from "../pages/dashboardPage/team/Team";
import Topbar from "../pages/dashboardPage/global/Topbar";
import Sidebar from "../pages/dashboardPage/global/Sidebar";
import Dashboard from "../pages/dashboardPage/dashboard";
import CreateUser from "../pages/dashboardPage/createUser";
import ApartmentsInfo from "../pages/dashboardPage/apartments/ApartmentsInfo";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode, ColorModeContext } from "../theme";
import LandingPage from "../pages/landingPage/LandingPage";
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import ReservationDashboard from "./../pages/userApartments/reservationDashboard/reservationDashboard";
import NotFoundPage from "../pages/Not Found Page/NotFound";

function Routers({ getPathName }) {
  // function checkIsAdmin(props) {
  //   const token = localStorage.getItem("token");
  //   const data = jwt_decode(token);

  //   if (data.isAdmin) {

  //     return props.children;
  //   } else {
  //     return <Navigate to="/login" />;
  //   }
  // }
  const location = useLocation();
  useEffect(() => {
    getPathName(location.pathname);
  });

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="Home" element={<LandingPage />} />
      <Route path="login" element={<SignInSide />} />
      <Route path="register" element={<Signup />} />
      <Route path="Book" element={<Homepage />} />
      <Route
        path="profile/"
        element={
          <UserGuard>
            <Profile />
          </UserGuard>
        }
      />
      <Route
        path="housingDetails/:apartmentId"
        element={
          <UserGuard>
            <HousingDetails />
          </UserGuard>
        }
      />
      <Route
        path="Manage Housing"
        element={
          <UserGuard>
            <UserApartments />
          </UserGuard>
        }
      />
      <Route
        path="apartment/ReservationDashboard"
        element={
          <UserGuard>
            <ReservationDashboard />
          </UserGuard>
        }
      />
      <Route path="Message" element={
        <UserGuard>
          <MessagePage />
        </UserGuard>
      } />
      <Route
        path="apartment/modify"
        element={
          <UserGuard>
            <ManageHousing />
          </UserGuard>
        }
      />
      <Route
        path="wishlist/"
        element={
          <UserGuard>
            <WishList />
          </UserGuard>
        }
      />
      <Route
        path="My Trips/"
        element={
          <UserGuard>
            <MyTrips />
          </UserGuard>
        }
      />
      <Route
        path="success"
        element={
          <UserGuard>
            <ConfirmationPage />
          </UserGuard>
        }
      />
      <Route path="dashboard">
        <Route
          path=""
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="dashBoard">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Dashboard />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
        <Route
          path="team"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="dashBoard">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Team />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />

        <Route
          path="users"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="dashBoard">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Users />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
        <Route
          path="apartmentsInfo"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="dashBoard">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <ApartmentsInfo />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
        <Route
          path="createUser"
          element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="dashBoard">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <CreateUser />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          }
        />
      </Route>
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default Routers;
