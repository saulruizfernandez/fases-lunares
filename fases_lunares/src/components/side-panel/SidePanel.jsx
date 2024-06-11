import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { sidepanelitems } from "./consts/sidepanelitems";
import { Box } from "@mui/material";
import { Fragment } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import BasicDatePicker from "./BasicDatePicker";
import BasicTimePicker from "./BasicTimePicker";

import TextField from "@mui/material/TextField";
import BasicSelect from "./BasicSelect";

function SidePanel() {
  const [dateOpen, setDateOpen] = React.useState(false);

  const handlerDateClickOpen = () => {
    setDateOpen(true);
  };

  const handlerDateClose = () => {
    setDateOpen(false);
  };

  const [timeOpen, setTimeOpen] = React.useState(false);

  const handlerTimeClickOpen = () => {
    setTimeOpen(true);
  };

  const handlerTimeClose = () => {
    setTimeOpen(false);
  };

  const [locOpen, setLocOpen] = React.useState(false);

  const handlerLocClickOpen = () => {
    setLocOpen(true);
  };

  const handlerLocClose = () => {
    setLocOpen(false);
  };

  const [zoneOpen, setZoneOpen] = React.useState(false);

  const handlerZoneClickOpen = () => {
    setZoneOpen(true);
  };

  const handlerZoneClose = () => {
    setZoneOpen(false);
  };

  const drawerWidth = 220;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "rgb(29,29,29)",
          color: "rgb(240,240,240)",
          zIndex: 1,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider
        sx={{ backgroundColor: "white", height: "3px", marginTop: "20px" }}
      />
      <Box sx={{ backgroundColor: "rgb(50, 50 , 50)" }}>
        <List sx={{ padding: 0 }}>
          {sidepanelitems.map((text, index) => (
            <Fragment key={text.id}>
              <ListItem disablePadding>
                <Button
                  onClick={() => {
                    if (text.label == "Time") {
                      handlerTimeClickOpen();
                    } else if (text.label == "Date") {
                      handlerDateClickOpen();
                    } else if (text.label == "Location") {
                      handlerLocClickOpen();
                    } else if (text.label == "Timezone") {
                      handlerZoneClickOpen();
                    }
                  }}
                  sx={{
                    justifyContent: "flex-start",
                    color: "rgb(240,240,240)",
                  }}
                >
                  {text.label}
                </Button>
              </ListItem>
              {index < sidepanelitems.length - 1 && (
                <Divider sx={{ backgroundColor: "white", height: "1px" }} />
              )}
            </Fragment>
          ))}
        </List>
      </Box>
      <Dialog open={dateOpen} onClose={handlerDateClose}>
        <DialogTitle>Date picker</DialogTitle>
        <DialogContent>
          Select a date by clicking on the date-picker
          <Box display="flex" justifyContent="center" alignItems="center">
            <BasicDatePicker />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerDateClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={timeOpen} onClose={handlerTimeClose}>
        <DialogTitle>Time picker</DialogTitle>
        <DialogContent>
          Select a time by clicking on the time-picker
          <Box display="flex" justifyContent="center" alignItems="center">
            <BasicTimePicker />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerTimeClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={locOpen} onClose={handlerLocClose}>
        <DialogTitle>Location</DialogTitle>
        <DialogContent>
          Input any location in decimal notation, remember south latitude is
          negative, and west longitude is also negative
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="lat"
            label="Latitude (e.g. -23.5738º)"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="lon"
            label="Longitude (e.g. 175.2275º)"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerLocClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={zoneOpen} onClose={handlerZoneClose}>
        <DialogTitle>Timezone</DialogTitle>
        <DialogContent>
          Select a timezone
          <BasicSelect />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlerZoneClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Divider sx={{ backgroundColor: "white", height: "3px" }} />
    </Drawer>
  );
}

export default SidePanel;
