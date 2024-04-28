import ReactEcharts from "echarts-for-react";
import { values } from "lodash";

export default function ServiceOrderCircleGraphs({ height, color = [], data }) {
  console.log(data);
  const option = {
    legend: {
      show: true,
      itemGap: 10,
      icon: "circle",
      bottom: 0,
      textStyle: {
        fontSize: 10,
        color: "blue",
      },
    },
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    xAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
    yAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],

    label: {
      fontSize: 13,
      color: "blue",
    },

    series: [
      {
        name: "Chưa có số liệu",
        type: "pie",
        radius: ["45%", "72.55%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          show: false,
          position: "center",
        },

        data: data?.map((orderService) => ({
          value: orderService.percent,
          name: orderService.serviceName,
        })),

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          label: {
            show: true,
            formatter: "{b} \n{c} ({d}%)",
            fontSize: 14,
            color: "blue",
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
