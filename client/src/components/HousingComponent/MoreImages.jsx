//! we used dialog full screen from material ui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
import { PhotoList } from "./PhotoList";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Typography from "@mui/material/Typography";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function FullScreenDialog({ images }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        sx={{ color: "#fff" }}
        onClick={handleClickOpen}
        className="centerItem"
      >
        <Typography variant="span" sx={{ color: "#fff" }}>
          More Image
        </Typography>
        <ImageSearchIcon sx={{ marginLeft: "10px" }} />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <PhotoList images={images} />
      </Dialog>
    </div>
  );
}
