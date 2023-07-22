/* eslint-disable no-undef */
import { motion } from "framer-motion";
import {
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import image from "../assets/Success-PNG-Image.png";
import { useLocation } from "react-router";
import { useEffect } from "react";
import Roomster from "../API/config";
import { useDispatch, useSelector } from "react-redux";
import { getSingleApartment } from "../store/Slices/apartment";

const ConfirmationPage = () => {
  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
  }));
  const location = useLocation();
  const apartmentId = new URLSearchParams(location.search).get("id");
  const from = new URLSearchParams(location.search).get("from");
  const to = new URLSearchParams(location.search).get("to");
  const price = new URLSearchParams(location.search).get("total_price");
  const userId = new URLSearchParams(location.search).get("userId");
  const { user } = useSelector((state) => state.user);
  const { singleApartment } = useSelector((state) => state.apartments);
  const socket = useSelector((state) => {
    return state.user?.socket;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (singleApartment.price && user._id != "") {
      const makeRentAndSendNotification = async () => {
        try {
          await Roomster.post(`apartments/${apartmentId}/rent`, {
            userId: userId, //From Redux
            startDate: from, //From Date Packer
            endDate: to, //From Date Packer
            totalPrice: price, //From Date Packer
          });
          await Roomster.post(`notifications/${singleApartment.userId._id}`, {
            senderId: `${user._id}`,
            receiverId: `${singleApartment.userId._id}`,
            text: ` Reservation confirmed for ${
              user.fullName
            } from ${from.slice(0, 10)}  to : ${to.slice(0, 10)}.`,
          });
          socket.emit("sendNotification", {
            sender: user,
            receiverId: `${singleApartment.userId._id}`,
            text: ` Reservation confirmed for ${
              user.fullName
            } from ${from.slice(0, 10)}  to : ${to.slice(0, 10)}.`,
          });
          console.log("sent notification");
        } catch (error) {
          console.log(error);
        }
      };
      makeRentAndSendNotification();
    }
  }, [singleApartment.price, user._id]);
  // useEffect(() => {
  //   async function rentApartment() {
  //     await Roomster.post(`apartments/${apartmentId}/rent`, {
  //       userId: userId, //From Redux
  //       startDate: from, //From Date Packer
  //       endDate: to, //From Date Packer
  //       totalPrice: price, //From Date Packer
  //     });
  //     // Do something after renting the apartment
  //   }
  //   rentApartment();
  // }, [apartmentId, from, price, to, userId]);
  useEffect(() => {
    dispatch(getSingleApartment({ id: apartmentId }));
    console.log(user._id, singleApartment);
  }, [dispatch]);
  // useEffect(() => {
  //   if (singleApartment.price && user._id != "") {
  //     const sendNotification = async () => {
  //       try {
  //         console.log(singleApartment.userId._id);
  //         await Roomster.post(`notifications/${singleApartment.userId._id}`, {
  //           senderId: `${user._id}`,
  //           receiverId: `${singleApartment.userId._id}`,
  //           text: ` Reservation confirmed for ${
  //             user.fullName
  //           } from ${from.slice(0, 10)}  to : ${to.slice(0, 10)}.`,
  //         });
  //         socket.emit("sendNotification", {
  //           sender: user,
  //           receiverId: `${singleApartment.userId._id}`,
  //           text: ` Reservation confirmed for ${
  //             user.fullName
  //           } from ${from.slice(0, 10)}  to : ${to.slice(0, 10)}.`,
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     sendNotification();
  //     // console.log("first", singleApartment.price)
  //     // console.log("first", singleApartment.userId._id)
  //   }
  // }, [singleApartment.price, user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <StyledPaper>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Payment Successful!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                Thank you for your purchase.
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <img
                src={image}
                alt="Payment Success"
                style={{ maxWidth: "100%", maxHeight: "20vh" }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                href="home"
                variant="contained"
                color="primary"
                sx={{ marginTop: 4 }}>
                Back To Home Page
              </Button>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </motion.div>
  );
};

export default ConfirmationPage;
