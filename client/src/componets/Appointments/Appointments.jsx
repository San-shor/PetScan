import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Appointments = (props) => {
  const { appointment } = props;
  // console.log("appointment", appointment);

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
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Appointments;
