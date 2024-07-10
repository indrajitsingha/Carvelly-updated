import { Chart } from "react-google-charts";

export const options = {
  // title: "All items and Total summary",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Total Quantity",
    minValue: 0,
  },
  vAxis: {
    title: "Items",
  },
};

const PieChart = ({Admin,Car,Brands,Category}) => {
  const data = [
    ["Items", "Number"],
    ["Admin", Admin],
    ["Total Cars", Car],
    ["Total Brands", Brands],
    ["Total Category", Category ]
  ];
  return (
    <Chart
    chartType="BarChart"
    width="100%"
    height="400px"
    data={data}
    options={options}
  />
  )
}

export default PieChart
