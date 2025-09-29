import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
];

const BarChart = ({
  horizontal = false,
  title_1,
  title_2,
  data_1,
  data_2,
  color_1,
  color_2,
  labels = months,
}) => {
  const BarDataElement = {
    labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: color_1,
        barThickness: 20,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: color_2,
        barThickness: 20,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={BarDataElement} options={options} />;
};

export const Doughnuts = ({
  title,
  data,
  backgroundColor,
  labels,
  offset,
  cutout,
}) => {
  const dataElement = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: backgroundColor,
        offset: offset,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
    cutout: cutout,
  };

  return <Doughnut data={dataElement} options={options} />;
};

export default BarChart;
