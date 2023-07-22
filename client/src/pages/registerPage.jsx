import { useFormik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Roomster from '../API/config';
import { useNavigate } from 'react-router';
import { toastMessage } from '../utils/toasfiy';

function Signup() {
const navigate= useNavigate();
async function addUser(values){
    try{
        await  Roomster.post('auth/signup',values);
        toastMessage("success","An account has been created")
    }catch(error){
        toastMessage("error",error)
    }
}
const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(15, "First name must be 15 characters or less")
        .required("First name is required").matches(/^[a-zA-Z ]+$/, "First name can only contain letters and spaces"),
    lastName: Yup.string()
        .max(20, "Last name must be 20 characters or less")
        .required("Last name is required").matches(/^[a-zA-Z ]+$/, "Last name can only contain letters and spaces"),
    fullName: Yup.string()
        .matches(/^[a-zA-Z ]+$/, "Full name can only contain letters and spaces")
        .max(50, "Full name must be 50 characters or less")
        .required("Full name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
        address: Yup.object().shape({
            country: Yup.string()
                .matches(/^[a-zA-Z ]+$/, "Country name can only contain letters and spaces")
                .required("Country is required"),
            city: Yup.string()
                .max(30, "City name must be 30 characters or less")
                .required("City is required").matches(/^[a-zA-Z ]+$/, "City name can only contain letters and spaces"),
    }),});

const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: validationSchema,
    // validateOnBlur: true, 
    validateOnChange: true, 

    onSubmit: (values) => {
    addUser(values);
    navigate('/login')
    },});
    const styles = {
        errorText: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: '0.2rem',
        },
        };

    return (
        <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs" sx={{ marginBottom: "50px" }}  >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: {sm:8,lg:8},
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && <div style={styles.errorText}>{formik.errors.firstName}</div>}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && <div style={styles.errorText}>{formik.errors.lastName}</div>}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    name="fullName"
                                    autoComplete="name"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                    error={formik.touched?.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName &&<div style={styles.errorText}>{formik.errors.fullName}</div>}/>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="address.country"
                                label="Country"
                                name="address.country"
                                autoComplete="country"
                                value={formik.values.address.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address?.country && Boolean(formik.errors.address?.country)}
                                helperText={formik.touched.address?.country && <div style={styles.errorText}>{formik.errors.address?.country}</div>}
/>
                            </Grid>
                            <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="address.city"
                                    label="City"
                                    name="address.city"
                                    autoComplete="city"
                                    value={formik.values.address.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}                                    
                                    error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
                                    helperText={formik.touched.address?.city && <div style={styles.errorText}>{formik.errors.address?.city}</div>} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && <div style={styles.errorText}>{formik.errors.email}</div>}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
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
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && <div style={styles.errorText}>{formik.errors.password}</div>}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && <div style={styles.errorText}>{formik.errors.confirmPassword}</div>} />
                            </Grid>                          
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="./login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Signup;