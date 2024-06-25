import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { ListItemIcon } from "@mui/material";

import MoonIcon from "@mui/icons-material/Brightness3";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoIcon from "@mui/icons-material/Info";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const drawerWidth = 240;
const navItems = [
  { text: "GitHub", icon: <GitHubIcon /> },
  { text: "Info", icon: <InfoIcon /> },
  { text: "Contact", icon: <PermContactCalendarIcon /> },
];

const handleGitHubClick = () => {
  if (typeof window !== "undefined") {
    window.location.href = "https://github.com/tuUsuario";
  }
};

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isHelpInfoOpen, setIsHelpInfoOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleInfoClick = () => {
    setIsHelpInfoOpen(true);
  };
  const handleCloseHelpInfo = () => {
    setIsHelpInfoOpen(false);
  };

  const handleButtonClick = (itemText) => {
    switch (itemText) {
      case "GitHub":
        handleGitHubClick();
        break;
      case "Info":
        handleInfoClick();
        break;
      case "Contact":
        break;
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Box sx={{ display: "flex", zIndex: 2 }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <MoonIcon sx={{ mr: 1, display: { xs: "none", sm: "block" } }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Lunar Phases Visualizer
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  sx={{ color: "#fff" }}
                  onClick={() => handleButtonClick(item.text)}
                >
                  {item.icon}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
      <Button variant="outlined" onClick={handleInfoClick}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={isHelpInfoOpen}
        keepMounted
        onClose={handleCloseHelpInfo}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"How to use the app?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Lunar Phases Visualizer is an app to check real-time positions of the Moon and the Sun.
            The following picture shows the sections of the UI:\n
            The navigator will ask for permission to access your geographical coordinates. Click accept.
            Do not worry if there is any problem while accessing the data, you can modify it from the
            side panel at any time!`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHelpInfo}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
