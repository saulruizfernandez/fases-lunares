import { useState } from "react";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import {
  changeFlagAcceleration,
  getFlagAcceleration,
} from "../../three-app/variables";
import { auxiliaryDate } from "../../three-app/main_three";
import { useAppContext } from "../../AppContext";
import dayjs from "dayjs";

function PlayButton() {
  const { setActualDate } = useAppContext();
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
      endIcon={isClicked ? <StopIcon /> : <PlayArrowIcon />}
      onClick={() => {
        changeFlagAcceleration(!getFlagAcceleration());
        setIsClicked(!isClicked);
        if (!getFlagAcceleration()) {
          setActualDate(dayjs(auxiliaryDate));
        }
      }}
    >
      {isClicked ? "STOP" : "PLAY"}{" "}
      {/* Cambia el texto dependiendo del estado */}
    </Button>
  );
}

export default PlayButton;
