import { Box } from "@mui/system";
import DrawerAppBar from "./components/menu-panel/MenuPanel";
import SidePanel from "./components/side-panel/SidePanel";
import GridThree from "./components/grid_three/GridThree";

function App() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ height: "64px" }}>
        <DrawerAppBar />
      </Box>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <SidePanel />
        <Box sx={{ flexGrow: 1, margin: "10px" }}>
          <GridThree />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
