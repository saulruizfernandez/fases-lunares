import Grid from "@mui/material/Grid";
import PlayButton from "../play-button/PlayButton";

function GridThree() {
  return (
    <Grid
      container
      height="100%"
      alignItems="flex-end"
      justifyContent="flex-start"
    >
      <Grid item xs={1}>
        <PlayButton />
      </Grid>
    </Grid>
  );
}

export default GridThree;
