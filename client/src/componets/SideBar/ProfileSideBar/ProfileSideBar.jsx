import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import PetsIcon from "@mui/icons-material/Pets";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";
import AddLocationSharpIcon from "@mui/icons-material/AddLocationSharp";
import navLogo from "../../../../public/Homepage/parent-nav.jpg";

const ProfileSideBar = () => {
  return (
    <nav className="sidebar-content">
      <List>
        <ListItemButton
          sx={{
            borderRadius: "10px",
          }}
        >
          <LayersIcon />
          <ListItemText
            sx={{
              paddingLeft: "4%",
            }}
            primaryTypographyProps={{
              fontSize: "1.2rem",
              fontFamily: "Roboto",
            }}
            primary="Dashboard"
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderRadius: "10px",
          }}
        >
          <PetsIcon />
          <ListItemText
            sx={{
              paddingLeft: "4%",
            }}
            primaryTypographyProps={{
              fontSize: "1.2rem",
              fontFamily: "Roboto",
            }}
            primary="Pets"
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderRadius: "10px",
          }}
        >
          <MedicationRoundedIcon />
          <ListItemText
            sx={{
              paddingLeft: "4%",
            }}
            primaryTypographyProps={{
              fontSize: "1.2rem",
              fontFamily: "Roboto",
            }}
            primary="Appointments"
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderRadius: "10px",
          }}
        >
          <AddLocationSharpIcon />
          <ListItemText
            sx={{
              paddingLeft: "4%",
            }}
            primaryTypographyProps={{
              fontSize: "1.2rem",
              fontFamily: "Roboto",
            }}
            primary="Book vet appointmnent"
          />
        </ListItemButton>
        <ListItemButton>
          <SettingsApplicationsSharpIcon />
          <ListItemText
            sx={{
              paddingLeft: "4%",
            }}
            primaryTypographyProps={{
              fontSize: "1.2rem",
              fontFamily: "Roboto",
            }}
            primary="Settings"
          />
        </ListItemButton>
      </List>
    </nav>
  );
};

export default ProfileSideBar;
