import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import SpeedIcon from "@mui/icons-material/Speed";
import PropTypes from "prop-types";

function VelSlider({ value, onChange }) {
  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" alignItems="center">
        <SpeedIcon />
        <Slider
          aria-label="Speed"
          value={value}
          onChange={onChange}
          min={1}
          max={10}
        />
      </Stack>
    </Box>
  );
}

VelSlider.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default VelSlider;
