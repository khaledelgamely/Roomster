import * as React from "react";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "50vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export default function MoreOffer({ allIcons }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" color="success" onClick={handleOpen}>
        Show More...
      </Button>
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
            What this home has to offer
          </Typography>
          <List>
            {allIcons[0] != undefined &&
              allIcons.map(
                (item) =>
                  item.isFound && (
                    <div key={item.key} style={{ marginBottom: "1rem" }}>
                      <ListItem button>
                        {item.icon}
                        <ListItemText primary={item.title} />
                      </ListItem>
                      <Divider />
                    </div>
                  )
              )}
          </List>
          <Typography
            id="keep-mounted-modal-title"
            sx={{ mt: 5 }}
            variant="h6"
            component="h2"
          >
            What this home has not to offer
          </Typography>
          <List>
            {allIcons[0] != undefined &&
              allIcons.map(
                (item) =>
                  !item.isFound && (
                    <div key={item.key} style={{ marginBottom: "1rem" }}>
                      <ListItem button>
                        {item.icon}

                        <ListItemText
                          primary={item.title}
                          sx={{ textDecoration: "line-through" }}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  )
              )}
          </List>
        </Box>
      </Modal>
    </div>
  );
}
