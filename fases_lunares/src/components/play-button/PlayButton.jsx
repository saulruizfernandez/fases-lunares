import { useState } from "react";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import {
  changeFlagAcceleration,
  getFlagAcceleration,
} from "../../three-app/variables";

function PlayButton() {
  const [isClicked, setIsClicked] = useState(false);

  const stylePlayButton = {
    backgroundColor: isClicked ? "red" : "green", // Cambia el color de fondo dependiendo del estado
    "&:hover": {
      backgroundColor: isClicked ? "darkRed" : "darkGreen", // Cambia el color de fondo al pasar el mouse dependiendo del estado
    },
  };

  return (
    <Button
      disableRipple
      sx={stylePlayButton}
      variant="contained"
      endIcon={isClicked ? <StopIcon /> : <PlayArrowIcon />} // Cambia el icono dependiendo del estado
      onClick={() => {
        changeFlagAcceleration(!getFlagAcceleration());
        setIsClicked(!isClicked); // Cambia el estado cuando se hace clic en el botón
      }}
    >
      {isClicked ? "STOP" : "PLAY"}{" "}
      {/* Cambia el texto dependiendo del estado */}
    </Button>
  );
}

export default PlayButton;
