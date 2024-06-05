import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { sidepanelitems } from "./consts/sidepanelitems";
import { Box } from "@mui/material";

function SidePanel() {
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
        sx={{ backgroundColor: "white", height: "2px", marginTop: "20px" }}
      />
      <Box sx={{ backgroundColor: "rgb(50, 50 , 50)" }}>
        <List>
          {sidepanelitems.map((text) => (
            <ListItem key={text.id} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "rgb(240,240,240)" }}>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ backgroundColor: "white", height: "2px" }} />
    </Drawer>
  );
}

export default SidePanel;
