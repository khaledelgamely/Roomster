import { Container, Divider } from "@mui/material";
import Navbar from "./components/navbar.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Routers from "./Routes/Routers.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setSocket } from "./store/Slices/userSlice.jsx";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { fetchCurrency } from "./store/Slices/currency.jsx";
import { io } from "socket.io-client";
import { getApartments } from "./store/Slices/apartment.js";
import { fetchUsers } from "./store/Slices/AllUsersSlice.jsx";
import LandingPageFooter from "./components/landingPageComponent/Footer/LandingPageFooter.jsx";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user?.user;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken._id;
      dispatch(fetchUser(userId));
      dispatch(fetchCurrency());
      const socket = io("http://localhost:3030");
      socket.emit("addUser", userId);
      dispatch(setSocket(socket));
      dispatch(getApartments({ page: 1 }));
      if (decodedToken.isAdmin) {
        dispatch(fetchUsers());
      }
    }
  }, [dispatch, user._id]);

  //========================
  const [path, setPath] = useState("");
  const getPathName = (pathName) => {
    setPath(pathName);
  };
  //=======================

  return (
    <BrowserRouter>
      {!path.includes("/dashboard") && <Navbar />}
      <Container maxWidth="xl" sx={{ minHeight: "80vh" }}>
        <Routers getPathName={getPathName} />
      </Container>
      {["/", "/Home"].includes(path) && <LandingPageFooter />}
      {["/", "/Home"].includes(path) && <Divider />}
      {!path.includes("/dashboard") && <Footer />}

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
