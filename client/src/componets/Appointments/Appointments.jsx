import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Appointments = (props) => {
  const navigate = useNavigate();
  const { appointment } = props;
  const storedUserId = localStorage.getItem("userId");
  const storedUserType = localStorage.getItem("userType");

  async function handleClick() {
    const userId1 =
      storedUserType === "petParent" ? storedUserId : appointment.vet;
    const userId2 =
      storedUserType === "petParent" ? appointment.vet : storedUserId;
    try {
      const response = await axios.post(`http://localhost:3001/chat`, {
        userId1,
        userId2,
      });

      navigate("/chat");
    } catch (error) {
      console.log(`Error getting chats: ${error}`);
    }
  }

  return (
    <div>
      <Card
        sx={{
          maxWidth: 250,
          m: 1,
          borderRadius: "10px",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardActionArea sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="140"
            image={appointment.vetProfile ? appointment.vetProfile : null}
            alt="Your Vet Profile"
            sx={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
          <CardContent
            sx={{
              backgroundColor: "#fff",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              maxWidth: 400,
              m: 3,
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#666",
                marginTop: "1rem",
              }}
            >
              {appointment.vetName ? appointment.vetName : appointment.status}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "0.5rem",
                color: "#999",
              }}
            >
              {appointment.concern
                ? appointment.concern
                : "For the concern of..."}
            </Typography>
            <Button
              onClick={handleClick}
              variant="contained"
              sx={{
                marginTop: "1rem",
                borderRadius: "50px",
                backgroundColor: "#dc3545",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#c82333",
                },
              }}
            >
              Started Chat
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Appointments;
