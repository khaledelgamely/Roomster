/* eslint-disable react/no-unknown-property */
import Box from "@mui/material/Box";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import FullScreenDialog from "../../components/HousingComponent/MoreImages";
import { AiFillHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import MoreOffer from "../../components/HousingComponent/MoreOffer";
import ReviewSection from "../../components/HousingComponent/ReviewSection";
import HousingInfo from "../../components/HousingComponent/HousingInfo";
import PickerDate from "../../components/HousingComponent/PickerData/PickerDate";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleApartment,
  getApartmentReviews,
  getSingleApartmentState,
} from "../../store/Slices/apartment";
import { addFavorite, deleteFavorite } from "../../store/Slices/userSlice";
import { createAllIcons } from "../../utils/createIcons";
import { SkeletonPageDetails } from "../../utils/SkeletonPage";
import "./HousingDetails.css";
import ShareIcon from "@mui/icons-material/Share";
import Modal from "@mui/material/Modal";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
import BalconyIcon from "@mui/icons-material/Balcony";
import CountertopsIcon from "@mui/icons-material/Countertops";
import WeekendIcon from "@mui/icons-material/Weekend";
import BedIcon from "@mui/icons-material/Bed";

export default function HousingDetails() {
  const params = useParams();
  console.log(params.apartmentId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const singleApartment = useSelector(getSingleApartmentState);
  const hostImageUrl = singleApartment.userId?.image?.url;
  let counter = 0;
  const { user, loading } = useSelector((state) => {
    return state.user;
  });
  const allIcons = createAllIcons(singleApartment.apartmentSpecification);
  const [isFavorite, setIsFavorite] = useState(
    user.favourites?.find((favorite) => {
      return favorite._id == params.apartmentId;
    })
  );

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

  useEffect(() => {
    dispatch(getSingleApartment({ id: params.apartmentId }));
    dispatch(getApartmentReviews({ apartmentId: params.apartmentId }));
  }, [dispatch, isFavorite]);

  const Like = () => {
    dispatch(
      addFavorite({
        userId: user._id,
        location: singleApartment,
      })
    );
    setIsFavorite((prev) => !prev);
  };
  const disLike = () => {
    dispatch(
      deleteFavorite({
        userId: user._id,
        location: singleApartment,
      })
    );
    setIsFavorite((prev) => !prev);
  };
  const openChat = (id) => {
    navigate("/Message", { state: { id } });
  };

  const currentUrl = window.location.href;
  const socialIcons = [
    { icon: FacebookIcon, component: FacebookShareButton },
    { icon: WhatsappIcon, component: WhatsappShareButton },
    { icon: TwitterIcon, component: TwitterShareButton },
    { icon: TelegramIcon, component: TelegramShareButton },
    { icon: LinkedinIcon, component: LinkedinShareButton },
    { icon: EmailIcon, component: EmailShareButton },
    { icon: HatenaIcon, component: HatenaShareButton },
    { icon: InstapaperIcon, component: InstapaperShareButton },
    { icon: LineIcon, component: LineShareButton },
    { icon: LivejournalIcon, component: LivejournalShareButton },
    { icon: MailruIcon, component: MailruShareButton },
    { icon: OKIcon, component: OKShareButton },
    { icon: PinterestIcon, component: PinterestShareButton },
    { icon: PocketIcon, component: PocketShareButton },
    { icon: RedditIcon, component: RedditShareButton },
    { icon: TumblrIcon, component: TumblrShareButton },
    { icon: ViberIcon, component: ViberShareButton },
    { icon: VKIcon, component: VKShareButton },
    { icon: WorkplaceIcon, component: WorkplaceShareButton },
  ];

  return (
    <>
      {!loading ? (
        <>
          <Box
            sx={{
              flexGrow: 1,
              position: "relative",
              marginTop: "6rem",
              marginBottom: "8rem",
            }}
          >
            <Box className="betweenItem" component="div" sx={{ mb: "1rem" }}>
              <Typography variant="h5" color="initial">
                {singleApartment.title}
              </Typography>
              <Box style={{ cursor: "pointer" }}>
                {isFavorite ? (
                  <AiFillHeart
                    size={30}
                    color="#fff"
                    fill="#b12929"
                    onClick={() => {
                      disLike();
                    }}
                  />
                ) : (
                  <FaRegHeart size={30} color="#000" onClick={() => Like()} />
                )}
                <IconButton
                  sx={{ ml: 2 }}
                  onClick={handleOpen}
                  aria-label="delete"
                >
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>
            <Grid
              container
              spacing={2}
              component="div"
              sx={{
                height: 500,
                overflow: "hidden",
              }}
            >
              <Grid item xs={12} md={6}>
                <img
                  style={{
                    width: " 100%",
                    height: "100%",
                    borderRadius: 5,
                  }}
                  src={
                    singleApartment.images ? singleApartment.images[0].url : ""
                  }
                  alt=""
                />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: { xs: "none", md: "block" }, height: 500 }}
              >
                <Grid
                  container
                  spacing={2}
                  component="div"
                  sx={{ height: 500 }}
                >
                  <Grid item xs={6}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 5,
                      }}
                      src={
                        singleApartment.images
                          ? singleApartment.images[1].url
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 5,
                      }}
                      src={
                        singleApartment.images
                          ? singleApartment.images[2].url
                          : ""
                      }
                      alt=""
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <img
                      style={{
                        width: " 100%",
                        height: "100%",
                        borderRadius: 5,
                      }}
                      src={
                        singleApartment.images
                          ? singleApartment.images[3].url
                          : ""
                      }
                      alt=""
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <img
                      style={{
                        width: " 100%",
                        height: "100%",
                        borderRadius: 5,
                      }}
                      src={
                        singleApartment.images
                          ? singleApartment.images[4].url
                          : ""
                      }
                      alt=""
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* to display more image for housing */}
            <Box sx={{ position: "absolute", bottom: "20px", left: "10px" }}>
              <FullScreenDialog images={singleApartment.images} />
            </Box>
          </Box>
          <Grid
            container
            sx={{
              mt: 4,
              mb: 1,
              mx: 1,
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
            spacing={2}
          >
            <Grid
              item
              md={7}
              sx={{ backgroundColor: "#f2f2f2", borderRadius: 3, px: 2 }}
            >
              <Box sx={{ mb: 1 }}>
                <Avatar
                  sx={{ width: 70, height: 70 }}
                  alt={singleApartment?.userId?.fullName}
                  src={hostImageUrl != "" ? hostImageUrl : ""}
                />
                <Box>
                  <Typography variant="h5" color="initial">
                    Entire villa hosted by {singleApartment?.userId?.fullName}
                    {user._id !== singleApartment?.userId?._id && (
                      <button
                        className="chatBtn"
                        onClick={() => openChat(singleApartment?.userId?._id)}
                      >
                        <svg
                          height="1.6em"
                          fill="white"
                          xmlSpace="preserve"
                          viewBox="0 0 1000 1000"
                          y="0px"
                          x="0px"
                          version="1.1"
                        >
                          <path d="M881.1,720.5H434.7L173.3,941V720.5h-54.4C58.8,720.5,10,671.1,10,610.2v-441C10,108.4,58.8,59,118.9,59h762.2C941.2,59,990,108.4,990,169.3v441C990,671.1,941.2,720.5,881.1,720.5L881.1,720.5z M935.6,169.3c0-30.4-24.4-55.2-54.5-55.2H118.9c-30.1,0-54.5,24.7-54.5,55.2v441c0,30.4,24.4,55.1,54.5,55.1h54.4h54.4v110.3l163.3-110.2H500h381.1c30.1,0,54.5-24.7,54.5-55.1V169.3L935.6,169.3z M717.8,444.8c-30.1,0-54.4-24.7-54.4-55.1c0-30.4,24.3-55.2,54.4-55.2c30.1,0,54.5,24.7,54.5,55.2C772.2,420.2,747.8,444.8,717.8,444.8L717.8,444.8z M500,444.8c-30.1,0-54.4-24.7-54.4-55.1c0-30.4,24.3-55.2,54.4-55.2c30.1,0,54.4,24.7,54.4,55.2C554.4,420.2,530.1,444.8,500,444.8L500,444.8z M282.2,444.8c-30.1,0-54.5-24.7-54.5-55.1c0-30.4,24.4-55.2,54.5-55.2c30.1,0,54.4,24.7,54.4,55.2C336.7,420.2,312.3,444.8,282.2,444.8L282.2,444.8z"></path>
                        </svg>
                        <span className="tooltip">Chat</span>
                      </button>
                    )}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <HousingInfo
                title="Description"
                body={singleApartment.description}
              />
              <HousingInfo title="main rolls" body={singleApartment.rules} />
              <HousingInfo
                title="cancelation policy"
                body={singleApartment.cancelPolicy}
              />
              <Grid container spacing={2} sx={{ mt: "2rem" }}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className="d-flex justify-content-center align-items-center p-3 shadow flex-column"
                >
                  <BalconyIcon color="primary" />
                  Balcony ({singleApartment.apartmentSpecification?.noOfBalcony}
                  )
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className="d-flex justify-content-center align-items-center p-3 shadow flex-column"
                >
                  <BedIcon color="primary" />
                  Beds({singleApartment.apartmentSpecification?.noOfBeds})
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className="d-flex justify-content-center align-items-center p-3 shadow flex-column"
                >
                  <CountertopsIcon color="primary" />
                  Kitchens (
                  {singleApartment.apartmentSpecification?.noOfKitchens})
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className="d-flex justify-content-center align-items-center p-3 shadow flex-column"
                >
                  <WeekendIcon color="primary" />
                  Rooms ({singleApartment.apartmentSpecification?.noOfRooms})
                </Grid>
              </Grid>
              <Box sx={{ mt: 2, mb: 1 }}>
                <Typography variant="h5" color="initial" sx={{ mb: 4 }}>
                  What this home has to offer
                </Typography>
                <Grid container spacing={2} sx={{ paddingLeft: "18px" }}>
                  {allIcons[0] != undefined &&
                    allIcons.map(
                      (item) =>
                        item.isFound &&
                        counter < 6 && (
                          <Grid item key={item.key} xs={12} sm={6}>
                            <span style={{ display: "none" }}>{counter++}</span>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                              }}
                            >
                              {item.icon}
                              <Typography variant="body1" color="initial">
                                {item.title}
                              </Typography>
                            </Box>
                          </Grid>
                        )
                    )}
                </Grid>
                <MoreOffer allIcons={allIcons} />
              </Box>
              <Divider />
              <ReviewSection />
            </Grid>
            <Grid item md={5} sx={{ position: "sticky", top: 100 }}>
              <Box
                sx={{
                  textAlign: "center",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  padding: "10px",
                  width: "fit-content",
                  margin: "auto",
                  backgroundColor: "#f2f2f2",
                }}
              >
                <PickerDate
                  reservationsArr={singleApartment.reservationsArr}
                  price={singleApartment.price}
                  id={singleApartment._id}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        <SkeletonPageDetails />
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
            variant="h5"
            component="h2"
            sx={{ mb: 2 }}
          >
            Share Apartment :
          </Typography>
          {/*//! here we will mapping on item coming from db */}

          {socialIcons.map((item, index) => {
            return (
              <item.component
                className="m-2"
                key={index}
                title={
                  "Welcome home! Our modern, spacious apartment is waiting for you. Schedule a tour today to experience the perfect living space."
                }
                url={currentUrl}
              >
                <item.icon round={true} />
              </item.component>
            );
          })}
        </Box>
      </Modal>
    </>
  );
}
