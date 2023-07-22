import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Roomster from "../API/config";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import {  fetchUser } from "../store/Slices/userSlice";
import { toastMessage } from "../utils/toasfiy";

function SignInSide() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters") });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnBlur:true,
    onSubmit: async (values) => {
      try {
        const { data } = await Roomster.post("auth/login", values);
        localStorage.setItem("token", data.accessToken);
        console.log(data.accessToken);
        const decodedToken = jwt_decode(data.accessToken);
        console.log("decoded token", decodedToken._id);
        dispatch(fetchUser(decodedToken._id));
        toastMessage('success','login Successfully')
        navigate("/");
      } catch (err) {
        toastMessage('error','email or password is incorrect')
        console.log(err);
      }
    },
  });

  const styles = {
    errorText: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: '0.2rem',
    },
  };
  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: "80vh" }}>
        <CssBaseline />
        <Grid
          item
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ mt: 5 }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                onBlur={formik.handleBlur}
                helperText={formik.touched.email && <div style={styles.errorText}>{formik.errors.email}</div>}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && <div style={styles.errorText}>{formik.errors.password}</div>}
            
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="./register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
