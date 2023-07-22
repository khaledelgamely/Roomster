import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";
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
  faMoneyBill,
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
const icons = [
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
export const createAllIcons = (data) => {
  return icons.map((item) => {
    if (data) {
      item.isFound = data[`${item?.attr}`];
      return item;
    }
  });
};
