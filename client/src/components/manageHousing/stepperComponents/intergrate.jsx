/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  IconButton,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { countries } from "./countries.jsx";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdRemoveCircleOutline } from "react-icons/md";
import image1 from "../../../assets/c0634c73-9109-4710-8968-3e927df1191c.webp";
import image2 from "../../../assets/bfc0bc89-58cb-4525-a26e-7b23b750ee00.webp";

function Comp1({ setIsChoosed }) {
  React.useEffect(() => {
    setIsChoosed(false);
  }, []);
  return (
    <Box display="flex" justifyContent="center">
      <Grid container spacing={8} style={{ overflow: "hidden" }}>
        <Grid item xs={12} md={4}>
          <Typography
            variant="h4"
            align="center"
            style={{ fontFamily: "Montserrat" }}>
            It is easy to get started on Roomster
          </Typography>
          <img
            src="https://cdn.dribbble.com/users/9969/screenshots/3625570/housebuild.gif"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={8} container direction="column" spacing={6}>
          <Grid item>
            <Box display="flex" alignItems="center">
              <img
                src={image1}
                alt="Roomster Step 1"
                width={150}
                height={120}
              />
              <div>
                <Typography
                  variant="h5"
                  style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
                  1. Tell us about your place
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ marginLeft: "10px" }}>
                  Share some basic info, like where it is and how many guests
                  can stay.
                </Typography>
              </div>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <img
                src={image2}
                alt="Roomster Step 2"
                width={150}
                height={120}
              />
              <div>
                <Typography
                  variant="h5"
                  style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
                  2. Make it stand out
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ marginLeft: "10px" }}>
                  Add 5 or more photos plus a title and description—we’ll help
                  you out.
                </Typography>
              </div>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <img
                src={image2}
                alt="Roomster Step 3"
                width={150}
                height={120}
              />
              <div>
                <Typography
                  variant="h5"
                  style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
                  3. Finish up and publish
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ marginLeft: "10px" }}>
                  Choose if you would like to start with an experienced guest,
                  set a starting price and publish your listing.
                </Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

function Comp2({ collectedData, setCollectedData, setIsChoosed, apartment }) {
  React.useEffect(() => {
    if (apartment) {
      setCollectedData({
        ...collectedData,
        location: {
          building: apartment.location.building,
          city: apartment.location.city,
          country: { label: apartment.location.country },
          description: apartment.location.description,
          floorNo: apartment.location.floorNo,
          street: apartment.location.street,
        },
      });
      console.log("here");
    }

    // console.log("asdasdasd", collectedData.location.city, apartment.location);
  }, []);
  React.useEffect(() => {
    const isFormFilled = Object.values(collectedData.location).every(
      (value) => value !== ""
    );
    setIsChoosed(!isFormFilled);
  }, [collectedData.location]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container display="flex" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <Grid item xs={12} sm={12} md={12}>
          <Autocomplete
            id="country-select-demo"
            options={countries}
            value={collectedData.location.country}
            onChange={(e, value) => {
              setCollectedData({
                ...collectedData,
                location: { ...collectedData.location, country: value },
              });
            }}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
          <Box
            sx={{
              width: 506,
              maxWidth: "100%",
            }}
            style={{ marginTop: 10 }}
            value={collectedData.location.city}
            onChange={(e) => {
              setCollectedData({
                ...collectedData,
                location: { ...collectedData.location, city: e.target.value },
              });
            }}>
            <TextField
              fullWidth
              label="Enter The City"
              id="City"
              value={collectedData.location.city}
            />

          </Box>
          <Box
            sx={{
              width: 506,
              maxWidth: "100%",
            }}
            style={{ marginTop: 10 }}
            value={collectedData.location.street}
            onChange={(e) => {
              setCollectedData({
                ...collectedData,
                location: { ...collectedData.location, street: e.target.value },
              });
            }}>
            <TextField
              fullWidth
              label="Street Name"
              id="Street"
              value={collectedData.location.street}
            />
          </Box>
          <Box
            sx={{
              width: 506,
              maxWidth: "100%",
            }}
            style={{ marginTop: 10 }}
            value={collectedData.location.building}
            onChange={(e) => {
              setCollectedData({
                ...collectedData,
                location: {
                  ...collectedData.location,
                  building: e.target.value,
                },
              });
            }}>
            <TextField
              fullWidth
              label="Building Number"
              id="Building"
              type="number"
              value={collectedData.location.building}
            />

          </Box>
          <Box
            sx={{
              width: 506,
              maxWidth: "100%",
            }}
            style={{ marginTop: 10 }}
            value={collectedData.location.floorNo}
            onChange={(e) => {
              setCollectedData({
                ...collectedData,
                location: {
                  ...collectedData.location,
                  floorNo: e.target.value,
                },
              });
            }}>
            <TextField
              fullWidth
              label="Floor Number"
              id="floor"
              type="number"
              value={collectedData.location.floorNo}
            />
          </Box>
          <Box
            sx={{
              width: 506,
              maxWidth: "100%",
            }}
            style={{ marginTop: 10 }}
            value={collectedData.location.description}
            onChange={(e) => {
              setCollectedData({
                ...collectedData,
                location: {
                  ...collectedData.location,
                  description: e.target.value,
                },
              });
            }}>
            <TextField
              fullWidth
              label="Description"
              id="description"
              value={collectedData.location.description}
            />
          </Box>
        </Grid>
      </form>
    </Grid>
  );
}

function Comp3({ collectedData, setCollectedData, setIsChoosed, apartment }) {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sections = ["rooms", "balconies", "beds", "kitchens"];
  const sectionsObj = ["noOfRooms", "noOfBalcony", "noOfBeds", "noOfKitchens"];

  React.useEffect(() => {
    setIsChoosed(false);
    if (apartment) {
      setCounts([
        apartment.apartmentSpecification.noOfRooms || 0,
        apartment.apartmentSpecification.noOfBalcony || 0,
        apartment.apartmentSpecification.noOfBeds || 0,
        apartment.apartmentSpecification.noOfKitchens || 0,
      ]);
      setCollectedData({
        ...collectedData,
        apartmentSpecification: {
          ...collectedData.apartmentSpecification,
          noOfRooms: apartment.apartmentSpecification.noOfRooms || 0,
          noOfBalcony: apartment.apartmentSpecification.noOfBalcony || 0,
          noOfBeds: apartment.apartmentSpecification.noOfBeds || 0,
          noOfKitchens: apartment.apartmentSpecification.noOfKitchens || 0,
        },
      });
    }
  }, []);

  const increment = (index, property) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
    setCollectedData((prevData) => ({
      ...prevData,
      apartmentSpecification: {
        ...prevData.apartmentSpecification,
        [property]: prevData.apartmentSpecification[property] + 1,
      },
    }));
  };

  const decrement = (index, property) => {
    if (counts[index] > 0) {
      const newCounts = [...counts];
      newCounts[index] -= 1;
      setCounts(newCounts);
      setCollectedData((prevData) => ({
        ...prevData,
        apartmentSpecification: {
          ...prevData.apartmentSpecification,
          [property]: prevData.apartmentSpecification[property] - 1,
        },
      }));
    }
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      direction="column"
      alignItems="center">
      {counts.map((count, index) => (
        <Grid
          key={index}
          container
          display="flex"
          justifyContent="space-between"
          direction="row"
          alignItems="center">
          <Typography
            variant="h5"
            style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: 25 }}>
            {sections[index]}
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton
              color="primary"
              onClick={() => increment(index, sectionsObj[index])}>
              <AiOutlinePlusCircle />
            </IconButton>
            <span
              style={{
                fontSize: "22px",
                fontWeight: 800,
                fontFamily: "serifs",
                marginRight: 1,
                marginLeft: 1,
              }}>
              {count}
            </span>
            <IconButton
              color="danger"
              onClick={() => decrement(index, sectionsObj[index])}>
              <MdRemoveCircleOutline />
            </IconButton>
          </Box>
          <Divider sx={{ width: { md: "100%", sm: "100%", xs: "100%" } }} />
        </Grid>
      ))}
    </Grid>
  );
}

function Comp4({ collectedData, setCollectedData, setIsChoosed, apartment }) {
  const [text, setText] = useState("");
  React.useEffect(() => {
    setIsChoosed(false);
    if (apartment) {
      setText(apartment.title);
      setCollectedData({
        ...collectedData,
        title: apartment.title,
      });
    }
  }, []);
  const handleChange = (event) => {
    setText(event.target.value);
    setCollectedData({ ...collectedData, title: text });
    setIsChoosed(!(text.trim().length >= 4));
  };
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} sm={12} md={12}>
        <Box width="100%" textAlign="center">
          <TextareaAutosize
            aria-label="minimum height"
            rows={6}
            placeholder="Enter your title here (It must be at least 5 characters)"
            value={text}
            onChange={handleChange}
            style={{
              height: "300px",
              width: "100%",
              fontSize: 20,
              borderWidth: 2,
              borderColor: "green",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

function Comp5({ collectedData, setCollectedData, setIsChoosed, apartment }) {
  const [text, setText] = useState("");
  React.useEffect(() => {
    setIsChoosed(false);
    if (apartment) {
      setText(apartment.description);
      setCollectedData({
        ...collectedData,
        description: apartment.description,
      });
    }
  }, []);
  const handleChange = (event) => {
    setText(event.target.value);
    setCollectedData({ ...collectedData, description: text });
    setIsChoosed(!(text.trim().length >= 19));
  };
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} sm={12} md={12}>
        <Box width="100%" textAlign="center">
          <TextareaAutosize
            aria-label="minimum height"
            rows={6}
            placeholder="Enter your apartment description here (It must be at least 20 characters)"
            value={text}
            onChange={handleChange}
            style={{
              height: "300px",
              width: "100%",
              fontSize: 20,
              borderWidth: 2,
              borderColor: "green",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

function Policy({ collectedData, setCollectedData, setIsChoosed, apartment }) {
  const [text, setText] = useState("");

  const policyArray = text.split(",");

  const handleChange = (event) => {
    setText(event.target.value);
    setCollectedData({ ...collectedData, cancelPolicy: policyArray });
    setIsChoosed(!(text.trim().length >= 4));
  };

  React.useEffect(() => {
    setIsChoosed(false);
    if (apartment) {
      setText(apartment.cancelPolicy.join(","));
      setCollectedData({
        ...collectedData,
        cancelPolicy: apartment.cancelPolicy,
      });
    }
  }, []);
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} sm={12} md={12}>
        <Box width="100%" textAlign="center">
          <TextareaAutosize
            aria-label="minimum height"
            rows={6}
            placeholder="Enter your Policies here separated by ','"
            value={text}
            onChange={handleChange}
            style={{
              height: "300px",
              width: "100%",
              fontSize: 20,
              borderWidth: 2,
              borderColor: "green",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

function Rules({ collectedData, setCollectedData, setIsChoosed, apartment }) {
  const [text, setText] = useState("");

  React.useEffect(() => {
    setIsChoosed(false);
    if (apartment) {
      setText(apartment.rules.join(","));
      setCollectedData({
        ...collectedData,
        rules: apartment.rules,
      });
    }
  }, []);

  const policyArray = text.split(",");

  const handleChange = (event) => {
    setText(event.target.value);
    setCollectedData({ ...collectedData, rules: policyArray });
    setIsChoosed(!(text.trim().length >= 4));
  };
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} sm={12} md={12}>
        <Box width="100%" textAlign="center">
          <TextareaAutosize
            aria-label="minimum height"
            rows={6}
            placeholder="Enter your Rules here separated by ','"
            value={text}
            onChange={handleChange}
            style={{
              height: "300px",
              width: "100%",
              fontSize: 20,
              borderWidth: 2,
              borderColor: "green",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

function PriceComponent({
  collectedData,
  setCollectedData,
  setIsChoosed,
  apartment,
}) {
  const [text, setText] = useState(0);

  React.useEffect(() => {
    setIsChoosed(false);
    if (apartment) {
      setText(apartment.price);
      setCollectedData({
        ...collectedData,
        price: apartment.price,
      });
    }
  }, []);

  const handleChange = (event) => {
    setText(event.target.value);
    setCollectedData({ ...collectedData, price: text });
    // setIsChoosed(!(text.trim().length >= 4));
  };
  return (
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} sm={12} md={12}>
        <Box width="100%" textAlign="center">
          <TextField
            fullWidth
            label="price"
            id="price"
            type="number"
            value={text}
            onChange={handleChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

function Comp6() {
  return (
    <Box display="flex" justifyContent="center">
      <Grid container spacing={6} style={{ overflow: "hidden" }}>
        <Grid item xs={12} md={6}>
          <img
            src="https://cdn.dribbble.com/users/152834/screenshots/2200351/bpd-steps.gif"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={6} container direction="column" spacing={6}>
          <Grid item>
            <Box display="flex" alignItems="center" flexDirection="column">
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Comfortaa",
                  fontSize: 40,
                  fontWeight: 700,
                  marginBottom: "80px",
                }}>
                {" "}
                Completion and publication
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ fontSize: 20, marginLeft: "10px" }}>
                Finally, you will choose if you want to start with an
                experienced guest, and then you will set the price per
                night,Answer a few quick questions and post your ad when you're
                ready
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export {
  Comp1,
  Comp2,
  Comp3,
  Comp4,
  Comp5,
  Policy,
  Rules,
  PriceComponent,
  Comp6,
};
