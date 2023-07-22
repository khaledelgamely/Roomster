const { query, param, body } = require("express-validator");

exports.postValidationArr = [
  body("userId").isMongoId().withMessage("name is not valid objecId "),
  body("price").isNumeric().withMessage("price isn't number"),
  body("type").isString().withMessage("type isn't String "),
  body("title").isString().withMessage("title isn't String "),
  body("description").isString().withMessage("description isn't String "),
  body("apartmentSpecification.noOfBalcony")
    .isNumeric()
    .withMessage("noOfBalcony is't number  "),
  body("apartmentSpecification.noOfRooms")
    .isNumeric()
    .withMessage("noOfRooms isn't number  "),
  body("apartmentSpecification.noOfBeds")
    .isNumeric()
    .withMessage("noOfBeds isn't number  "),
  body("apartmentSpecification.noOfKitchens")
    .isNumeric()
    .withMessage("noOfKitchens isn't number "),
  body("apartmentSpecification.hasWifi")
    .isBoolean()
    .withMessage("hasWifi isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasTv")
    .isBoolean()
    .withMessage("hasTv isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasWasher")
    .isBoolean()
    .withMessage("hasWasher isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasFreeParking")
    .isBoolean()
    .withMessage("hasFreeParking isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasPaidParking")
    .isBoolean()
    .withMessage("hasPaidParking isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasAirConditioning")
    .isBoolean()
    .withMessage("hasAirConditioning isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasDedicatedWorkspace")
    .isBoolean()
    .withMessage("hasDedicatedWorkspace isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasPool")
    .isBoolean()
    .withMessage("hasPool isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasHotTub")
    .isBoolean()
    .withMessage("hasHotTub isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasPatio")
    .isBoolean()
    .withMessage("hasPatio isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasBBQgrill")
    .isBoolean()
    .withMessage("hasBBQgrill isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasOutdoorDiningArea")
    .isBoolean()
    .withMessage("hasOutdoorDiningArea isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasFirePit")
    .isBoolean()
    .withMessage("hasFirePit isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasPoolTable")
    .isBoolean()
    .withMessage("hasPoolTable isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasIndoorFirePlace")
    .isBoolean()
    .withMessage("hasIndoorFirePlace isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasPiano")
    .isBoolean()
    .withMessage("hasPiano isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasExerciseEquipment")
    .isBoolean()
    .withMessage("hasExerciseEquipment isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasLakeAccess")
    .isBoolean()
    .withMessage("hasLakeAccess isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasBeachAccess")
    .isBoolean()
    .withMessage("hasBeachAccess isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasSkiInSkiOut")
    .isBoolean()
    .withMessage("hasSkiInSkiOut isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasOutdoorShower")
    .isBoolean()
    .withMessage("hasOutdoorShower isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasSmokeAlarm")
    .isBoolean()
    .withMessage("hasSmokeAlarm isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasFirstAidKit")
    .isBoolean()
    .withMessage("hasFirstAidKit isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasFireExtinguisher")
    .isBoolean()
    .withMessage("hasFireExtinguisher isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasCarbonMonoxideAlarm")
    .isBoolean()
    .withMessage("hasCarbonMonoxideAlarm isn't boolean ")
    .optional(),
  body("location.country").isString().withMessage("country isn't String "),
  body("location.city").isString().withMessage("city isn't String "),
  body("location.street").isString().withMessage("street isn't String "),
  body("location.description")
    .isString()
    .withMessage("description isn't String "),
  body("location.building").isNumeric().withMessage("building isn't number  "),
  body("location.floorNo").isNumeric().withMessage("floorNo isn't number "),
  body("cancelPolicy").isArray().withMessage("cancelPolicy is not array"),
  body("cancelPolicy.*")
    .isString()
    .withMessage("cancelPolicy element is not string")
    .optional(),
  body("rules").isArray().withMessage("rules is not array"),
  body("rules.*")
    .isString()
    .withMessage("rules element is not string")
    .optional(),
  body("published")
    .isBoolean()
    .withMessage("published must be boolean")
    .optional(),
];

exports.putValidationArr = [
  body("userId")
    .isMongoId()
    .withMessage("name is not valid objectId ")
    .optional(),
  body("price").isNumeric().withMessage("price isn't number  ").optional(),
  body("type").isString().withMessage("type isn't String ").optional(),
  body("title").isString().withMessage("title isn't String ").optional(),
  body("description")
    .isString()
    .withMessage("description isn't String ")
    .optional(),
  body("apartmentSpecification.noOfBalcony")
    .notEmpty()
    .withMessage("noOfBalcony is empty")
    .isNumeric()
    .withMessage("noOfBalcony is't number  ")
    .optional(),
  body("apartmentSpecification.noOfRooms")
    .notEmpty()
    .withMessage("noOfRooms is empty")
    .isNumeric()
    .withMessage("noOfRooms isn't number")
    .optional(),
  body("apartmentSpecification.noOfBeds")
    .notEmpty()
    .withMessage("noOfBeds is empty")
    .isNumeric()
    .withMessage("noOfBeds isn't number  ")
    .optional(),
  body("apartmentSpecification.noOfKitchens")
    .isNumeric()
    .withMessage("noOfKitchens isn't number ")
    .optional(),
  body("apartmentSpecification.hasWifi")
    .isBoolean()
    .withMessage("hasWifi isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasTv")
    .isBoolean()
    .withMessage("hasTv isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasWasher")
    .isBoolean()
    .withMessage("hasWasher isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasFreeParking")
    .isBoolean()
    .withMessage("hasFreeParking isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasPaidParking")
    .isBoolean()
    .withMessage("hasPaidParking isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasAirConditioning")
    .isBoolean()
    .withMessage("hasAirConditioning isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasDedicatedWorkspace")
    .isBoolean()
    .withMessage("hasDedicatedWorkspace isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasPool")
    .isBoolean()
    .withMessage("hasPool isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasHotTub")
    .isBoolean()
    .withMessage("hasHotTub isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasPatio")
    .isBoolean()
    .withMessage("hasPatio isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasBBQgrill")
    .isBoolean()
    .withMessage("hasBBQgrill isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasOutdoorDiningArea")
    .isBoolean()
    .withMessage("hasOutdoorDiningArea isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasFirePit")
    .isBoolean()
    .withMessage("hasFirePit isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasPoolTable")
    .isBoolean()
    .withMessage("hasPoolTable isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasIndoorFirePlace")
    .isBoolean()
    .withMessage("hasIndoorFirePlace isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasPiano")
    .isBoolean()
    .withMessage("hasPiano isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasExerciseEquipment")
    .isBoolean()
    .withMessage("hasExerciseEquipment isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasLakeAccess")
    .isBoolean()
    .withMessage("hasLakeAccess isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasBeachAccess")
    .isBoolean()
    .withMessage("hasBeachAccess isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasSkiInSkiOut")
    .isBoolean()
    .withMessage("hasSkiInSkiOut isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasOutdoorShower")
    .isBoolean()
    .withMessage("hasOutdoorShower isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasSmokeAlarm")
    .isBoolean()
    .withMessage("hasSmokeAlarm isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasFirstAidKit")
    .isBoolean()
    .withMessage("hasFirstAidKit isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasFireExtinguisher")
    .isBoolean()
    .withMessage("hasFireExtinguisher isn't boolean ")
    .optional(),
  body("apartmentSpecification.hasCarbonMonoxideAlarm")
    .isBoolean()
    .withMessage("hasCarbonMonoxideAlarm isn't boolean ")
    .optional(),
  body("location.country")
    .isString()
    .withMessage("country isn't String ")
    .optional(),
  body("location.city").isString().withMessage("city isn't String ").optional(),
  body("location.street")
    .isString()
    .withMessage("street isn't String ")
    .optional(),
  body("location.description")
    .isString()
    .withMessage("description isn't String ")
    .optional(),
  body("location.building")
    .isNumeric()
    .withMessage("building isn't number  ")
    .optional(),
  body("location.floorNo")
    .isNumeric()
    .withMessage("floorNo isn't number  ")
    .optional(),
  body("cancelPolicy")
    .isArray()
    .withMessage("cancelPolicy is not array")
    .optional(),
  body("cancelPolicy.*")
    .isString()
    .withMessage("cancelPolicy element is not string")
    .optional(),
  body("rules").isArray().withMessage("rules is not array").optional(),
  body("rules.*")
    .isString()
    .withMessage("rules element is not string")
    .optional(),
  body("published")
    .isBoolean()
    .withMessage("published must be boolean")
    .optional(),
];

exports.getSpecifiedApartmentById = [
  param("id").isMongoId().withMessage("id isn't objectId"),
];

exports.rentApartment = [
  param("id").isMongoId().withMessage("apartment id isn't objectId"),
  body("userId").isMongoId().withMessage("user id isn't objectId"),
  body("endDate").custom((value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error("endDate is not a valid date");
    }
    return true;
  }),
  body("startDate").custom((value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error("endDate is not a valid date");
    }
    return true;
  }),
  body("totalPrice")
    .isNumeric()
    .withMessage("totalPrice isn't number")
    .optional(),
];

exports.cancelRent = [
  param("id").isMongoId().withMessage("reservation id isn't objectId"),
  body("userId").isMongoId().withMessage("user id isn't objectId"),
];
