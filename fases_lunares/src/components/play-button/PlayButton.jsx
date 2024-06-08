import Button from "@mui/material/Button";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  changeFlagAcceleration,
  getFlagAcceleration,
} from "../../three-app/variables";

function PlayButton() {
  return (
    <Button
      variant="contained"
      endIcon={<PlayCircleIcon />}
      onClick={() => changeFlagAcceleration(!getFlagAcceleration())}
    >
      PLAY
    </Button>
  );
}

export default PlayButton;
