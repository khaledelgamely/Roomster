import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Roomster from "../API/config";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { buttonPadding } from "../theme/commonStyles";
import Typography from "@mui/material/Typography";
import BootstrapDialogTitle from "./BootstrapDialogTitle";
import { toastMessage } from "./toasfiy";
import { Box } from "@mui/system";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ reservation, getUserReservation }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const cancelReservation = async () => {
    try {
      await Roomster.delete(`apartments/${reservation._id}/rent`, {
        data: {
          userId: reservation.userId,
        },
      });
      toastMessage("success", "successfully canceled!");
      getUserReservation();
      setOpen(false);
    } catch (error) {
      toastMessage("error", " canceled failed!");
    }
  };
  return (
    <div  className="w-100">
      <Button
        onClick={handleClickOpen}
        size="small"
        fullWidth
        sx={buttonPadding}
        style={{
          backgroundColor: "#f44336", // set the background color to a shade of green
          color: "white",

          textOverflow: "ellipsis", // set the text color to white
        }}
        variant="contained"
      >
        Cancel
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Are You Sure ?
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Typography
            sx={{
              bgcolor: "#f1c40f",
              color: "white",
              borderRadius: "5px",
              width: 150,
              height: 20,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "0.8rem",
              boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)",
            }}
          >
            {`Cancelation Policy`}
          </Typography>

          <Box sx={{}}>
            {reservation.apartmentId.cancelPolicy.map((policy, index) => (
              <Typography key={index} gutterBottom>
                ◼ {policy}
              </Typography>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              backgroundColor: "#f44336", // set the background color to a shade of green
              color: "white",

              textOverflow: "ellipsis", // set the text color to white
            }}
            autoFocus
            onClick={cancelReservation}
          >
            Confirm
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
