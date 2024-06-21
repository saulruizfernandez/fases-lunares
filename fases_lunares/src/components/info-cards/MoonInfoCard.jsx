import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import SunCalc from "suncalc";
import { useAppContext } from "../../AppContext";

export default function MoonInfoCard() {
  const { latitudeState, longitudeState, actualDate } = useAppContext();
  let moonProps = SunCalc.getMoonTimes(
    actualDate.toDate(),
    latitudeState,
    longitudeState
  );
  let moonPos = SunCalc.getMoonPosition(
    actualDate.toDate(),
    latitudeState,
    longitudeState
  );

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
          image="/moon_close.jpeg"
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
            Moon
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
            Alt/Az: {((moonPos.altitude * 180) / Math.PI).toFixed(4)}º,{" "}
            {((moonPos.azimuth * 180) / Math.PI).toFixed(4)}º
          </Typography>
          {moonProps.rise && (
            <Typography
              variant="body1"
              color="rgb(200,200,200)"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Moonrise: {moonProps.rise.toLocaleTimeString()}
            </Typography>
          )}
          {moonProps.set && (
            <Typography
              variant="body1"
              color="rgb(200,200,200)"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Moonset: {moonProps.set.toLocaleTimeString()}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
