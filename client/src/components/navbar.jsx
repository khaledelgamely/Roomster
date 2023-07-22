import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../index.css";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ResetRedux,
  addNotificationsNo,
  addUnseen,
  resetNotificationsNo,
  resetUnseen,
  setNotificationsNo,
  setUnseen,
} from "../store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
const drawerWidth = 240;
const navItems = ["Home", "Book", "Message", "My Trips", "Manage Housing"];
import image from "../assets/41KUZDZwSeL.png";
import {
  Badge,
  CircularProgress,
  ListItemAvatar,
  ListSubheader,
  Popover,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Roomster from "../API/config";
import DashboardIcon from "@mui/icons-material/Dashboard";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorLanguage, setAnchorLanguage] = useState(null);
  const openLanguage = Boolean(anchorLanguage);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const open = Boolean(anchorEl);
  const [anchorNotification, setAnchorNotification] = useState(null);
  const openNotification = Boolean(anchorNotification);
  const [notifications, setNotifications] = useState({ data: [] });
  // const [unseenNumber, setUnseenNumber] = useState(null);
  const socket = useSelector((state) => {
    return state.user?.socket;
  });
  const unseenConvo = useSelector((state) => {
    return state.user?.unseen;
  });
  const unseenNumber = useSelector((state) => {
    return state.user?.notificationsNo;
  });
  // const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseLanguage = () => {
    setAnchorLanguage(null);
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleNotificationOpen = (event) => {
    setAnchorNotification(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setAnchorNotification(null);
    let newState = notifications?.data?.map((notification) => {
      return { ...notification, seen: true };
    });
    setNotifications({ data: newState });

    // console.log(document.querySelectorAll(".unseen"));
  };
  const handelSeen = async () => {
    try {
      await Roomster.patch(`notifications/${user._id}`);
      dispatch(resetNotificationsNo());
    } catch (error) {
      console.log(error);
    }
  };

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (user._id == "") {
      dispatch(resetNotificationsNo());
      setNotifications({ data: [] });
      dispatch(resetUnseen());
    } else {
      loadMore();
    }
  }, [user._id]);

  useEffect(() => {
    if (unseenNumber == null && user._id != "") {
      console.log("Asdasdlkasd");
      const getNotifications = async () => {
        const { data } = await Roomster.get(`notifications/${user._id}`);
        // if (data.noOfUnseen != 0) dispatch(setNotifications(data.noOfUnseen));
        dispatch(setNotificationsNo(data.noOfUnseen));
      };
      getNotifications();
    }
    if (unseenConvo.length == 0 && user._id != "") {
      const getUnseenConversaations = async () => {
        const response = await Roomster.get(
          `conversations/${user._id}/unseenConversations`
        );
        dispatch(setUnseen(response.data.senderIds));
      };
      getUnseenConversaations();
    }
  }, [user._id, unseenNumber]);
  useEffect(() => {
    socket?.on("getNotification", (notification) => {
      dispatch(addNotificationsNo());
      setNotifications((prevState) => ({
        data: [
          { senderId: notification.sender, text: notification.text },
          ...prevState.data,
        ],
      }));
    });
    socket?.on("getMessage", (data) => {
      dispatch(addUnseen(data.sender._id));
    });
  }, [socket]);

  const fetchNotifications = async (page) => {
    const { data } = await Roomster.get(
      `notifications/${user._id}?limit=6&page=${page}`
    );
    return data;
  };

  const loadMore = async () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    const newData = await fetchNotifications(page);
    if (newData.data.length === 0) {
      setHasMore(false);
    } else {
      console.log(newData.data);
      setNotifications((prevState) => ({
        data: [...prevState.data, ...newData.data],
      }));
      setPage(page + 1);
    }
    setLoading(false);
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop - 2 < clientHeight) {
      loadMore();
    }
  };
  const profileComponent = (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            {user?.image?.url === "" ? (
              <Avatar sx={{ width: 32, height: 32 }}></Avatar>
            ) : (
              <img
                className="profile_image"
                src={user?.image?.url}
                alt="profile-pic"
                style={{ width: 40, height: 40, borderRadius: "50%" }}
              />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        {user._id !== "" ? (
          <NavLink to="profile">
            <MenuItem onClick={handleClose}>
              {user?.image?.url === "" ? (
                <Avatar />
              ) : (
                <img
                  className="profile_image"
                  src={user?.image?.url}
                  alt="profile-pic"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginRight: "15px",
                  }}
                />
              )}
              Profile
            </MenuItem>
            <Divider />
          </NavLink>
        ) : (
          ""
        )}
        {user._id !== "" ? (
          <NavLink to="wishlist">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ShoppingCartIcon fontSize="small" />
              </ListItemIcon>
              <Badge badgeContent={user.favourites.length} color="primary">
                wishlist
              </Badge>
            </MenuItem>
          </NavLink>
        ) : (
          ""
        )}
        {user.isAdmin && (
          <NavLink to="dashboard">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Dashboard
            </MenuItem>
          </NavLink>
        )}
        {user._id !== "" ? (
          <MenuItem
            onClick={() => {
              handleClose();
              localStorage.clear();
              dispatch(ResetRedux());
              socket.disconnect();
              navigate("/home");
            }}
            sx={{ color: "#CD1818" }}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: "#CD1818" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          ""
        )}
        {user._id === "" ? (
          <MenuItem
            component={NavLink}
            to={"/register"}
            onClick={() => {
              handleClose();
            }}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            Sign up
          </MenuItem>
        ) : (
          ""
        )}
        {user._id === "" ? (
          <MenuItem
            component={NavLink}
            to={"/login"}
            onClick={() => {
              handleClose();
            }}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        ) : (
          ""
        )}
        {user._id === "" ? (
          <MenuItem
            component={NavLink}
            to={"/help"}
            onClick={() => {
              handleClose();
            }}>
            <Divider />
            <ListItemIcon>
              <HelpOutlineOutlinedIcon fontSize="small" />
            </ListItemIcon>
            help
          </MenuItem>
        ) : (
          ""
        )}
      </Menu>{" "}
    </>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={image} className="logo" />
      </Typography>
      <Divider />
      <List className="Links">
        {navItems.map((item) => (
          <NavLink to={item} key={item}>
            {!(item === "Message") && (
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            )}
            {item === "Message" && (
              <Badge badgeContent={unseenConvo.length} color="error">
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              </Badge>
            )}
          </NavLink>
        ))}
        <Divider />
        {user._id !== "" ? (
          <ListItem disablePadding component={NavLink} to={"/profile"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
        {user._id !== "" ? (
          <ListItem disablePadding component={NavLink} to={"/wishlist"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Badge
                badgeContent={user.favourites.length}
                sx={{ margin: "auto" }}
                color="primary">
                <ListItemText primary="wishlist" />
              </Badge>
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
        {user.isAdmin && (
          <ListItem disablePadding component={NavLink} to={"/dashboard"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="dashboard" />
            </ListItemButton>
          </ListItem>
        )}
        <Divider />
        {user._id !== "" ? (
          <ListItem
            disablePadding
            onClick={() => {
              localStorage.clear();
              dispatch(ResetRedux());
            }}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="LogOut" />
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
        {user._id !== "" ? (
          <ListItem disablePadding component={NavLink} to={"/register"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Sign up" />
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
        {user._id !== "" ? (
          <ListItem disablePadding component={NavLink} to={"/login"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Login in" />
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
        {user._id !== "" ? (
          <ListItem disablePadding component={NavLink} to={"/help"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Help" />
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
      </List>
    </Box>
  );

  const [bgcolor, setColor] = useState(true);

  const changeColor = () => {
    if (window.scrollY >= 35) {
      setColor(false);
    } else {
      setColor(true);
    }
  };
  window.addEventListener("scroll", changeColor);
  return (
    <Box sx={{ display: "flex", mb: 12 }}>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          height: "80px",
          backgroundColor: "#ffffff",
          boxShadow: bgcolor ? "none" : "0px 2px 8px rgba(0, 0, 0, 0.32)",
          transition: "all 0.18s ease-in",
        }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              handleDrawerToggle();
              handelSeen();
            }}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <NavLink to="/Home">
              <img src={image} className="logo" />
            </NavLink>
          </Typography>

          <Box
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            className="center">
            {navItems.map((item) => (
              <NavLink to={item} key={item}>
                {!(item === "Message") && (
                  <Button
                    component="div"
                    size="large"
                    sx={{
                      color: "#000",
                      fontFamily: "Outfit",
                      fontWeight: "500",
                      fontSize: "1.2rem",
                    }}>
                    {item}
                  </Button>
                )}
                {item === "Message" && (
                  <Badge badgeContent={unseenConvo.length} color="error">
                    <Button
                      component="div"
                      size="large"
                      sx={{
                        color: "#000",
                        fontFamily: "Outfit",
                        fontWeight: "500",
                        fontSize: "1.2rem",
                      }}>
                      {item}
                    </Button>
                  </Badge>
                )}
              </NavLink>
            ))}
            {user._id !== "" ? (
              <IconButton
                aria-label="show notifications"
                onClick={(event) => {
                  handleNotificationOpen(event);
                  handelSeen();
                }}
                sx={{ color: "#000" }}>
                <Badge badgeContent={unseenNumber} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>) : ''}
            {/* icon language start */}
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}></Box>
              <Menu
                anchorEl={anchorLanguage}
                id="language-menu"
                open={openLanguage}
                onClose={handleCloseLanguage}
                onClick={handleCloseLanguage}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <MenuItem onClick={handleClose}>English</MenuItem>
                <MenuItem onClick={handleClose}>Arabic</MenuItem>
              </Menu>
            </>
            {/* icon language end */}

            {/* icon profile start */}
            {profileComponent}
            {/* icon profile end */}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </Box>
      <Popover
        open={openNotification}
        anchorEl={anchorNotification}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <ListSubheader>Notifications</ListSubheader>
        <List
          sx={{
            width: "100%",
            minWidth: 300,
            maxWidth: 400,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            paddingBottom: 7,
            maxHeight: 400,
            "& ul": { paddingBottom: 0 },
          }}
          onScroll={handleScroll}>
          {notifications?.data?.map((notification, index) => {
            return (
              <Box
                key={index}
                component={"div"}
                sx={{ my: 2, px: 3 }}
                className={`betweenItem ${notification.seen ? "seen" : "unseen"
                  }`}>
                <ListItemAvatar>
                  <Avatar
                    alt={notification.senderId.fullName}
                    src={notification.senderId.image.url}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.senderId.fullName}
                  secondary={notification.text}
                />
              </Box>
            );
          })}
          {loading && (
            <div className="centerItem">
              <CircularProgress />
            </div>
          )}{" "}
        </List>
      </Popover>
    </Box>
  );
}

Navbar.propTypes = {};

export default Navbar;
