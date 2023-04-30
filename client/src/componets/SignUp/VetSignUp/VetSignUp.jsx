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
  const [allRequiredError, setallRequiredError] = useState(false);

  const handleChange = (e) => {
    setallRequiredError(false);
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name==='firstName') {
      if (!value.trim()) return setFirstNameError(true);
      setFirstNameError(false);
    }
    if (name==='lastName') {
      if (!value.trim()) return setLastNameError(true);
      setLastNameError(false);
    }
    if (name==='email') {
      if (!value.trim()) return setEmailError(true);
      setEmailError(false);
    }
    if (name==='password') {
      if (!value || value.length<5) return setPasswordError(true);
      setPasswordError(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const createUser = async (e) => {
    e.preventDefault();
    // extract the user data from the state
    const { firstName, lastName, email, password } = state;

    if (!firstName){
      setFirstNameError(true);
      return 
    } 
    if(!lastName){
      setLastNameError(true);
      return
    }  
    if (!email){
      setEmailError(true)
      return
    } 
    if(!password || password.length<5) {
      setPasswordError(true);
      return
    }

      const newVet = {
        firstName,
        lastName,
        email,
        password,
      };
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
    <form onSubmit={createUser}>
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
            { firstNameError && <Alert severity="error">First name is required</Alert>}
            { allRequiredError && <Alert severity="error">* Fields are required</Alert>}
            {lastNameError && <Alert severity="error">Last Name is required</Alert>}
            {emailError && <Alert severity="error">Email is required</Alert>}
            {passwordError && <Alert severity="error">Password Should be at least 5 characters long</Alert>}
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
              type='submit'
            >
              Create Account
            </Button>
          </Box>
          <Divider sx={{ mt: 2 }} />
        </div>
      </section>
      </form>
    </>
  );
};

export default VetSignUp;
