import {
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/dashboardComponent/Header";
import Roomster from "../../../API/config";
import { useState } from "react";

function CreateUser () {

  const handleFormSubmit = async (values) => {
    try {
      await Roomster.post("auth/signup", values);
      resetFormValues();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const checkoutSchema = yup.object().shape({
    firstName: yup.string()
        .max(15, "First name must be 15 characters or less")
        .required("First name is required").matches(/^[a-zA-Z ]+$/, "First name can only contain letters and spaces"),
    lastName: yup.string()
        .max(20, "Last name must be 20 characters or less")
        .required("Last name is required").matches(/^[a-zA-Z ]+$/, "Last name can only contain letters and spaces"),
    fullName: yup.string()
        .matches(/^[a-zA-Z ]+$/, "Full name can only contain letters and spaces")
        .max(50, "Full name must be 50 characters or less")
        .required("Full name is required"),
    email: yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
        address: yup.object().shape({
            country: yup.string()
                .matches(/^[a-zA-Z ]+$/, "Country name can only contain letters and spaces")
                .required("Country is required"),
            city: yup.string()
                .max(30, "City name must be 30 characters or less")
                .required("City is required").matches(/^[a-zA-Z ]+$/, "City name can only contain letters and spaces"),
    }),});

  const initialValues = {
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: {
      country: "",
      city: "",
    },
    // isAdmin: false,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const resetFormValues = () => {
    setFormValues(initialValues);
  };

 

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={formValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  
                  sx={{ gridColumn: "span 2" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  name="fullName"
                  error={!!touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Country"
                  name="address.country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address.country}
                  error={
                    !!touched.address?.country && !!errors.address?.country
                  }
                  helperText={
                    touched.address?.country && errors.address?.country
                  }
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="City"
                  name="address.city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address.city}
                  error={!!touched.address?.city && !!errors.address?.city}
                  helperText={touched.address?.city && errors.address?.city}
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Confrim Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 4" }}
                />
              </Grid>
              {/* <Grid item sm={12}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="user-role-select">User Role</InputLabel>
                  <Select
                    labelId="user-role-select"
                    id="user-role-select"
                    value={values.isAdmin}
                    name="isAdmin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
            </Grid>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                sx={{ mb: 2 }}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default CreateUser;
