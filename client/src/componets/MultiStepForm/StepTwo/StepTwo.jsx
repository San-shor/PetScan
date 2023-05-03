import {
  Box,
  Stack,
  Badge,
  Paper,
  Typography,
  Button,
  Card,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import QuizIcon from '@mui/icons-material/Quiz';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PetsIcon from '@mui/icons-material/Pets';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
const StepTwo = (props) => {
  const { badgeValue, concern } = props;

  return (
    <Stack direction="row" spacing={2}>
      <Card
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
          width: 120,
          height: 120,
          borderRadius: 18,
          ":hover": {
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            transform: "scale(1.05)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        {concern === 'Vaccination' && <VaccinesIcon></VaccinesIcon>}
        {concern === 'Behavioral' && <CoronavirusIcon></CoronavirusIcon>}
        {concern === 'Other' && <QuizIcon></QuizIcon>}
        {concern === 'Grooming' && <ContentCutIcon></ContentCutIcon>}
        {concern === 'Skin' && <PetsIcon></PetsIcon>}
        {concern === 'Dental' && <EmojiNatureIcon></EmojiNatureIcon>}
        <Badge
          badgeContent={
            badgeValue === concern ? <CheckCircleOutlinedIcon /> : ""
          }
          sx={{ width: 80, height: 80 }}
        >
          
          <Typography component={"span"} sx={{ alignItems: "center", mt: 3 }}>
            {concern}
          </Typography>
        </Badge>
      </Card>
    </Stack>
    
  );
};

export default StepTwo;
