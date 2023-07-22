import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { textAlign } from "@mui/system";
import { addReview } from "../../store/Slices/apartment";
import { useDispatch, useSelector } from "react-redux";
import Roomster from "../../API/config";
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

const AddReview = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { singleApartment } = useSelector((state) => state.apartments);
  const socket = useSelector((state) => {
    return state.user?.socket;
  });
  function handleButtonClick() {
    dispatch(addReview({ rate, description }));
    setOpen(false);
    setRate(0);
    setDescription("");
    if (singleApartment.price && user._id != "") {
      const sendNotification = async () => {
        try {
          await Roomster.post(`notifications/${singleApartment.userId._id}`, {
            senderId: `${user._id}`,
            receiverId: `${singleApartment.userId._id}`,
            text: `${user.fullName} add comment on your apartment , whose name it is: ${singleApartment.title}.`,
          });
          socket.emit("sendNotification", {
            sender: user,
            receiverId: `${singleApartment.userId._id}`,
            text: `${user.fullName} add comment on your apartment , whose name it is: ${singleApartment.title}.`,
          });
        } catch (error) {
          console.log(error);
        }
      };
      sendNotification();
    }
  }
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        add Review
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h4"
            component="h2"
            sx={{ mb: 2, textAlign: "center" }}>
            Add Review
          </Typography>
          <Stack spacing={1} sx={{ mb: "2rem" }}>
            <label htmlFor="half-rating">Rate:</label>
            <Rating
              name="half-rating"
              defaultValue={rate}
              value={rate}
              precision={0.5}
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </Stack>
          <TextField
            id="outlined-multiline-static"
            label="review"
            multiline
            sx={{ width: "100%" }}
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box
            sx={{
              mt: "2rem",
              textAlign: "center",
            }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleButtonClick}>
              Add Review
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddReview;
