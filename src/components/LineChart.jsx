import React from "react";
import { Col, Row, Typography } from "antd";
import { Line } from "react-chartjs-2/dist";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const LineChart = ({ history, currentPrice, coinName }) => {
  const { Title } = Typography;
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < history?.data?.history?.length; i += 1) {
    coinPrice.push(history?.data?.history[i].price);
  }

  const orderCoinTimestamp = [];
  for (let i = 0; i < history?.data?.history?.length; i += 1) {
    orderCoinTimestamp.push(history?.data?.history[i].timestamp);
  }
  orderCoinTimestamp.sort();
  for (let i = 0; i < orderCoinTimestamp.length; i++) {
    coinTimestamp.push(
      new Date(orderCoinTimestamp[i] * 1000).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
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

  const options = {
    scales: { y: { beginAtZero: true } },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {history?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
