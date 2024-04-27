import dayjs from "dayjs";
import ReactEcharts from "echarts-for-react";

export default function LineChart({ height, color = [], data }) {
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
      name: "Tháng",
      data: data?.map((month) => `Tháng ${dayjs(month?.time).format("MM")}`),
      axisLine: { show: true },
      axisTick: { show: true },
      axisLabel: {
        fontSize: 14,
        fontFamily: "roboto",
      },
    },
    yAxis: {
      type: "value",
      name: "Doanh thu",
      axisLine: { show: true },
      axisTick: { show: true },
      splitLine: {
        lineStyle: { opacity: 0.15 },
      },
      axisLabel: {
        formatter: "{value} vnd",
        fontSize: 10,
        fontFamily: "roboto",
      },
    },
    series: [
      {
        data: data?.map((orderTotal) => orderTotal?.orderTotal),
        type: "line",
        stack: "Doanh thu đơn hàng",
        name: "Doanh thu đơn hàng",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
        label: {
          formatter: "{c} {vnd}",
          show: true,
          position: "top",
          textStyle: {
            fontSize: 10,
          },
        },
      },
      {
        data: data?.map(
          (serviceOrderTotal) => serviceOrderTotal?.serviceOrderTotal
        ),
        type: "line",
        stack: "Doanh thu đơn hàng dịch vụ",
        name: "Doanh thu đơn hàng dịch vụ",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
        label: {
          formatter: "{c} {vnd}",
          show: true,
          position: "top",
          textStyle: {
            fontSize: 10,
          },
        },
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
