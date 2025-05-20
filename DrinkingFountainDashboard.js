import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Bell } from "lucide-react";
import "./DrinkingFountainDashboard.css";

export default function DrinkingFountainDashboard() {
  // Sample data based on provided values
  const initialData = [
    {
      time: "12:00 AM",
      Sensor_WaterFlowRate: 0.45,
      Sensor_WaterQuality: "Good",
    },
    { time: "01:00 AM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    { time: "02:00 AM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    {
      time: "03:00 AM",
      Sensor_WaterFlowRate: 0.33,
      Sensor_WaterQuality: "Good",
    },
    { time: "04:00 AM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    { time: "05:00 AM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    {
      time: "06:00 AM",
      Sensor_WaterFlowRate: 0.53,
      Sensor_WaterQuality: "Good",
    },
    { time: "07:00 AM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    { time: "08:00 AM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    {
      time: "09:00 AM",
      Sensor_WaterFlowRate: 0.31,
      Sensor_WaterQuality: "Good",
    },
    { time: "10:00 AM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    { time: "11:00 AM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    {
      time: "12:00 PM",
      Sensor_WaterFlowRate: 0.4,
      Sensor_WaterQuality: "Good",
    },
    { time: "01:00 PM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    { time: "02:00 PM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    {
      time: "03:00 PM",
      Sensor_WaterFlowRate: 0.56,
      Sensor_WaterQuality: "Good",
    },
    { time: "04:00 PM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    { time: "05:00 PM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    {
      time: "06:00 PM",
      Sensor_WaterFlowRate: 0.58,
      Sensor_WaterQuality: "Good",
    },
    { time: "07:00 PM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    { time: "08:00 PM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    {
      time: "09:00 PM",
      Sensor_WaterFlowRate: 0.56,
      Sensor_WaterQuality: "Good",
    },
    { time: "10:00 PM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
    { time: "11:00 PM", Sensor_WaterFlowRate: 0, Sensor_WaterQuality: "Good" },
  ];

  const [data, setData] = useState(initialData);
  const [currentTime, setCurrentTime] = useState("12:00 PM");
  const [currentFlowRate, setCurrentFlowRate] = useState(0.4);
  const [currentQuality, setCurrentQuality] = useState("Good");
  const [alarmActive, setAlarmActive] = useState(true);
  const [alarmMessage, setAlarmMessage] = useState(
    "Flow rate exceeds normal parameters!"
  );

  // Define normal parameters
  const normalFlowRateMin = 0;
  const normalFlowRateMax = 0.5;

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random data to simulate live readings
      const randomFlowRate = Math.random() * 0.8; // Between 0 and 0.8 GPM
      const newQuality = Math.random() > 0.9 ? "Poor" : "Good"; // 10% chance of poor quality

      // Get current time
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const timeString = `${formattedHours}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${ampm}`;

      setCurrentTime(timeString);
      setCurrentFlowRate(randomFlowRate.toFixed(2));
      setCurrentQuality(newQuality);

      // Check if alarm should be active
      if (randomFlowRate > normalFlowRateMax || newQuality === "Poor") {
        setAlarmActive(true);
        if (randomFlowRate > normalFlowRateMax) {
          setAlarmMessage("Flow rate exceeds normal parameters!");
        } else {
          setAlarmMessage("Water quality issue detected!");
        }
      } else {
        setAlarmActive(false);
        setAlarmMessage("");
      }

      // Add new data point to chart
      setData((prevData) => {
        const newData = [...prevData];
        if (newData.length > 24) newData.shift(); // Keep only last 24 points
        newData.push({
          time: timeString,
          Sensor_WaterFlowRate: parseFloat(randomFlowRate.toFixed(2)),
          Sensor_WaterQuality: newQuality,
        });
        return newData;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Drinking Fountain BAS Dashboard</h1>
        <p className="dashboard-subtitle">
          Real-time monitoring of water flow rate and quality
        </p>
      </div>

      <div className="panel-grid">
        {/* Current Readings Panel */}
        <div className="panel">
          <h2 className="panel-title">Current Readings</h2>
          <div className="readings-container">
            <div className="readings-data">
              <p className="reading-item">
                Time: <span className="reading-value">{currentTime}</span>
              </p>
              <p className="reading-item">
                Water Flow Rate:
                <span
                  className={`reading-value ${
                    parseFloat(currentFlowRate) > normalFlowRateMax
                      ? "value-danger"
                      : "value-success"
                  }`}
                >
                  {currentFlowRate} GPM
                </span>
              </p>
              <p className="reading-item">
                Water Quality:
                <span
                  className={`reading-value ${
                    currentQuality === "Poor" ? "value-danger" : "value-success"
                  }`}
                >
                  {currentQuality}
                </span>
              </p>
            </div>

            {/* Alarm Status */}
            <div
              className={`alarm-box ${
                alarmActive ? "alarm-active" : "alarm-normal"
              }`}
            >
              <div className="alarm-header">
                <Bell
                  size={24}
                  className={`alarm-icon ${alarmActive ? "pulse" : ""}`}
                />
                <span className="alarm-title">
                  {alarmActive ? "ALARM ACTIVE" : "Normal Operation"}
                </span>
              </div>
              {alarmActive && <p className="alarm-message">{alarmMessage}</p>}
            </div>
          </div>
        </div>

        {/* Equipment Status */}
        <div className="panel">
          <h2 className="panel-title">Equipment Status</h2>
          <div className="equipment-grid">
            <div className="equipment-item">
              <p className="equipment-label">Equipment ID:</p>
              <p className="equipment-value">DF-101</p>
            </div>
            <div className="equipment-item">
              <p className="equipment-label">Location:</p>
              <p className="equipment-value">Main Hallway</p>
            </div>
            <div className="equipment-item">
              <p className="equipment-label">Last Maintenance:</p>
              <p className="equipment-value">03/15/2025</p>
            </div>
            <div className="equipment-item">
              <p className="equipment-label">Status:</p>
              <p
                className={`equipment-value ${
                  alarmActive ? "value-danger" : "value-success"
                }`}
              >
                {alarmActive ? "Needs Attention" : "Operational"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="panel">
        <h2 className="panel-title">Water Flow Rate History</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Sensor_WaterFlowRate"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
                name="Water Flow Rate (GPM)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Water Quality History */}
      <div className="panel">
        <h2 className="panel-title">Water Quality Alerts</h2>
        <div className="alerts-container">
          <table className="alerts-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.filter((item) => item.Sensor_WaterQuality === "Poor")
                .length > 0 ? (
                data
                  .filter((item) => item.Sensor_WaterQuality === "Poor")
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.time}</td>
                      <td className="status-poor">Poor</td>
                      <td>Service Required</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-alerts">
                    No water quality alerts
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
