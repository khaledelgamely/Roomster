import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import image from "../../../assets/41KUZDZwSeL.png";
import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <Box display="flex" p={2} justifyContent="space-between">
        <Box display="flex" borderRadius="3px">
          <img style={{ height: "8rem", width: "25rem" }} src={image} alt="" />
        </Box>
        <Box display="flex" mt={1} style={{ height: "2.3rem" }}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <Link to="/">
              <HomeIcon />
            </Link>
          </IconButton>
          <IconButton>
            <Link to="/profile">
              <PersonOutlinedIcon />
            </Link>
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Topbar;
