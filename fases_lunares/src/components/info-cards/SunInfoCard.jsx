import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import SunCalc from "suncalc";
import { useAppContext } from "../../AppContext";

export default function SunInfoCard() {
  const { latitudeState, longitudeState, actualDate } = useAppContext();
  let sunProps = SunCalc.getTimes(actualDate.toDate(), latitudeState, longitudeState);
  let sunPos = SunCalc.getPosition(actualDate.toDate(), latitudeState, longitudeState);

  return (
    <Card>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          backgroundColor: "rgb(50, 50 , 50)",
        }}
      >
        <CardMedia
          component="img"
          height="150"
          image="/sun_eclipse.jpg"
          alt="moon photo"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: "rgb(240,240,240)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Sun
          </Typography>
          <Typography
            variant="body1"
            color="rgb(200,200,200)"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Alt/Az: {((sunPos.altitude * 180) / Math.PI).toFixed(4)}º,{" "}
            {((sunPos.azimuth * 180) / Math.PI).toFixed(4)}º
          </Typography>
          {sunProps.sunrise && (
            <Typography
              variant="body1"
              color="rgb(200,200,200)"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Sunrise: {sunProps.sunrise.toLocaleTimeString()}
            </Typography>
          )}
          {sunProps.sunset && (
            <Typography
              variant="body1"
              color="rgb(200,200,200)"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Sunset: {sunProps.sunset.toLocaleTimeString()}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
