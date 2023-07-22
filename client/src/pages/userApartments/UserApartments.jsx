import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import CarouselCard from "./CarouselCard";
import { useEffect, useState } from "react";
import Roomster from "../../API/config";
import Button from "@mui/material/Button";
import AppartmentCard from "../../components/manageHousing/stepperComponents/AppartmentCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserApartments = () => {
  const [apartments, setApartments] = useState([]);
  // const [page, setPage] = useState(0);
  const { user } = useSelector((state) => state.user);
  // console.log("here", user);
  const getUserApartments = async () => {
    if (user._id !== "") {
      try {
        const { data } = await Roomster.get(`user/${user._id}/apartments`);
        console.log("data", data);
        setApartments(data);
        console.log("asdasdas", apartments);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteApartment = async (apartment) => {
    try {
      // deleting photos from cloudinary
      console.log("delete apartment:", apartment);
      const deleteImagePromises = apartment.images.map(async (singleImg) => {
        console.log(" delete image", singleImg);
        const response = await Roomster.delete(
          `apartments/${apartment._id}/image`,
          {
            headers: {},
            data: {
              imageId: singleImg.publicId,
              userId: user._id,
            },
          }
        );
        console.log("response from delete image", response);
      });
      await Promise.all(deleteImagePromises);
      console.log("response from delete apartment");
      const response = await Roomster.delete(`apartments/${apartment._id}`, {
        headers: {},
        data: {
          userId: apartment.userId._id,
        },
      });
      setApartments((state) =>
        state.filter((item) => item._id !== apartment._id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserApartments();
  }, [user._id]);

  return (
    <>
      <Link to={"/apartment/modify"}>
        <Button
          variant="contained"
          size="large"
          color="success"
          sx={{ float: "right", mt: 2, mr: 10 }}>
          New Apartment
        </Button>
      </Link>
      <Link to={"/apartment/ReservationDashboard"}>
        <Button
          variant="contained"
          size="large"
          color="success"
          sx={{ float: "right", mt: 2, mr: 3 }}>
          All User Reservations
        </Button>
      </Link>
      <Box sx={{ mx: 2, my: 2 }}>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {apartments &&
            apartments.map((apartment) => (
              <Grid key={apartment._id} item xs={12} sm={4} md={4} lg={3}>
                <AppartmentCard
                  apartment={apartment}
                  deleteApartment={deleteApartment}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default UserApartments;
