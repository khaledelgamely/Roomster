/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { styled } from "@mui/system";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBanSmoking,
  faBurger,
  faDumbbell,
  faFireBurner,
  faFireExtinguisher,
  faHotTubPerson,
  faHouseFire,
  faKitMedical,
  faMusic,
  faNetworkWired,
  faPersonSkiingNordic,
  faPrescriptionBottle,
  faShower,
  faTable,
  faUmbrellaBeach,
  faUtensils,
  faWater,
  faWaterLadder,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";


const CustomBox = styled(Grid)({
  width: "30%",
  height: 85,
  border: "2px solid #ddd",
  margin: "1%",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",

  "&:hover": {
    borderColor: "#000",
  },
  "&.selected": {
    borderColor: "#000",
  },
});

let apartments = [
  {
    key: 1,
    attr: "hasWifi",
    icon: <WifiOutlinedIcon size="5x" />,
    title: "Wifi",
  },
  {
    key: 2,
    attr: "hasTv",
    icon: <LiveTvIcon size="5x" />,
    title: "TV",
  },
  {
    key: 3,
    attr: "hasWasher",
    icon: <LocalLaundryServiceIcon size="5x" />,
    title: "Washer",
  },
  {
    key: 4,
    attr: "hasFreeParking",
    icon: <LocalParkingIcon size="5x" />,
    title: "Free parking on premises",
  },
  {
    key: 5,
    attr: "hasPaidParking",
    icon: <DirectionsCarFilledIcon size="5x" />,
    title: "Paid parking on premises",
  },
  {
    key: 6,
    attr: "hasAirConditioning",
    icon: <AcUnitIcon size="5x" />,
    title: "Air conditioning",
  },
  {
    key: 7,
    attr: "hasDedicatedWorkspace",
    icon: <FontAwesomeIcon icon={faNetworkWired} />,
    title: "Dedicated workspace",
  },
];

const stanOutAmenities = [
  {
    key: 8,
    attr: "hasPool",
    icon: <FontAwesomeIcon icon={faWaterLadder} />,
    title: "Pool",
  },
  {
    key: 9,
    attr: "hasHotTub",
    icon: <FontAwesomeIcon icon={faHotTubPerson} />,
    title: "Hot tube",
  },
  {
    key: 10,
    attr: "hasPatio",
    icon: <FontAwesomeIcon icon={faPrescriptionBottle} />,
    title: "Patio",
  },
  {
    key: 11,
    attr: "hasBBQgrill",
    icon: <FontAwesomeIcon icon={faBurger} />,
    title: "BBQ grill",
  },
  {
    key: 12,
    attr: "hasOutdoorDiningArea",
    icon: <FontAwesomeIcon icon={faUtensils} />,
    title: "Outdoor dining area",
  },
  {
    key: 13,
    attr: "hasFirePit",
    icon: <FontAwesomeIcon icon={faFireBurner} />,
    title: "Fire Pit",
  },
  {
    key: 14,
    attr: "hasPoolTable",
    icon: <FontAwesomeIcon icon={faTable} />,
    title: "Pool table",
  },
  {
    key: 15,
    attr: "hasIndoorFirePlace",
    icon: <FontAwesomeIcon icon={faHouseFire} />,
    title: "Indoor fireplace",
  },
  {
    key: 16,
    attr: "hasPiano",
    icon: <FontAwesomeIcon icon={faMusic} />,
    title: "Piano",
  },
  {
    key: 17,
    attr: "hasExerciseEquipment",
    icon: <FontAwesomeIcon icon={faDumbbell} />,
    title: "Exercise equipment",
  },
  {
    key: 18,
    attr: "hasLakeAccess",
    icon: <FontAwesomeIcon icon={faWater} />,
    title: "Lake access",
  },
  {
    key: 19,
    attr: "hasBeachAccess",
    icon: <FontAwesomeIcon icon={faUmbrellaBeach} />,
    title: "Beach access",
  },
  {
    key: 20,
    attr: "hasSkiInSkiOut",
    icon: <FontAwesomeIcon icon={faPersonSkiingNordic} />,
    title: "Ski-in/Ski-out",
  },
  {
    key: 21,
    attr: "hasOutdoorShower",
    icon: <FontAwesomeIcon icon={faShower} />,
    title: "Outdoor shower",
  },
];

const safetyItems = [
  {
    key: 22,
    attr: "hasSmokeAlarm",
    icon: <FontAwesomeIcon icon={faBanSmoking} />,
    title: "Smoke alarm",
  },
  {
    key: 23,
    attr: "hasFirstAidKit",
    icon: <FontAwesomeIcon icon={faKitMedical} />,
    title: "First aid kit",
  },
  {
    key: 24,
    attr: "hasFireExtinguisher",
    icon: <FontAwesomeIcon icon={faFireExtinguisher} />,
    title: "Fire extinguisher",
  },
  {
    key: 25,
    attr: "hasCarbonMonoxideAlarm",
    icon: <FontAwesomeIcon icon={faUniversalAccess} />,
    title: "Carbon monoxide alarm",
  },
];
let allThree = [...apartments, ...stanOutAmenities, ...safetyItems];
const TellGuests = ({
  apartment,
  collectedData,
  setCollectedData,
  setIsChoosed,
}) => {
  const [selectedItemId, setSelectedItemId] = useState([]);

  React.useEffect(() => {
    setIsChoosed(false);
    if (apartment) {
      let newSpecifications = {};
      for (const key in apartment.apartmentSpecification) {
        if (
          !["noOfBalcony", "noOfRooms", "noOfBeds", "noOfKitchens"].includes(
            key
          ) &&
          apartment.apartmentSpecification[key] != false
        ) {
          newSpecifications[key] = true;
        }
      }
      setCollectedData({
        ...collectedData,
        apartmentSpecification: {
          ...collectedData.apartmentSpecification,
          ...newSpecifications,
        },
      });
    }
  }, [apartment]);

  React.useEffect(() => {
    if (apartment) {
      allThree.forEach((element) => {
        if (collectedData.apartmentSpecification[`${element.attr}`]) {
          setSelectedItemId((selectedItemId) => [
            ...selectedItemId,
            element.key,
          ]);
        }
      });
    }
  }, [collectedData]);
  // React.useEffect(() => {
  //   setIsChoosed(false);
  //   if (apartment) {
  //     let newSpecifications = {};
  //     for (const key in apartment.apartmentSpecification) {
  //       if (
  //         !["noOfBalcony", "noOfRooms", "noOfBeds", "noOfKitchens"].includes(
  //           key
  //         ) &&
  //         apartment.apartmentSpecification[key] != false
  //       ) {
  //         // console.log(`${key}: ${apartment.apartmentSpecification[key]}`);
  //         newSpecifications[key] = true;
  //       }
  //     }
  //     setCollectedData({
  //       ...collectedData,
  //       apartmentSpecification: {
  //         ...newSpecifications,
  //       },
  //     });
  //     allThree.forEach((element) => {
  //       if (collectedData.apartmentSpecification[`${element.attr}`]) {
  //         // console.log(element);
  //         setSelectedItemId((selectedItemId) => [
  //           ...selectedItemId,
  //           element.key,
  //         ]);
  //       }
  //     });
  //   }
  // }, []);

  function handleClick(id, attr) {
    if (collectedData.apartmentSpecification.hasOwnProperty(attr)) {
      const newArray = selectedItemId.filter((element) => element !== id);
      setSelectedItemId(newArray);
      setCollectedData((prevData) => {
        const updatedApartmentSpec = { ...prevData.apartmentSpecification };
        delete updatedApartmentSpec[attr];
        return { ...prevData, apartmentSpecification: updatedApartmentSpec };
      });
    } else {
      setCollectedData({
        ...collectedData,
        apartmentSpecification: {
          ...collectedData.apartmentSpecification,
          [attr]: true,
        },
      });
      setSelectedItemId([...selectedItemId, id]);
    }
  }

  return (
    <Box>
      <Typography>Tell your guests what tour place has to offer</Typography>
      <Grid
        maxWidth={800}
        container
        sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>

        {apartments.map((apart, i) => (
          <CustomBox
            item
            key={i}
            className={selectedItemId.includes(apart.key) ? "selected" : ""}
            onClick={() => handleClick(apart.key, apart.attr)}>

            <Box>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>
          </CustomBox>
        ))}
      </Grid>
      <Typography>Do you have any standout amenities</Typography>
      <Grid
        maxWidth={800}
        container
        sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>

        {stanOutAmenities.map((apart, i) => (
          <CustomBox
            item
            key={i}
            className={selectedItemId.includes(apart.key) ? "selected" : ""}
            onClick={() => handleClick(apart.key, apart.attr)}>

            <Box>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>
          </CustomBox>
        ))}
      </Grid>
      <Typography>Do you have any of these safety items</Typography>
      <Grid
        maxWidth={800}
        container
        sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        {safetyItems.map((apart, i) => (
          <CustomBox
            item
            key={i}
            className={selectedItemId.includes(apart.key) ? "selected" : ""}
            onClick={() => handleClick(apart.key, apart.attr)}>

            <Box>{apart.icon}</Box>
            <Typography sx={{ textAlign: "center" }}>{apart.title}</Typography>
          </CustomBox>
        ))}
      </Grid>
    </Box>
  );
};

export default TellGuests;
