import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function MoonInfoCard() {
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
            sx={{ color: "rgb(240,240,240)" }}
          >
            Moon
          </Typography>
          <Typography variant="body1" color="rgb(200,200,200)">
            Alt/Az:
          </Typography>
          <Typography variant="body1" color="rgb(200,200,200)">
            Moonrise:
          </Typography>
          <Typography variant="body1" color="rgb(200,200,200)">
            Moonset:
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
