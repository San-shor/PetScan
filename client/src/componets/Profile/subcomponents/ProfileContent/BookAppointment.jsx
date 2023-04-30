import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import appointmentImg from "../images/appointment.jpg";

const BookAppointment = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/book-appointment");
  };
  return (
    <section className="appointment-card">
      <Button
        sx={{
          backgroundColor: "#42389D",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#3f51b5",
          },
          textTransform: "none",
        }}
        onClick={handleClick}
      >
        Book appointment
      </Button>
    </section>
  );
};

export default BookAppointment;
