import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Bell, ArrowUp, Weight, Repeat } from "lucide-react";
import "./ElevatorDashboard.css";

export default function ElevatorDashboard() {
  // Sample data based on provided values
  const initialData = [
    {
      time: "12:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 542,
      Sensor_DoorOperations: 0,
    },
    {
      time: "01:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1272,
      Sensor_DoorOperations: 5,
    },
    {
      time: "02:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 520,
      Sensor_DoorOperations: 4,
    },
    {
      time: "03:00 AM",
      Sensor_OperationalStatus: 0,
      Sensor_LoadWeight: 1140,
      Sensor_DoorOperations: 1,
    },
    {
      time: "04:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 816,
      Sensor_DoorOperations: 4,
    },
    {
      time: "05:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1317,
      Sensor_DoorOperations: 3,
    },
    {
      time: "06:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 851,
      Sensor_DoorOperations: 15,
    },
    {
      time: "07:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1141,
      Sensor_DoorOperations: 22,
    },
    {
      time: "08:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 526,
      Sensor_DoorOperations: 22,
    },
    {
      time: "09:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1292,
      Sensor_DoorOperations: 20,
    },
    {
      time: "10:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 852,
      Sensor_DoorOperations: 18,
    },
    {
      time: "11:00 AM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1126,
      Sensor_DoorOperations: 30,
    },
    {
      time: "12:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 520,
      Sensor_DoorOperations: 21,
    },
    {
      time: "01:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1366,
      Sensor_DoorOperations: 16,
    },
    {
      time: "02:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 619,
      Sensor_DoorOperations: 24,
    },
    {
      time: "03:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1079,
      Sensor_DoorOperations: 21,
    },
    {
      time: "04:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 894,
      Sensor_DoorOperations: 21,
    },
    {
      time: "05:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1374,
      Sensor_DoorOperations: 23,
    },
    {
      time: "06:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 443,
      Sensor_DoorOperations: 17,
    },
    {
      time: "07:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1153,
      Sensor_DoorOperations: 17,
    },
    {
      time: "08:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 616,
      Sensor_DoorOperations: 22,
    },
    {
      time: "09:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1239,
      Sensor_DoorOperations: 2,
    },
    {
      time: "10:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 444,
      Sensor_DoorOperations: 0,
    },
    {
      time: "11:00 PM",
      Sensor_OperationalStatus: 1,
      Sensor_LoadWeight: 1268,
      Sensor_DoorOperations: 1,
    },
  ];

  const [data, setData] = useState(initialData);
  const [currentTime, setCurrentTime] = useState("12:00 PM");
  const [operationalStatus, setOperationalStatus] = useState(1);
  const [loadWeight, setLoadWeight] = useState(520);
  const [doorOperations, setDoorOperations] = useState(21);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmMessage, setAlarmMessage] = useState("");

  // Define normal parameters
  const maxSafeWeight = 1400; // lbs
  const maxDoorOperations = 500; // daily threshold for maintenance
  const totalDailyOperations = data.reduce(
    (sum, item) => sum + item.Sensor_DoorOperations,
    0
  );
  const currentDoorOpCycles = totalDailyOperations;

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random data to simulate live readings
      const randomWeight = Math.floor(Math.random() * 1500); // Between 0 and 1500 lbs
      const randomDoorOps = Math.floor(Math.random() * 10); // 0-10 cycles since last check
      const status = Math.random() > 0.05 ? 1 : 0; // 5% chance of being offline
      const newFloor = Math.floor(Math.random() * 10) + 1; // Building has 10 floors

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
      setOperationalStatus(status);
      setLoadWeight(randomWeight);
      setDoorOperations((prevOps) => prevOps + randomDoorOps);
      setCurrentFloor(newFloor);

      // Check if alarm should be active
      if (randomWeight > maxSafeWeight || status === 0) {
        setAlarmActive(true);
        if (status === 0) {
          setAlarmMessage("ALERT: Elevator offline! Maintenance required.");
        } else if (randomWeight > maxSafeWeight) {
          setAlarmMessage(
            `Weight exceeds maximum capacity of ${maxSafeWeight} lbs!`
          );
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
          Sensor_OperationalStatus: status,
          Sensor_LoadWeight: randomWeight,
          Sensor_DoorOperations: randomDoorOps,
        });
        return newData;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Elevator BAS Dashboard</h1>
        <p className="dashboard-subtitle">
          Real-time monitoring of elevator systems
        </p>
      </div>

      <div className="panel-grid">
        {/* Current Status Panel */}
        <div className="panel">
          <h2 className="panel-title">Current Status</h2>
          <div className="status-list">
            <div className="status-item">
              <span className="status-label">Operational Status:</span>
              <span
                className={`status-value ${
                  operationalStatus === 1 ? "status-active" : "status-offline"
                }`}
              >
                {operationalStatus === 1 ? "ACTIVE" : "OFFLINE"}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Current Floor:</span>
              <span className="status-value">{currentFloor}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Current Load:</span>
              <span
                className={`status-value ${
                  loadWeight > maxSafeWeight
                    ? "status-danger"
                    : "status-success"
                }`}
              >
                {loadWeight} lbs
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Door Cycles Today:</span>
              <span className="status-value">{currentDoorOpCycles}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Time:</span>
              <span className="status-value">{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Alarm Status */}
        <div className="panel">
          <h2 className="panel-title">Alarm Status</h2>
          <div
            className={`alarm-container ${
              alarmActive ? "alarm-active" : "alarm-normal"
            }`}
          >
            <div className="alarm-header">
              <Bell
                size={32}
                className={`alarm-icon ${alarmActive ? "pulse" : ""}`}
              />
              <span className="alarm-title">
                {alarmActive ? "ALARM ACTIVE" : "Normal Operation"}
              </span>
            </div>
            {alarmActive ? (
              <p className="alarm-message">{alarmMessage}</p>
            ) : (
              <p className="normal-message">
                All systems functioning within parameters
              </p>
            )}
          </div>
        </div>

        {/* Equipment Details */}
        <div className="panel">
          <h2 className="panel-title">Equipment Details</h2>
          <div className="equipment-grid">
            <div className="equipment-item">
              <p className="equipment-label">Equipment ID:</p>
              <p className="equipment-value">EL-101</p>
            </div>
            <div className="equipment-item">
              <p className="equipment-label">Location:</p>
              <p className="equipment-value">Main Building</p>
            </div>
            <div className="equipment-item">
              <p className="equipment-label">Last Maintenance:</p>
              <p className="equipment-value">03/10/2025</p>
            </div>
            <div className="equipment-item">
              <p className="equipment-label">Max Capacity:</p>
              <p className="equipment-value">{maxSafeWeight} lbs</p>
            </div>
          </div>
          <div className="maintenance-box">
            <p className="equipment-label">Maintenance Recommendation:</p>
            <p
              className={`equipment-value ${
                currentDoorOpCycles > maxDoorOperations * 0.8
                  ? "warning"
                  : "success"
              }`}
            >
              {currentDoorOpCycles > maxDoorOperations * 0.8
                ? "Schedule maintenance soon - approaching cycle limit"
                : "Regular maintenance schedule"}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-grid">
        {/* Load Weight Chart */}
        <div className="panel">
          <h2 className="panel-title">Load Weight History</h2>
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
                  dataKey="Sensor_LoadWeight"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name="Load Weight (lbs)"
                />
                {/* Add a reference line for max weight */}
                <Line
                  type="monotone"
                  dataKey={() => maxSafeWeight}
                  stroke="#ef4444"
                  strokeDasharray="5 5"
                  name="Max Safe Weight"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Door Operations Chart */}
        <div className="panel">
          <h2 className="panel-title">Door Operations History</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Sensor_DoorOperations"
                  fill="#10b981"
                  name="Door Operations (Cycles)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Operational History */}
      <div className="panel">
        <h2 className="panel-title">System Health Statistics</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <ArrowUp size={32} className="stat-icon icon-blue" />
            <div>
              <p className="stat-label">Operational Uptime</p>
              <p className="stat-value stat-blue">
                {(
                  (data.filter((item) => item.Sensor_OperationalStatus === 1)
                    .length /
                    data.length) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>
          <div className="stat-box">
            <Weight size={32} className="stat-icon icon-purple" />
            <div>
              <p className="stat-label">Average Load</p>
              <p className="stat-value stat-purple">
                {(
                  data.reduce((sum, item) => sum + item.Sensor_LoadWeight, 0) /
                  data.length
                ).toFixed(0)}{" "}
                lbs
              </p>
            </div>
          </div>
          <div className="stat-box">
            <Repeat size={32} className="stat-icon icon-green" />
            <div>
              <p className="stat-label">Door Cycle Count</p>
              <p className="stat-value stat-green">
                {totalDailyOperations} / {maxDoorOperations}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Alerts */}
      <div className="panel">
        <h2 className="panel-title">System Alerts</h2>
        <div className="alerts-container">
          <table className="alerts-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Alert Type</th>
                <th>Description</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {data.filter(
                (item) =>
                  item.Sensor_OperationalStatus === 0 ||
                  item.Sensor_LoadWeight > maxSafeWeight
              ).length > 0 ? (
                data
                  .filter(
                    (item) =>
                      item.Sensor_OperationalStatus === 0 ||
                      item.Sensor_LoadWeight > maxSafeWeight
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.time}</td>
                      <td className="alert-type">
                        {item.Sensor_OperationalStatus === 0
                          ? "System Offline"
                          : "Overload Warning"}
                      </td>
                      <td>
                        {item.Sensor_OperationalStatus === 0
                          ? "Elevator system offline"
                          : `Weight exceeded: ${item.Sensor_LoadWeight} lbs`}
                      </td>
                      <td>
                        <span
                          className={`priority-badge ${
                            item.Sensor_OperationalStatus === 0
                              ? "critical"
                              : "warning"
                          }`}
                        >
                          {item.Sensor_OperationalStatus === 0
                            ? "Critical"
                            : "Warning"}
                        </span>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-alerts">
                    No system alerts
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
