import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";


import HomeIcon from '@mui/icons-material/Home';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import CabinIcon from '@mui/icons-material/Cabin';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import { styled } from '@mui/system';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import SailingIcon from '@mui/icons-material/Sailing';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CameraOutdoorOutlinedIcon from '@mui/icons-material/CameraOutdoorOutlined';
import GiteOutlinedIcon from '@mui/icons-material/GiteOutlined';
import { useState, useEffect } from "react";
import { getApartments } from "../../store/Slices/apartment.js";
import { useDispatch } from "react-redux";



const CustomG = styled(Grid)({
  width: "21%",
  height: 100,
  border: '2px solid #ddd',
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",

  '&:hover': {
    borderColor: "#000",
  },
  '&.selected': {
    borderColor: "#000",
  },
});


const CustomGrid = styled(Grid)({
  border: '1px solid #ddd',
  margin: '0 4px',
  padding: '9px 0',
  borderRadius: '15px',
  width: '8%',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    borderColor: "#000",
  },
  '&.selected': {
    backgroundColor: "#000",
    color: "#fff"
  },
})


export default function FilterButton() {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [clicked, setIsClicked] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedPartId, setSelectedPartId] = useState({
    roomNo: null,
    kitchenNo: null,
    balconyNo: null,
    bedNo: null,
  });
  const [wholeObj, setWholeObj] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const dispatch = useDispatch();



  const queryString = Object.entries(wholeObj)
    .filter(([key, value]) => value !== '' && value !== null && value !== undefined)
    .map(([key, value]) => {
      if (key === 'minPrice') {
        return `price[lt]=${encodeURIComponent(value)}`;
      } else if (key === 'maxPrice') {
        return `price[gt]=${encodeURIComponent(value)}`;
      } else if (key === 'type') {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      return `apartmentSpecification.${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

  useEffect(() => {
    dispatch(getApartments({ filterString: queryString, keyword: "" }))
  }, [queryString]);


  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setWholeObj(prevValues => ({ ...prevValues, [name]: checked }));
  };

  function handlePropertyTypeClick(id, title) {
    if (wholeObj.hasOwnProperty("type")) {
      if (wholeObj.type == title) {
        setSelectedPropertyId(null);
        setWholeObj((prev) => {
          const updatedApartmentSpec = { ...prev }
          delete updatedApartmentSpec["type"];
          return updatedApartmentSpec
        })
      } else {
        setSelectedPropertyId(id)
        setWholeObj((prev) => {
          return { ...prev, type: title }
        })
      }


    } else {
      setSelectedPropertyId(id);
      setIsClicked(!clicked)
      setWholeObj({ ...wholeObj, type: title })
    }
  }

function handleItemClick(type, state, id, ele) {
  if (wholeObj.hasOwnProperty(type)) {
    if (wholeObj[type] == ele) {
      setSelectedPartId({ ...selectedPartId, [state]: null });
      setWholeObj((prev) => {
        const updatedApartmentSpec = { ...prev }
        delete updatedApartmentSpec[type];
        return updatedApartmentSpec
      })
    } else {
      setSelectedPartId({ ...selectedPartId, [state]: id });
      setWholeObj((prev) => {
        return { ...prev, [type]: ele }
      })
    }
  } else {
    setSelectedPartId({ ...selectedPartId, [state]: id });;
    setIsClicked(!clicked)
    setWholeObj({ ...wholeObj, [type]: ele })
  }
}



  let apartments = [
    {
      key: 1,
      icon: <HomeIcon />,
      title: "home"
    },
    {
      key: 2,
      icon: <NightShelterOutlinedIcon />,
      title: "room"
    },
    {
      key: 3,
      icon: <MapsHomeWorkIcon />,
      title: "home in farm"
    },
    {
      key: 4,
      icon: <CabinIcon />,
      title: "boat"
    },
    {
      key: 5,
      icon: <HouseSidingIcon />,
      title: "hut"
    },
    {
      key: 6,
      icon: <SailingIcon />,
      title: "castle"
    },
    {
      key: 7,
      icon: <EventSeatIcon />,
      title: "bed and breakfast"
    },
    {
      key: 8,
      icon: <CameraOutdoorOutlinedIcon />,
      title: "camper van"
    },
    {
      key: 9,
      icon: <GiteOutlinedIcon />,
      title: "Cycladic house"
    },
    {
      key: 10,
      icon: <NightShelterOutlinedIcon />,
      title: "Shipping container"
    },

  ]


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment >
      <Button
        sx={{
          border: "1px solid #ddd",
          justifyContent: "space-between",
          borderRadius: 2,
          textTransform: "capitalize",
          color: "theme.palette.text.primary",
          textAlign: 'cnter',
          width: '100%',
          height: '45px',

        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Filter
        <FilterAltOutlinedIcon />
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 140 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
            />
          </Box>
        </DialogContent>
        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />


        <DialogTitle fontWeight="bold">Price range</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The average nightly price is $248
          </DialogContentText>
          <DialogContentText>
            <Box
              component="form"
              sx={{
                display: "flex",
                m: "10px 0",
                width: "fit-content",
                '& > :not(style)': { m: 0.7, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-controlled"
                label="min price"
                value={wholeObj.minPrice}
                onChange={(event) => {
                  setWholeObj({ ...wholeObj, minPrice: +event.target.value })

                }}
              />
              <TextField
                id="outlined-controlled"
                label="max price"
                value={wholeObj.maxPrice}
                onChange={(event) => {
                  setWholeObj((prev) => ({ ...prev, maxPrice: +event.target.value }))
                }}
              />
            </Box>
          </DialogContentText>
        </DialogContent>

        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />


        <DialogTitle fontWeight="bold">Rooms, Kitchens and Balcony </DialogTitle>
        <DialogContent>
          <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <DialogContentText>number of rooms</DialogContentText>
            <Grid sx={{ display: 'flex', }}>
              {["Any", 1, 2, 3, 4, 5, 6].map((item, id) => (
                <CustomGrid item key={id}
                  className={selectedPartId.roomNo == id ? 'selected' : ''}
                  onClick={() => handleItemClick("noOfRooms", "roomNo", id, item)}
                >
                  {item}
                </CustomGrid>
              ))}
            </Grid>
            <DialogContentText>number of kitchens</DialogContentText>
            <Grid sx={{ display: 'flex', }}>
              {["Any", 1, 2, 3, 4, 5, 6].map((item, id) => (
                <CustomGrid item key={id}
                  className={selectedPartId.kitchenNo == id ? 'selected' : ''}
                  onClick={() => handleItemClick("noOfKitchens", "kitchenNo", id, item)}
                >
                  {item}
                </CustomGrid>
              ))}
            </Grid>
            <DialogContentText>number of balcony</DialogContentText>
            <Grid sx={{ display: 'flex', }}>
              {["Any", 1, 2, 3, 4, 5, 6].map((item, id) => (
                <CustomGrid item key={id}
                  className={selectedPartId.balconyNo == id ? 'selected' : ''}
                  onClick={() => handleItemClick("noOfBalcony", "balconyNo", id, item)}
                >
                  {item}
                </CustomGrid>
              ))}
            </Grid>
            <DialogContentText>number of Beds</DialogContentText>
            <Grid sx={{ display: 'flex', }}>
              {["Any", 1, 2, 3, 4, 5, 6].map((item, id) => (
                <CustomGrid item key={id}
                  className={selectedPartId.bedNo == id ? 'selected' : ''}
                  onClick={() => handleItemClick("noOfBeds", "bedNo", id, item)}
                >
                  {item}
                </CustomGrid>
              ))}
            </Grid>
          </Grid>
        </DialogContent>

        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />

        <DialogTitle fontWeight="bold">Property type</DialogTitle>
        <DialogContent>
          <Grid container sx={{ display: 'flex', gap: 2 }}>
            {apartments.map((apart, i) => (
              <CustomG item key={i}
                className={selectedPropertyId == apart.key ? 'selected' : ''}
                onClick={() => handlePropertyTypeClick(apart.key, apart.title)}
              >
                <Box sx={{ fontSize: 3 }} >{apart.icon}</Box>
                <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>
              </CustomG>
            ))}
          </Grid>
        </DialogContent>


        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />

        <DialogTitle fontWeight="bold">Amenities</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox name="hasPool" onChange={handleCheckboxChange} />} label="Pool" />
              <FormControlLabel control={<Checkbox name="hasHotTub" onChange={handleCheckboxChange} />} label="Hot tube" />
              <FormControlLabel control={<Checkbox name="hasPatio" onChange={handleCheckboxChange} />} label="Patio" />
              <FormControlLabel control={<Checkbox name="hasBBQgrill" onChange={handleCheckboxChange} />} label="BBQ grill" />
              <FormControlLabel control={<Checkbox name="hasOutdoorDiningArea" onChange={handleCheckboxChange} />} label="Outdoor dining area" />
              <FormControlLabel control={<Checkbox name="hasFirePit" onChange={handleCheckboxChange} />} label="Fire Pit" />
              <FormControlLabel control={<Checkbox name="hasPoolTable" onChange={handleCheckboxChange} />} label="Pool table" />
            </FormGroup>
            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox name="hasIndoorFirePlace" onChange={handleCheckboxChange} />} label="Indoor fireplace" />
              <FormControlLabel control={<Checkbox name="hasPiano" onChange={handleCheckboxChange} />} label="Piano" />
              <FormControlLabel control={<Checkbox name="hasExerciseEquipment" />} label="Exercise equipment" />
              <FormControlLabel control={<Checkbox name="hasLakeAccess" onChange={handleCheckboxChange} />} label="Lake access" />
              <FormControlLabel control={<Checkbox name="hasBeachAccess" onChange={handleCheckboxChange} />} label="Beach access" />
              <FormControlLabel control={<Checkbox name="hasSkiInSkiOut" onChange={handleCheckboxChange} />} label="Ski-in/Ski-out" />
              <FormControlLabel control={<Checkbox name="hasOutdoorShower" onChange={handleCheckboxChange} />} label="Outdoor shower" />
            </FormGroup>
          </Box>
        </DialogContent>
        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />
        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />

        <DialogTitle fontWeight="bold">Apartment Properties</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <FormGroup sx={{ width: "50%" }}>

              <FormControlLabel control={<Checkbox name="hasWifi" onChange={handleCheckboxChange} />} label="Wifi" />
              <FormControlLabel control={<Checkbox name="hasTv" onChange={handleCheckboxChange} />} label="TV" />
              <FormControlLabel control={<Checkbox name="hasWasher" onChange={handleCheckboxChange} />} label="Washer" />
              <FormControlLabel control={<Checkbox name="hasFreeParking" onChange={handleCheckboxChange} />} label="Free parking on premises" />

            </FormGroup>
            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox name="hasPaidParking" onChange={handleCheckboxChange} />} label="Paid parking on premises" />
              <FormControlLabel control={<Checkbox name="hasAirConditioning" onChange={handleCheckboxChange} />} label="Air conditioning" />
              <FormControlLabel control={<Checkbox name="hasDedicatedWorkspace" onChange={handleCheckboxChange} />} label="Dedicated workspace" />
            </FormGroup>
          </Box>
        </DialogContent>
        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />
        <Divider sx={{
          width: '80%',
          margin: '0 auto',
        }} />

        <DialogTitle fontWeight="bold">Safety Items</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox name="hasSmokeAlarm" onChange={handleCheckboxChange} />} label="Smoke alarm" />
              <FormControlLabel control={<Checkbox name="hasFirstAidKit" onChange={handleCheckboxChange} />} label="First aid kit" />
            </FormGroup>
            <FormGroup sx={{ width: "50%" }}>
              <FormControlLabel control={<Checkbox name="hasFireExtinguisher" onChange={handleCheckboxChange} />} label="Fire extinguisher" />
              <FormControlLabel control={<Checkbox name="hasCarbonMonoxideAlarm" onChange={handleCheckboxChange} />} label="Carbon monoxide alarm" />
            </FormGroup>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}
