// import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment-timezone";

function BasicSelect({ timezone, handleChange }) {
  // const [timezone, setTimezone] = React.useState(moment.tz.guess());

  // const handleChange = (event) => {
  //   setTimezone(event.target.value);
  // };

  const timezones = moment.tz.names();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Timezone</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timezone}
          onChange={handleChange}
        >
          {timezones.map((zone) => (
            <MenuItem key={zone} value={zone}>
              {zone}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

BasicSelect.propTypes = {
  timezone: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BasicSelect;
