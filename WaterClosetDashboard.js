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
import { Bell, Droplets, AlertTriangle } from "lucide-react";
import "./WaterClosetDashboard.css";

export default function WaterClosetDashboard() {
  // Sample data based on provided values
  const initialData = [
    { time: "12:00 AM", Sensor_WaterUsage: 1.4, Sensor_LeakDetected: 0 },
    { time: "01:00 AM", Sensor_WaterUsage: 2.9, Sensor_LeakDetected: 0 },
    { time: "02:00 AM", Sensor_WaterUsage: 3.7, Sensor_LeakDetected: 0 },
    { time: "03:00 AM", Sensor_WaterUsage: 3.1, Sensor_LeakDetected: 0 },
    { time: "04:00 AM", Sensor_WaterUsage: 1.4, Sensor_LeakDetected: 0 },
    { time: "05:00 AM", Sensor_WaterUsage: 3.8, Sensor_LeakDetected: 0 },
    { time: "06:00 AM", Sensor_WaterUsage: 0, Sensor_LeakDetected: 0 },
    { time: "07:00 AM", Sensor_WaterUsage: 14.3, Sensor_LeakDetected: 0 },
    { time: "08:00 AM", Sensor_WaterUsage: 8.4, Sensor_LeakDetected: 0 },
    { time: "09:00 AM", Sensor_WaterUsage: 10.9, Sensor_LeakDetected: 0 },
    { time: "10:00 AM", Sensor_WaterUsage: 16.7, Sensor_LeakDetected: 0 },
    { time: "11:00 AM", Sensor_WaterUsage: 13.4, Sensor_LeakDetected: 0 },
    { time: "12:00 PM", Sensor_WaterUsage: 9.2, Sensor_LeakDetected: 0 },
    { time: "01:00 PM", Sensor_WaterUsage: 11.6, Sensor_LeakDetected: 0 },
    { time: "02:00 PM", Sensor_WaterUsage: 7.7, Sensor_LeakDetected: 0 },
    { time: "03:00 PM", Sensor_WaterUsage: 17.3, Sensor_LeakDetected: 1 },
    { time: "04:00 PM", Sensor_WaterUsage: 12, Sensor_LeakDetected: 0 },
    { time: "05:00 PM", Sensor_WaterUsage: 15.6, Sensor_LeakDetected: 0 },
    { time: "06:00 PM", Sensor_WaterUsage: 15.1, Sensor_LeakDetected: 0 },
    { time: "07:00 PM", Sensor_WaterUsage: 15, Sensor_LeakDetected: 0 },
    { time: "08:00 PM", Sensor_WaterUsage: 9, Sensor_LeakDetected: 0 },
    { time: "09:00 PM", Sensor_WaterUsage: 3.2, Sensor_LeakDetected: 0 },
    { time: "10:00 PM", Sensor_WaterUsage: 2.8, Sensor_LeakDetected: 0 },
    { time: "11:00 PM", Sensor_WaterUsage: 1.4, Sensor_LeakDetected: 0 },
  ];

  const [data, setData] = useState(initialData);
  const [currentTime, setCurrentTime] = useState("12:00 PM");
  const [currentWaterUsage, setCurrentWaterUsage] = useState(9.2);
  const [currentLeakStatus, setCurrentLeakStatus] = useState(0);
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmMessage, setAlarmMessage] = useState("");

  // Define normal parameters
  const normalWaterUsageMax = 15.0; // Gallons

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random data to simulate live readings
      const randomWaterUsage = Math.random() * 20; // Between 0 and 20 gallons
      // 5% chance of leak
      const leakDetected = Math.random() > 0.95 ? 1 : 0;

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
      setCurrentWaterUsage(randomWaterUsage.toFixed(1));
      setCurrentLeakStatus(leakDetected);

      // Check if alarm should be active
      if (randomWaterUsage > normalWaterUsageMax || leakDetected === 1) {
        setAlarmActive(true);
        if (leakDetected === 1) {
          setAlarmMessage("ALERT: Water leak detected!");
        } else if (randomWaterUsage > normalWaterUsageMax) {
          setAlarmMessage("High water usage detected!");
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
          Sensor_WaterUsage: parseFloat(randomWaterUsage.toFixed(1)),
          Sensor_LeakDetected: leakDetected,
        });
        return newData;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Water Closet BAS Dashboard</h1>
        <p className="dashboard-subtitle">
          Real-time monitoring of water usage and leak detection
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
                Water Usage:
                <span
                  className={`reading-value ${
                    parseFloat(currentWaterUsage) > normalWaterUsageMax
                      ? "value-danger"
                      : "value-success"
                  }`}
                >
                  {currentWaterUsage} Gallons
                </span>
              </p>
              <p className="reading-item">
                Leak Detected:
                <span
                  className={`reading-value ${
                    currentLeakStatus === 1 ? "value-danger" : "value-success"
                  }`}
                >
                  {currentLeakStatus === 1 ? "YES" : "NO"}
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
              <p className="equipment-value">WC-203</p>
            </div>
            <div className="equipment-item">
              <p className="equipment-label">Location:</p>
              <p className="equipment-value">2nd Floor Restroom</p>
            </div>
            <div className="equipment-item">
              <p className="equipment-label">Last Maintenance:</p>
              <p className="equipment-value">02/18/2025</p>
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
        <h2 className="panel-title">Water Usage History</h2>
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
                dataKey="Sensor_WaterUsage"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
                name="Water Usage (Gallons)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leak Detection History */}
      <div className="panel">
        <h2 className="panel-title">Leak Detection Alerts</h2>
        <div className="alerts-container">
          <table className="alerts-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Water Usage</th>
                <th>Action Required</th>
              </tr>
            </thead>
            <tbody>
              {data.filter((item) => item.Sensor_LeakDetected === 1).length >
              0 ? (
                data
                  .filter((item) => item.Sensor_LeakDetected === 1)
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.time}</td>
                      <td>{item.Sensor_WaterUsage} Gallons</td>
                      <td className="action-required">
                        Immediate Inspection Required
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-alerts">
                    No leak alerts detected
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily Usage Statistics */}
      <div className="panel">
        <h2 className="panel-title">Usage Statistics</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <Droplets size={32} className="stat-icon icon-blue-light" />
            <div className="stat-content">
              <p className="stat-label">Average Daily Usage</p>
              <p className="stat-value stat-blue-light">
                {(
                  data.reduce((sum, item) => sum + item.Sensor_WaterUsage, 0) /
                  data.length
                ).toFixed(1)}{" "}
                Gallons
              </p>
            </div>
          </div>
          <div className="stat-box">
            <Droplets size={32} className="stat-icon icon-blue-dark" />
            <div className="stat-content">
              <p className="stat-label">Peak Usage</p>
              <p className="stat-value stat-blue-dark">
                {Math.max(
                  ...data.map((item) => item.Sensor_WaterUsage)
                ).toFixed(1)}{" "}
                Gallons
              </p>
            </div>
          </div>
          <div className="stat-box">
            <AlertTriangle size={32} className="stat-icon icon-yellow" />
            <div className="stat-content">
              <p className="stat-label">Leak Incidents</p>
              <p className="stat-value stat-yellow">
                {data.filter((item) => item.Sensor_LeakDetected === 1).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
