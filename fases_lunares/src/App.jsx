import { Box } from "@mui/system";
import DrawerAppBar from "./components/menu-panel/MenuPanel";
import SidePanel from "./components/side-panel/SidePanel";
import GridThree from "./components/grid_three/GridThree";

import { AppProvider } from "./AppContext.jsx";

function App() {
  return (
    <AppProvider>
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
    </AppProvider>
  );
}

export default App;
