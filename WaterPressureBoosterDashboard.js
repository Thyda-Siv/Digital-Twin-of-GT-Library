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
  ReferenceLine,
} from "recharts";
import { Bell, Droplets, Gauge, Power } from "lucide-react";
import "./WaterPressureBoosterDashboard.css";

export default function WaterPressureBoosterDashboard() {
  // Sample data based on provided values
  const initialData = [
    {
      time: "12:00 AM",
      Sensor_WaterPressure: 49.9,
      Sensor_FlowRate: 18.6,
      Sensor_PumpStatus: 1,
    },
    {
      time: "01:00 AM",
      Sensor_WaterPressure: 53.6,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "02:00 AM",
      Sensor_WaterPressure: 48.5,
      Sensor_FlowRate: 19.2,
      Sensor_PumpStatus: 1,
    },
    {
      time: "03:00 AM",
      Sensor_WaterPressure: 51.9,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "04:00 AM",
      Sensor_WaterPressure: 52.0,
      Sensor_FlowRate: 16.5,
      Sensor_PumpStatus: 1,
    },
    {
      time: "05:00 AM",
      Sensor_WaterPressure: 50.7,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "06:00 AM",
      Sensor_WaterPressure: 50.8,
      Sensor_FlowRate: 19.4,
      Sensor_PumpStatus: 1,
    },
    {
      time: "07:00 AM",
      Sensor_WaterPressure: 55.0,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "08:00 AM",
      Sensor_WaterPressure: 46.3,
      Sensor_FlowRate: 13.5,
      Sensor_PumpStatus: 1,
    },
    {
      time: "09:00 AM",
      Sensor_WaterPressure: 53.8,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "10:00 AM",
      Sensor_WaterPressure: 52.7,
      Sensor_FlowRate: 12.2,
      Sensor_PumpStatus: 1,
    },
    {
      time: "11:00 AM",
      Sensor_WaterPressure: 46.6,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "12:00 PM",
      Sensor_WaterPressure: 46.1,
      Sensor_FlowRate: 15.0,
      Sensor_PumpStatus: 1,
    },
    {
      time: "01:00 PM",
      Sensor_WaterPressure: 45.2,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "02:00 PM",
      Sensor_WaterPressure: 50.7,
      Sensor_FlowRate: 15.2,
      Sensor_PumpStatus: 1,
    },
    {
      time: "03:00 PM",
      Sensor_WaterPressure: 46.2,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "04:00 PM",
      Sensor_WaterPressure: 51.3,
      Sensor_FlowRate: 13.3,
      Sensor_PumpStatus: 1,
    },
    {
      time: "05:00 PM",
      Sensor_WaterPressure: 48.8,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "06:00 PM",
      Sensor_WaterPressure: 47.9,
      Sensor_FlowRate: 18.7,
      Sensor_PumpStatus: 1,
    },
    {
      time: "07:00 PM",
      Sensor_WaterPressure: 38.0,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "08:00 PM",
      Sensor_WaterPressure: 45.1,
      Sensor_FlowRate: 13.5,
      Sensor_PumpStatus: 1,
    },
    {
      time: "09:00 PM",
      Sensor_WaterPressure: 45.9,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
    {
      time: "10:00 PM",
      Sensor_WaterPressure: 48.6,
      Sensor_FlowRate: 14.7,
      Sensor_PumpStatus: 1,
    },
    {
      time: "11:00 PM",
      Sensor_WaterPressure: 48.3,
      Sensor_FlowRate: 0,
      Sensor_PumpStatus: 0,
    },
  ];

  const [data, setData] = useState(initialData);
  const [currentTime, setCurrentTime] = useState("12:00 PM");
  const [waterPressure, setWaterPressure] = useState(46.1);
  const [flowRate, setFlowRate] = useState(15.0);
  const [pumpStatus, setPumpStatus] = useState(1);
  const [pumpRunTime, setPumpRunTime] = useState(0);
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmMessage, setAlarmMessage] = useState("");

  // Define normal parameters
  const minSafePressure = 40.0; // psi
  const maxSafePressure = 55.0; // psi
  const maxFlowRate = 20.0; // GPM
  const cycleCount =
    data.filter(
      (item, index, array) =>
        index > 0 &&
        item.Sensor_PumpStatus !== array[index - 1].Sensor_PumpStatus
    ).length / 2; // Count how many times pump has cycled (ON to OFF)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate more realistic water pressure booster behavior
      // When pump is on, pressure should increase or stay stable
      // When pump is off, pressure may decrease
      let newPumpStatus;
      let newPressure;
      let newFlowRate;

      if (pumpStatus === 1) {
        // If pump is currently on, it may stay on or turn off
        newPumpStatus = waterPressure > 52 ? 0 : 1;
        newPressure =
          newPumpStatus === 1
            ? Math.min(waterPressure + Math.random() * 1.5, 55)
            : waterPressure;
        newFlowRate =
          newPumpStatus === 1
            ? Math.max(10, Math.min(20, 15 + (Math.random() - 0.5) * 5))
            : 0;
      } else {
        // If pump is currently off, it may stay off or turn on if pressure drops
        newPumpStatus = waterPressure < 45 ? 1 : 0;
        newPressure =
          newPumpStatus === 0
            ? Math.max(38, waterPressure - Math.random() * 2)
            : waterPressure;
        newFlowRate =
          newPumpStatus === 1
            ? Math.max(10, Math.min(20, 15 + (Math.random() - 0.5) * 5))
            : 0;
      }

      // Round to 1 decimal place
      newPressure = Math.round(newPressure * 10) / 10;
      newFlowRate = Math.round(newFlowRate * 10) / 10;

      // Update pump runtime counter
      if (newPumpStatus === 1) {
        setPumpRunTime((prevTime) => prevTime + 3); // 3 seconds since last update
      }

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
      setWaterPressure(newPressure);
      setFlowRate(newFlowRate);
      setPumpStatus(newPumpStatus);

      // Check if alarm should be active
      if (
        newPressure < minSafePressure ||
        newPressure > maxSafePressure ||
        newFlowRate > maxFlowRate
      ) {
        setAlarmActive(true);
        if (newPressure < minSafePressure) {
          setAlarmMessage(
            "Low water pressure detected! System may not meet demand."
          );
        } else if (newPressure > maxSafePressure) {
          setAlarmMessage(
            "High water pressure detected! Risk of damage to system."
          );
        } else if (newFlowRate > maxFlowRate) {
          setAlarmMessage("Flow rate exceeds system design parameters!");
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
          Sensor_WaterPressure: newPressure,
          Sensor_FlowRate: newFlowRate,
          Sensor_PumpStatus: newPumpStatus,
        });
        return newData;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [waterPressure, pumpStatus]);

  // Format pump runtime for display
  const formatRuntime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Water Pressure Booster System Dashboard
        </h1>
        <p className="dashboard-subtitle">
          Real-time monitoring of water pressure, flow rate, and pump operation
        </p>
      </div>

      <div className="panel-grid">
        {/* Current Readings Panel */}
        <div className="panel">
          <h2 className="panel-title">Current Readings</h2>
          <div className="readings-container">
            <div className="reading-row">
              <div className="reading-label">
                <Gauge size={24} className="icon-blue" />
                <span>Water Pressure:</span>
              </div>
              <span
                className={`reading-value ${
                  waterPressure < minSafePressure ||
                  waterPressure > maxSafePressure
                    ? "value-danger"
                    : "value-success"
                }`}
              >
                {waterPressure} psi
              </span>
            </div>

            <div className="reading-row">
              <div className="reading-label">
                <Droplets size={24} className="icon-blue" />
                <span>Flow Rate:</span>
              </div>
              <span
                className={`reading-value ${
                  flowRate > maxFlowRate ? "value-danger" : "value-success"
                }`}
              >
                {flowRate} GPM
              </span>
            </div>

            <div className="reading-row">
              <div className="reading-label">
                <Power size={24} className="icon-blue" />
                <span>Pump Status:</span>
              </div>
              <span
                className={`reading-value ${
                  pumpStatus === 1 ? "value-success" : "value-neutral"
                }`}
              >
                {pumpStatus === 1 ? "RUNNING" : "OFF"}
              </span>
            </div>

            <div className="time-display">
              <p>
                Time: <span className="time-value">{currentTime}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Alarm Status */}
        <div className="panel">
          <h2 className="panel-title">System Status</h2>
          <div
            className={`status-box ${
              alarmActive ? "status-alarm" : "status-normal"
            }`}
          >
            <div className="status-header">
              <Bell
                size={32}
                className={alarmActive ? "icon-alarm pulse" : "icon-success"}
              />
              <span
                className={`status-text ${
                  alarmActive ? "text-alarm" : "text-success"
                }`}
              >
                {alarmActive ? "ALARM ACTIVE" : "Normal Operation"}
              </span>
            </div>
            {alarmActive ? (
              <p className="alarm-message">{alarmMessage}</p>
            ) : (
              <p className="status-message">
                All parameters within normal range
              </p>
            )}
          </div>
        </div>

        {/* Equipment Stats */}
        <div className="panel">
          <h2 className="panel-title">Equipment Stats</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <p className="stat-label">Equipment ID:</p>
              <p className="stat-value">PBS-101</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">Location:</p>
              <p className="stat-value">Mechanical Room</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">Pump Run Time:</p>
              <p className="stat-value">{formatRuntime(pumpRunTime)}</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">ON/OFF Cycles:</p>
              <p className="stat-value">{cycleCount}</p>
            </div>
          </div>
          <div className="maintenance-box">
            <p className="stat-label">Last Maintenance:</p>
            <p className="stat-value">04/01/2025</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-section">
        {/* Pressure and Flow Rate Chart */}
        <div className="panel">
          <h2 className="panel-title">System Performance History</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <ReferenceLine
                  yAxisId="left"
                  y={minSafePressure}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label={{
                    value: "Min Pressure",
                    fill: "#ef4444",
                    fontSize: 10,
                  }}
                />
                <ReferenceLine
                  yAxisId="left"
                  y={maxSafePressure}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label={{
                    value: "Max Pressure",
                    fill: "#ef4444",
                    fontSize: 10,
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Sensor_WaterPressure"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name="Water Pressure (psi)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="Sensor_FlowRate"
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                  name="Flow Rate (GPM)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pump Status History */}
        <div className="panel">
          <h2 className="panel-title">Pump Operation History</h2>
          <div className="pump-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 1]} ticks={[0, 1]} />
                <Tooltip formatter={(value) => (value === 1 ? "ON" : "OFF")} />
                <Legend />
                <Line
                  type="stepAfter"
                  dataKey="Sensor_PumpStatus"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ r: 1 }}
                  activeDot={{ r: 5 }}
                  name="Pump Status"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* System Analytics */}
      <div className="panel analytics-panel">
        <h2 className="panel-title">System Analytics</h2>
        <div className="analytics-grid">
          <div className="analytics-box">
            <h3 className="analytics-title">Pressure Statistics</h3>
            <div className="analytics-content">
              <div className="analytics-row">
                <span className="analytics-label">Average:</span>
                <span className="analytics-value">
                  {(
                    data.reduce(
                      (sum, item) => sum + item.Sensor_WaterPressure,
                      0
                    ) / data.length
                  ).toFixed(1)}{" "}
                  psi
                </span>
              </div>
              <div className="analytics-row">
                <span className="analytics-label">Minimum:</span>
                <span className="analytics-value">
                  {Math.min(
                    ...data.map((item) => item.Sensor_WaterPressure)
                  ).toFixed(1)}{" "}
                  psi
                </span>
              </div>
              <div className="analytics-row">
                <span className="analytics-label">Maximum:</span>
                <span className="analytics-value">
                  {Math.max(
                    ...data.map((item) => item.Sensor_WaterPressure)
                  ).toFixed(1)}{" "}
                  psi
                </span>
              </div>
            </div>
          </div>

          <div className="analytics-box">
            <h3 className="analytics-title">Flow Rate Statistics</h3>
            <div className="analytics-content">
              <div className="analytics-row">
                <span className="analytics-label">Average (when on):</span>
                <span className="analytics-value">
                  {(
                    data
                      .filter((item) => item.Sensor_FlowRate > 0)
                      .reduce((sum, item) => sum + item.Sensor_FlowRate, 0) /
                    data.filter((item) => item.Sensor_FlowRate > 0).length
                  ).toFixed(1)}{" "}
                  GPM
                </span>
              </div>
              <div className="analytics-row">
                <span className="analytics-label">Minimum (when on):</span>
                <span className="analytics-value">
                  {Math.min(
                    ...data
                      .filter((item) => item.Sensor_FlowRate > 0)
                      .map((item) => item.Sensor_FlowRate)
                  ).toFixed(1)}{" "}
                  GPM
                </span>
              </div>
              <div className="analytics-row">
                <span className="analytics-label">Maximum:</span>
                <span className="analytics-value">
                  {Math.max(
                    ...data.map((item) => item.Sensor_FlowRate)
                  ).toFixed(1)}{" "}
                  GPM
                </span>
              </div>
            </div>
          </div>

          <div className="analytics-box">
            <h3 className="analytics-title">Pump Efficiency</h3>
            <div className="analytics-content">
              <div className="analytics-row">
                <span className="analytics-label">Duty Cycle:</span>
                <span className="analytics-value">
                  {(
                    (data.filter((item) => item.Sensor_PumpStatus === 1)
                      .length /
                      data.length) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="analytics-row">
                <span className="analytics-label">Cycling Rate:</span>
                <span
                  className={`analytics-value ${
                    cycleCount > 12 ? "value-warning" : "value-success"
                  }`}
                >
                  {cycleCount} cycles/day
                </span>
              </div>
              <div className="analytics-row">
                <span className="analytics-label">System Health:</span>
                <span
                  className={`analytics-value ${
                    cycleCount > 15
                      ? "value-danger"
                      : cycleCount > 12
                      ? "value-warning"
                      : "value-success"
                  }`}
                >
                  {cycleCount > 15 ? "Poor" : cycleCount > 12 ? "Fair" : "Good"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alarm History */}
      <div className="panel">
        <h2 className="panel-title">Alarm History</h2>
        <div className="alarm-history-container">
          <table className="alarm-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Parameter</th>
                <th>Value</th>
                <th>Condition</th>
              </tr>
            </thead>
            <tbody>
              {data.filter(
                (item) =>
                  item.Sensor_WaterPressure < minSafePressure ||
                  item.Sensor_WaterPressure > maxSafePressure ||
                  item.Sensor_FlowRate > maxFlowRate
              ).length > 0 ? (
                data
                  .filter(
                    (item) =>
                      item.Sensor_WaterPressure < minSafePressure ||
                      item.Sensor_WaterPressure > maxSafePressure ||
                      item.Sensor_FlowRate > maxFlowRate
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.time}</td>
                      <td>
                        {item.Sensor_WaterPressure < minSafePressure ||
                        item.Sensor_WaterPressure > maxSafePressure
                          ? "Water Pressure"
                          : "Flow Rate"}
                      </td>
                      <td className="alarm-value">
                        {item.Sensor_WaterPressure < minSafePressure ||
                        item.Sensor_WaterPressure > maxSafePressure
                          ? `${item.Sensor_WaterPressure} psi`
                          : `${item.Sensor_FlowRate} GPM`}
                      </td>
                      <td>
                        {item.Sensor_WaterPressure < minSafePressure
                          ? "Below Minimum"
                          : item.Sensor_WaterPressure > maxSafePressure
                          ? "Above Maximum"
                          : "Excessive Flow"}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-alarms">
                    No alarms recorded
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
