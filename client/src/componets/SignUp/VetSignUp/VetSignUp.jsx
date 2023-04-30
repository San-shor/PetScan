import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Box, Divider, TextField } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import apiVet from "../../../ApiServices/ApiVetServices";
import userWithPet from "../../../assets/signup/user-with-pet.svg";
import "./VetSignUp.css";
import AnnonymousBar from "../../NavBar/AnnonymousBar/AnnonymousBar";
import Alert from '@mui/material/Alert';

// const PASS_MIN_LENGTH = 8; (Legacy: No use )

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const VetSignUp = () => {
  let navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const createUser = async (e) => {
    e.preventDefault();
    // extract the user data from the state
    const { firstName, lastName, email, password } = state;

    if (!firstName.trim()) return console.log('First Name is required');
    if (!lastName.trim()) return console.log('Last Name is required');
    if (!email.trim()) return console.log('Email is required');
    if (!password.trim() || password.length<5) return console.log('Password Should be at least 5 characters long ');

    const newVet = {
      firstName,
      lastName,
      email,
      password,
    };
     
    console.log(newVet);
    
    // send the user data to the server
    try {
      const response = await apiVet.signup(newVet);
      // save the token in the local storage
      const { accessToken, fullName, email, user } = response;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userType", user);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("email", email);
      // navigate to the dashboard
      navigate("/vet/details");
    } catch (error) {
      console.log(error);
    }
  };

  // const validateForm = () => {
  //   return (
  //     state.firstName.length > 0 &&
  //     state.lastName.length > 0 &&
  //     state.email.length > 0 &&
  //     state.password.length > 0 &&
  //     state.confirmPassword.length > 0
  //   );
  // }; (Legacy : never been used)

  return (
    <>
    
      <section className="vet-container">
        <AnnonymousBar />
        <div className="signup-form">
          <div className="vet-header">
            <img className="logo" src={userWithPet} alt="logo" />
            <h1>Create a Vet account</h1>
            {/* <p>
              <b>Or</b>
            </p>
            <span>
              <Link to={"/signin"}>
                <strong>Sign in to an existent account</strong> 
              </Link>
            </span>
            // (Legacy : Unneccessary)  */}
          </div>
          {/* <div className="auth-account">
            <span>Create account with</span>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={3}>
                <Button variant="contained" style={{ width: "25ch" }}>
                  Facebook
                </Button>
                <Button variant="contained" style={{ width: "25ch" }}>
                  Google
                </Button>
              </Stack>
            </Box>
          </div> */}
          <Divider sx={{ mt: 2 }} />
          <div className="form">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            ><Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">First name is required</Alert>
            <Alert severity="error">Last Name is required</Alert>
            <Alert severity="error">Email is required</Alert>
            <Alert severity="error">Password Should be at least 5 characters long</Alert>
          </Stack>
              <TextField
                required
                name="firstName"
                label="First Name"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                required
                name="lastName"
                label="Last Name"
                variant="outlined"
                onChange={handleChange}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "52ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                name="email"
                label="Email"
                variant="outlined"
                type='email'
                onChange={handleChange}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "52ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                name="password"
                label="Password"
                variant="outlined"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {/* <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "52ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box> */}
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: 1,
            }}
          >
            <Button
              variant="contained"
              style={{ width: "52ch" }}
              onClick={createUser}
            >
              Create Account
            </Button>
          </Box>
          <Divider sx={{ mt: 2 }} />
        </div>
      </section>
    </>
  );
};

export default VetSignUp;
