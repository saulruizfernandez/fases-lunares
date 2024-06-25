import Grid from "@mui/material/Grid";
import PlayButton from "../play-button/PlayButton";
import ChartMoonAlt from "../chart/ChartMoonAlt";
import ChartSunAlt from "../chart/ChartSunAlt";
import MoonInfoCard from "../info-cards/MoonInfoCard";
import SunInfoCard from "../info-cards/SunInfoCard";
import ThreeComponent from "../../three-app/main_three";
import VelSlider from "../vel-slider/VelSlider";
import { useAppContext } from "../../AppContext";

function GridThree() {
  const { speed, setSpeed } = useAppContext();

  const handleChange = (event, newValue) => {
    setSpeed(newValue);
  };

  return (
    <Grid container height="100%" spacing={2}>
      <Grid
        item
        xs={4}
        container
        direction="column"
        justifyContent="space-between"
      >
        <Grid item>
          <ChartMoonAlt />
        </Grid>
        <Grid item>
          <MoonInfoCard />
        </Grid>
        <Grid item>
          <ChartSunAlt />
        </Grid>
        <Grid item>
          <SunInfoCard />
        </Grid>
        <Grid item>
          <Grid container direction="row" justifyContent="center" spacing={6}>
            <Grid item>
              <PlayButton />
            </Grid>
            <Grid item>
              <VelSlider value={speed} onChange={handleChange} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={8}
        container
        direction="column"
        justifyContent="flex-start"
      >
        <ThreeComponent />
      </Grid>
    </Grid>
  );
}

export default GridThree;
