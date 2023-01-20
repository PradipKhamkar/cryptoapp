import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];
  coinHistory.history.map((history, i) => {
    coinPrice.push(history.price);
    coinTimeStamp.push(new Date(history.timestamp * 1000).toLocaleDateString());
  });

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <>
      <div className="chart__header">
        <h4 className="chart__heading">{coinName}</h4>
        <div className="price__container">
          <h5 className="price__change">{coinHistory?.change}%</h5>
          <h5 className="current__price">
            Current{coinName} Price: ${currentPrice}
          </h5>
        </div>
      </div>
      <Line
        data={data}
        width={window.innerWidth <= 788 ? "100%" : ""}
        className="line__chart__graph"
      />
    </>
  );
};

export default LineChart;
