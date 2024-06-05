import Grid from "@mui/material/Grid";
import PlayButton from "../play-button/PlayButton";
import GridDemo from "../chart/ChartAltitude";

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
          <GridDemo />
        </Grid>
        <Grid item>
          <GridDemo />
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
      ></Grid>
    </Grid>
  );
}

export default GridThree;
