import Button from "@mui/material/Button";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

function PlayButton() {
  return (
    <Button variant="contained" endIcon={<PlayCircleIcon />}>
      PLAY
    </Button>
  );
}

export default PlayButton;
