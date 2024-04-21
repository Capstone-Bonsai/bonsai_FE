import ReactEcharts from "echarts-for-react";

export default function LineChart({ height, color = [] }) {
  const option = {
    grid: { top: "10%", bottom: "10%", left: "5%", right: "5%" },
    legend: {
      itemGap: 20,
      icon: "circle",
      textStyle: {
        fontSize: 13,
      },
    },
    label: {
      fontSize: 13,
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: "roboto",
      },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { opacity: 0.15 },
      },
      axisLabel: { fontSize: 13, fontFamily: "roboto" },
    },
    series: [
      {
        data: [30, 40, 20, 50, 40, 80, 90],
        type: "line",
        stack: "This month",
        name: "This month",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: [20, 50, 15, 50, 30, 70, 95],
        type: "line",
        stack: "Last month",
        name: "Last month",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
    ],
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{ ...option, color: [...color] }}
    />
  );
}
