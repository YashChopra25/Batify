import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { abbreviateNumber } from "js-abbreviation-number";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartNoAxesCombined, TrendingUp } from "lucide-react";
import TableComponent from "@/components/dashboard/TableComponent";
const chartData = [
  { month: "January", desktop: 1 },
  { month: "February", desktop: 0 },
  { month: "March", desktop: 0 },
  { month: "April", desktop: 0 },
  { month: "May", desktop: 0 },
  { month: "June", desktop: 0 },
  { month: "July", desktop: 0 },
  { month: "August", desktop: 0 },
  { month: "September", desktop: 0 },
  { month: "October", desktop: 10 },
  { month: "November", desktop: 0 },
  { month: "December", desktop: 0 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CountryView = [
  {
    name: "United States of America",
    views: "76%",
  },
  {
    name: "Canada",
    views: "58%",
  },
  {
    name: "Mexico",
    views: "83%",
  },
  {
    name: "Brazil",
    views: "64%",
  },
  {
    name: "United States of America",
    views: "76%",
  },
  {
    name: "Canada",
    views: "58%",
  },
  {
    name: "Mexico",
    views: "83%",
  },
  {
    name: "Brazil",
    views: "64%",
  },
];
const Home = () => {
  return (
    <div className="py-4 flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-dark-bg-card border-[#44485e] overflow-hidden col-span-1 ">
          <CardHeader className="border-b border-[#44485e]">
            <CardTitle className="text-[#cfcde4] flex justify-between items-center">
              <span>Country</span>
              <span className="text-sm">Page views</span>
            </CardTitle>
          </CardHeader>
          <div className="px-2 py-2 min-h-[182px] max-h-[182px] flex flex-col gap-[0.45rem]">
            {CountryView.map((item) => {
              // Extract the percentage value from the 'views' (e.g., "76%")
              const percentage = parseInt(item.views); // Remove '%' and get the numeric value
              const backgroundStyle = {
                background: `linear-gradient(to right, #44485e ${percentage}%, transparent 0%)`,
              };

              return (
                <div
                  key={item.name}
                  className="px-3 py-1 flex justify-between items-center text-sm hover:!bg-[#44485e] rounded transition-colors duration-300 ease-in-out"
                  style={backgroundStyle} // Apply the dynamic background style here
                >
                  <p className="text-[#cfcde4]">{item.name}</p>
                  <p className="text-[#cfcde4]">{item.views}</p>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="bg-dark-bg-card border-[#44485e] overflow-hidden col-span-1 ">
          <CardHeader className="border-b border-[#44485e]">
            <CardTitle className="text-[#cfcde4] flex justify-between items-center">
              <span>Total Visits</span>
            </CardTitle>
          </CardHeader>
          <div className=" px-2 py-2 min-h-[182px] max-h-[182px] text-[#cfcde4] text-7xl font-semibold flex justify-center items-center gap-2">
            <TrendingUp size={70} className="mt-4" />
            <span>{abbreviateNumber(18899, 2, { padding: false })}</span>
          </div>
        </Card>
      </div>
      <Card className="col-start-2 col-end-4 bg-dark-bg-card border-[#44485e]">
        <CardHeader className="text-[#cfcde4]">
          <CardTitle>Report</CardTitle>
          <CardDescription className="text-[#cfcde4]">
            Showing the data for the current year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
              className="bg-dark-bg-card"
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="desktop"
                type="natural"
                // fill="var(--color-desktop)"
                fillOpacity={0.4}
                // stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
