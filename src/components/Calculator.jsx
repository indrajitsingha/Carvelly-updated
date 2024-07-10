

import { useState, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ResponsivePie } from "@nivo/pie"

export default function Calculator() {
  const [loanAmount, setLoanAmount] = useState(10000)
  const [interestRate, setInterestRate] = useState(10)
  const [loanTenure, setLoanTenure] = useState(12)
  const calculateEMI = () => {
    const principal = loanAmount
    const rate = interestRate / 100 / 12
    const tenure = loanTenure
    const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1)
    const totalInterest = emi * tenure - principal
    const totalPayable = principal + totalInterest
    return {
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayable: totalPayable.toFixed(2),
    }
  }
  const { emi, totalInterest, totalPayable } = calculateEMI()
  const pieData = useMemo(() => [
    { id: "Principal", value: loanAmount, color: "rgba(11, 180, 70, 0.982)" },
    { id: "Total Interest", value: parseFloat(totalInterest), color: "black" },
  ], [loanAmount, totalInterest])
  return (
    <div className="grid  w-full grid-cols-1 gap-8 bg-background p-4 md:grid-cols-2 md:p-8 lg:p-12">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold md:text-3xl">EMI Calculator</h1>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="loan-amount">Loan Amount</Label>
            <Input
              id="loan-amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              min={1000}
              max={1000000}
              step={100}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="interest-rate">Interest Rate (%)</Label>
            <Input
              id="interest-rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min={0}
              max={50}
              step={0.1}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="loan-tenure">Loan Tenure (Months)</Label>
            <Input
              id="loan-tenure"
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              min={6}
              max={360}
              step={1}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Monthly EMI</Label>
            <div className="text-2xl font-bold">₹{emi}</div>
          </div>
          <div className="grid gap-2">
            <Label>Total Interest Paid</Label>
            <div className="text-2xl font-bold">₹{totalInterest}</div>
          </div>
          <div className="grid gap-2">
            <Label>Total Payable Amount</Label>
            <div className="text-2xl font-bold">₹{totalPayable}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold md:text-3xl">Interest Breakdown
        </h2>
        <PieChart className="aspect-[16/9]" data={pieData} />
      </div>
    </div>
  )
}
function PieChart({ data }) {
  return (
    <div style={{ height: "400px" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "paired" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: "color" }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000"
                }
              }
            ]
          }
        ]}
      />
    </div>
  )
}