import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { Divider } from "@mui/material";
import WaterIcon from "@mui/icons-material/Water";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CottageIcon from "@mui/icons-material/Cottage";
import CardReview from "./CardReview";
import { useSelector } from "react-redux";

import {
  getApartmentTotalReviwsState,
  getApartmentReviwsState,
} from "../../store/Slices/apartment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "70vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export default function MoreReview() {
  const totalReviews = useSelector(getApartmentTotalReviwsState);
  const reviews = useSelector(getApartmentReviwsState);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {totalReviews === "NaN" ? (
        <></>
      ) : (
        <Button variant="outlined" color="success" onClick={handleOpen}>
          Show More...
        </Button>
      )}

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h4"
            component="h2"
            sx={{ mb: 2 }}
          >
            All Reviews
          </Typography>
          {/*//! here we will mapping on item coming from db */}
          {reviews.map((item, index) => {
            return (
              <Fragment key={index}>
                <CardReview item={item} key={item._id} />
                <Divider />
              </Fragment>
            );
          })}
        </Box>
      </Modal>
    </>
  );
}
