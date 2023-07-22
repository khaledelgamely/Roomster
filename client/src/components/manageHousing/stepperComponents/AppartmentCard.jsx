/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { PropTypes } from "prop-types";
import { useState } from "react";
import Roomster from "../../../API/config";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { toastMessage } from "../../../utils/toasfiy";
export default function AppartmentCard({ apartment, deleteApartment }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [publishedState, setPublishedState] = useState(apartment.published);
  const togglePublish = async () => {
    try {
      if (publishedState) {
        const response = await Roomster.patch(`apartments/${apartment._id}`, {
          published: false,
          userId: apartment.userId._id,
        });
        setPublishedState(false);
        toastMessage("success","your apartment is now unpublished")
      } else {
        const response = await Roomster.patch(`apartments/${apartment._id}`, {
          published: true,
          userId: apartment.userId._id,
        });
        toastMessage("success","your apartment is now published")
        setPublishedState(true);
      }
    } catch (error) {
      console.log(error);
    }
  }; //deleteApartment(apartment)
  const confirmDelete = () => {
    deleteApartment(apartment);
  };
  const editClick = () => {
    navigate("/apartment/modify", { state: { apartment } });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/housingDetails/${apartment._id}`}>
        <CardMedia
          component="img"
          alt="apartment"
          height="250"
          image={apartment.images[0]?.url}
        />
      </Link>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button size="large" onClick={togglePublish}>
          {publishedState ? "Unpublish" : "Publish"}
        </Button>
        {/* <Link to={{ pathname: "/apartment/modify", state: apartment }}> */}
        <Button size="large" onClick={editClick}>
          Edit
        </Button>
        {/* </Link> */}
        <Button size="large" onClick={handleClickOpen}>
          Remove Add
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            Are you sure about deleting this apartment?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"deleting this apartment will permenantly remove all it's data!"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="success">
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              autoFocus
              variant="contained"
              color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  );
}
AppartmentCard.propTypes = {
  apartment: PropTypes.any,
};
