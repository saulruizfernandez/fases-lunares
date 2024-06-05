import Grid from "@mui/material/Grid";
import PlayButton from "../play-button/PlayButton";
import ChartMoonAlt from "../chart/ChartMoonAlt";
import ChartSunAlt from "../chart/ChartSunAlt";
import MoonInfoCard from "../info-cards/MoonInfoCard";
import SunInfoCard from "../info-cards/SunInfoCard";
import ThreeComponent from "../../three-app/main_three";

function GridThree() {
  return (
    <Grid container height="100%">
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
          <PlayButton />
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
