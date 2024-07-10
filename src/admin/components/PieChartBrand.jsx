import { Chart } from "react-google-charts";

export const options = {
  // title: "All Brands and Number of Cars",
  pieHole: 0.4,
  is3D: false,
};

const PieChartBrand = ({Cars}) => {
  const reducerResult = Cars?.map((x) => x.Brand).reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++
    } else {
      acc[curr] = 1
    }
    return acc
  }, [])

  const result = Object.entries(reducerResult).map(([key, value]) => [key, value]);


  const data = [
    ["Task", "Hours per Day"],
    ...[...result]
  ];

  console.log(data)

  return (
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    
  )
}

export default PieChartBrand

