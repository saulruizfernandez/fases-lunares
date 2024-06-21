import { LineChart } from "@mui/x-charts/LineChart";
import SunCalc from "suncalc";
import { useAppContext } from "../../AppContext";

export default function ChartSunAlt() {
  const { latitudeState, longitudeState, actualDate } = useAppContext();

  // Calculations for sun altitude in all the day
  let sun_alt = [];

  let date_prov = actualDate.toDate();
  date_prov.setHours(1, 0, 0, 0);

  for (let i = 0; i < 24; ++i) {
    sun_alt.push(SunCalc.getPosition(date_prov, latitudeState, longitudeState));
    date_prov.setHours(date_prov.getHours() + 1);
  }

  let date_ahora = actualDate.toDate();
  date_ahora.setHours(date_ahora.getHours(), 0, 0, 0);
  let sol_ahora = SunCalc.getPosition(
    date_ahora,
    latitudeState,
    longitudeState
  );

  return (
    <LineChart
      xAxis={[
        {
          data: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24,
          ],
          label: "time (HH)",
        },
      ]}
      series={[
        {
          data: sun_alt.map((position) => (position.altitude * 180) / Math.PI),
          label: "Sun altitude (º)",
          color: "#f28e2c",
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
              ? (sol_ahora.altitude * 180) / Math.PI
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
