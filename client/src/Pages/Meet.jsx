import { createContext, useEffect, useState, useCallback } from "react";
import apiClient from "../ApiServices/ApiClientService";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import StepOne from "../componets/MultiStepForm/StepOne/StepOne";
import StepTwo from "../componets/MultiStepForm/StepTwo/StepTwo";
import StepThree from "../componets/MultiStepForm/StepThree/StepThree";
import ProfileNavBar from "../componets/NavBar/ProfileNavBar/ProfileNavBar";
import Success from "../componets/Success/Success";
import HomeNavBar from "../componets/NavBar/HomeNavBar/HomeNavBar";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Dog from '../Data/Dog.json'
// import { Button } from '@mui/material';
import DogSymptomps from '../Data/DogSymtomps.json'

export const InfomationContext = createContext(null);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const steps = [
  "Who is this appointment for?",
  "What is your Concern?",
  "Choose the vet you want to meet",
];

const concerns = [
  "Vaccination",
  "Dental",
  "Skin",
  "Behavioral",
  "Grooming",
  "Other",
];

const Meet = () => {
  let navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [symptomForm, setSymptomForm] = useState(false);
  const [matchedVet, setMatchedVet] = useState([]);
  const [vetSelected, setVetSelected] = useState(null);
  const [petInfo, setPetInfo] = useState([]);
  const [selectedConcern, setSelectedConcern] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  const [clientSymptoms, setClientSymptoms] = useState([]);
  const [hasFever, setHasFever] = useState(false);
  const [isCoughing, setIsCoughing] = useState(false);
  const [itchyWelts, setItchyWelts] = useState(false);
  const [eyeIssue, setEyeIssue] = useState(false);
  const [petType, setPetType] = useState('');
  // let result = [];
  const [result, setResult] = useState([])



  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleBacktoDashboard = () => {
    window.location.href = "/dashboard";
  };

  const handleConcern = (concern) => {
    if (concern === 'Behavioral'){
      setSymptomForm(true)
    }
    else{
      setSymptomForm(false)
    }
    setSelectedConcern(concern);
    // console.log(symptomForm)
  };

  const handleSelectedPet = (pet) => {
    // console.log(pet.petSpecies);
    setPetType(pet.petSpecies)
    setSelectedPet(pet);
  };

  const getFever = (e) =>{
    if(e.target.value==='yes'){setHasFever(true)}
    else{setHasFever(false)}
    // console.log(hasFever);
  }
  const handleCough = (e) =>{
    if(e.target.value==='yes'){setIsCoughing(true)}
    else{setIsCoughing(false)}
    // console.log(isCoughing);
  }
  const handleItchyWelts = (e) =>{
    if(e.target.value==='yes'){setItchyWelts(true)}
    else{setItchyWelts(false)}
    // console.log(itchyWelts);
  }
  const handleEyeIssue = (e) =>{
    if(e.target.value==='yes'){setEyeIssue(true)}
    else{setEyeIssue(false)}
    // console.log(eyeIssue);
  }

  

    let myArray = DogSymptomps;

    const handleChange = (datass) => {
        // console.log(datass);
        let selectedSymptoms = []
        datass.forEach(symptom =>{
            selectedSymptoms.push(symptom)
        })
        setClientSymptoms(selectedSymptoms);
        
    }
    const getResult = ()=>{
      // activeStep === 1
        // console.log(clientSymptoms);
        
        
        if(hasFever) clientSymptoms.push('Fever')
        if(isCoughing) clientSymptoms.push('FevCoughinger')
        if(itchyWelts) clientSymptoms.push('Itchy Welts')
        if(eyeIssue) clientSymptoms.push('Eye Issue')
      let currentResult = []
        Dog.forEach(element => {
            let findings = 0;
            clientSymptoms.forEach(symptom =>{
                if (element.symptoms.includes(symptom)) findings++
            })
            let chances =  ((findings / (element.symptoms.length) ) * 100).toFixed(2)
            const output = {
                name:element.name,
                percentage:chances
            }
            currentResult.push(output);
        });
        // console.log(result)
        // currentResult.forEach(item =>{
        //     if(item.percentage>1){
        //         console.log(item)
        //     }
        // })
        setResult(currentResult)
        findVet();
        
    }

  // Check if the user is logged in
  useEffect(() => {
    
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/signin";
    }
    const getPetInfo = async () => {
      try {
        const petInfo = await apiClient.petInfo(accessToken);
        if (petInfo) {
          setPetInfo(petInfo.pets);
        } else {
          alert("Something went wrong");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        alert("Not authorized");
      }
    };
    getPetInfo(accessToken);
  }, []);

  const findVet = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const appointmentData = {
        pet: selectedPet,
        concern: selectedConcern,
      };
      console.log(appointmentData);
      const vet = await apiClient.findVet(accessToken, appointmentData);
      if (vet) {
        setMatchedVet(vet);
        handleNext();
      } else {
        alert("No suitable vet found");
      }
    } catch (error) {
      console.log(error);
      alert("Please select a pet and concern");
    }
  };

  // Handle Submit Once the user has selected a vet
  const handleSubmit = useCallback(async () => {
    console.log("In handle submit");
    const accessToken = localStorage.getItem("accessToken");
    try {
      const appointmentData = {
        pet: selectedPet,
        concern: selectedConcern,
        vet: vetSelected,
      };
      const appointment = await apiClient.createAppointment(
        accessToken,
        appointmentData
      );
      if (appointment) {
        setCompleted(true);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }, [selectedPet, selectedConcern, vetSelected]);

  const handleVetSelected = (vet) => {
    setVetSelected(vet);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <InfomationContext.Provider value={{ matchedVet, concerns }}>
      <section className="meet-container">
        <div className="meet-nav-bar">
          <HomeNavBar />
        </div>
        <div className="meet-step-container">
          <Box sx={{ width: "75%", padding: "1.5rem" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <>
                  <Paper
                    square
                    elevation={0}
                    sx={{
                      p: 3,
                      margin: "0 auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 400,
                      height: 400,
                    }}
                  >
                    <Typography component={"span"} sx={{ mt: 2, mb: 1 }}>
                      <Success />
                    </Typography>
                  </Paper>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleBacktoDashboard}>
                      Go to Dashboard
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <div className="meet-steps">
                    <Typography
                      component={"span"}
                      sx={{
                        mt: 2,
                        mb: 2,
                        py: 2,
                        display: "flex",
                        padding: "1rem",
                      }}
                    >
                      {activeStep === 1 ? ( <Box
                        sx={{
                          display: "flex",
                          flexDirection:"column"
                        }}
                      > 
                      <Box 
                        sx={{
                          display: "flex",
                        }}
                      >
                        {concerns.map((concern, index) => {
                          return (
                            <IconButton
                              sx={{
                                margin: "0.5rem",
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                              }}
                              onClick={() => handleConcern(concern)}
                              key={index}
                            >
                              <StepTwo
                                key={index}
                                concern={concern}
                                badgeValue={selectedConcern}
                              />{" "}
                            </IconButton>
                          );
                        })}
                        </Box>
                          {symptomForm ?  
                          <div>
                            {petType === 'Dog'?
                            <>
                          
                            <FormControl>
                              <FormLabel id="demo-form-control-label-placement"><RadioButtonCheckedIcon sx={{fontSize:"small"}} /> Has Fever?</FormLabel>
                              <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="no"
                                onChange={getFever}
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                  labelPlacement="end"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                  labelPlacement="end"
                                />
                              </RadioGroup>
                            </FormControl>
                            {hasFever && <Box>
                            <TextField
                            size="small"
                              type="number"
                                name="degreeOfFever"
                                label="Degree of Fever"
                            />
                            </Box>}
                            <Box>
                            <FormControl>
                              <FormLabel id="demo-form-control-label-placement"><RadioButtonCheckedIcon sx={{fontSize:"small"}} /> Is Coughing?</FormLabel>
                              <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="no"
                                onChange={handleCough}
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                  labelPlacement="end"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                  labelPlacement="end"
                                />
                              </RadioGroup>
                              {isCoughing && <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="yes"
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Mild Coughing"
                                  labelPlacement="end"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="Heavy Coughing"
                                  labelPlacement="end"
                                />
                              </RadioGroup>}
                            </FormControl>
                            </Box>
                            <Box>
                            <FormControl>
                              <FormLabel id="demo-form-control-label-placement"><RadioButtonCheckedIcon sx={{fontSize:"small"}} /> Has Itchy welts?</FormLabel>
                              <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="no"
                                onChange={handleItchyWelts}
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                  labelPlacement="end"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                  labelPlacement="end"
                                />
                              </RadioGroup>
                            </FormControl>
                            </Box>
                            <Box>
                            <FormControl>
                              <FormLabel id="demo-form-control-label-placement"><RadioButtonCheckedIcon sx={{fontSize:"small"}} /> Eye Issue?</FormLabel>
                              <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="no"
                                onChange={handleEyeIssue}
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                  labelPlacement="end"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                  labelPlacement="end"
                                />
                              </RadioGroup>
                              {eyeIssue && <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="yes"
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Eye Discharged"
                                  labelPlacement="end"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="Cloudy Eyes"
                                  labelPlacement="end"
                                />
                                <FormControlLabel
                                  value="yaap"
                                  control={<Radio />}
                                  label="Decreased Vision"
                                  labelPlacement="end"
                                />
                              </RadioGroup>}
                            </FormControl>
                            </Box>
                            <Box>
                            <FormLabel id="demo-form-control-label-placement"><RadioButtonCheckedIcon sx={{fontSize:"small", marginTop:2}} />Choose if there any other observeable Symptoms</FormLabel>
                            <Autocomplete
                              multiple
                              id="checkboxes-tags-demo"
                              options={myArray}
                              onChange={(e,values)=>{
                                handleChange(values)
                              }}
                              disableCloseOnSelect
                              getOptionLabel={(option) => option}
                              renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                  <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                    // onChange={handleChange(option)}
                                  />
                                  {option}
                                </li>
                              )}
                              style={{ width: 500, marginTop:8}}
                              renderInput={(params) => (
                                <TextField {...params} label="Select Symtomps" placeholder="Symtomps" />
                              )}
                            />
                            </Box></>: petType === 'Bird' ? <>bird</>:<>Cat</>}
                          </div>: <></>}
                        </Box>
                      ) : activeStep === 0 ? (
                        petInfo.map((pet, index) => {
                          return (
                            <IconButton
                              sx={{
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                border:
                                  selectedPet === pet
                                    ? "2px solid #1FC600"
                                    : "none",
                              }}
                              onClick={() => handleSelectedPet(pet)}
                              key={index}
                            >
                              <StepOne
                                key={index}
                                pet={pet}
                                badgeValue={selectedPet}
                              />
                            </IconButton>
                          );
                        })
                      ) : activeStep === 2 ? (
                        <>
                        <Box sx={{marginBottom:70, width:"20rem"}}>
                          {result && result.map((item,idx) => parseFloat(item.percentage,10) > 0 ? <div key={idx}>{item.name}: {item.percentage+'%'}</div>:<span key={idx}></span>)}
                        </Box>
                        <StepThree
                          matchedVet={matchedVet}
                          setVetSelected={handleVetSelected}
                          handleSubmit={handleSubmit}
                          vetSelected={vetSelected}
                        />
                        </>
                      ) : null}
                    </Typography>
                    
                  </div>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      onClick={
                        activeStep === 0
                          ? handleNext
                          : activeStep === 1 ?
                          getResult
                          : activeStep === 2
                          ? handleSubmit
                          : activeStep === 3
                          ? handleNext
                          : navigate("/success")
                      }
                      sx={{ mr: 1 }}
                    >
                      Next
                    </Button>
                  </Box>
                </>
              )}
            </div>
          </Box>
        </div>
      </section>
    </InfomationContext.Provider>
  );
};

export default Meet;
