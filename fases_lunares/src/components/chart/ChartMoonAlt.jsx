import { LineChart } from "@mui/x-charts/LineChart";
import SunCalc from "suncalc";
import { useAppContext } from "../../AppContext";

export default function ChartMoonAlt() {
  const { latitudeState, longitudeState } = useAppContext();

  // Calculations for moon altitude in all the day
  let moon_alt = [];

  let date_prov = new Date();
  date_prov.setHours(1, 0, 0, 0);

  for (let i = 0; i < 24; ++i) {
    moon_alt.push(
      SunCalc.getMoonPosition(date_prov, latitudeState, longitudeState)
    );
    date_prov.setHours(date_prov.getHours() + 1);
  }

  let date_ahora = new Date();
  date_ahora.setHours(date_ahora.getHours(), 0, 0, 0);
  let moon_ahora = SunCalc.getMoonPosition(
    date_ahora,
    latitudeState,
    longitudeState
  );

  return (
    <LineChart
      xAxis={[
        {
          data: Array.from({ length: 24 }, (_, i) => i + 1),
          label: "time (HH)",
        },
      ]}
      series={[
        {
          data: moon_alt.map((position) => (position.altitude * 180) / Math.PI),
          label: "Moon altitude (º)",
          color: "#af7aa1",
          showMark: false,
        },
        {
          data: Array.from({ length: 24 }, () => 0),
          color: "red",
          showMark: false,
        },
        {
          data: Array.from({ length: 24 }, (v, i) =>
            i === date_ahora.getHours() - 1
              ? (moon_ahora.altitude * 180) / Math.PI
              : null
          ),
          color: "black",
        },
      ]}
      height={200}
      margin={{ left: 30, right: 30, top: 30, bottom: 40 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
