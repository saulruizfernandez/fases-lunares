import { LineChart } from "@mui/x-charts/LineChart";

export default function ChartMoonAlt() {
  return (
    <LineChart
      xAxis={[
        {
          data: [
            1, 2, 3, 5, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
            23, 24,
          ],
          label: "time (HH)",
        },
      ]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          label: "Moon altitude (º)",
          color: "#af7aa1",
        },
      ]}
      height={200}
      margin={{ left: 30, right: 30, top: 30, bottom: 40 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
