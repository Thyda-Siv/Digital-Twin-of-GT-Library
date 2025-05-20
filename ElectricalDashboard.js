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
import { Bell, AlertTriangle, Check, X, Zap, Activity } from "lucide-react";
import "./ElectricalDashboard.css";

const electricalData = [
  {
    time: "12:00 AM",
    Sensor_VoltageLoad: 228.6,
    Sensor_CurrentPhase: 20,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "01:00 AM",
    Sensor_VoltageLoad: 230.8,
    Sensor_CurrentPhase: 12.1,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "02:00 AM",
    Sensor_VoltageLoad: 229.8,
    Sensor_CurrentPhase: 13.8,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "03:00 AM",
    Sensor_VoltageLoad: 229.5,
    Sensor_CurrentPhase: 11,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "04:00 AM",
    Sensor_VoltageLoad: 230.3,
    Sensor_CurrentPhase: 13.4,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "05:00 AM",
    Sensor_VoltageLoad: 228.7,
    Sensor_CurrentPhase: 18.3,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "06:00 AM",
    Sensor_VoltageLoad: 229.7,
    Sensor_CurrentPhase: 14.2,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "07:00 AM",
    Sensor_VoltageLoad: 229.6,
    Sensor_CurrentPhase: 15.1,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "08:00 AM",
    Sensor_VoltageLoad: 232,
    Sensor_CurrentPhase: 19.7,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "09:00 AM",
    Sensor_VoltageLoad: 228.4,
    Sensor_CurrentPhase: 18.7,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "10:00 AM",
    Sensor_VoltageLoad: 228.7,
    Sensor_CurrentPhase: 16.3,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "11:00 AM",
    Sensor_VoltageLoad: 215,
    Sensor_CurrentPhase: 15.2,
    Sensor_BreakerStatus: 1,
  },
  {
    time: "12:00 PM",
    Sensor_VoltageLoad: 229.2,
    Sensor_CurrentPhase: 19.4,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "01:00 PM",
    Sensor_VoltageLoad: 228.1,
    Sensor_CurrentPhase: 19.9,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "02:00 PM",
    Sensor_VoltageLoad: 231.7,
    Sensor_CurrentPhase: 10.6,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "03:00 PM",
    Sensor_VoltageLoad: 230.4,
    Sensor_CurrentPhase: 10.8,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "04:00 PM",
    Sensor_VoltageLoad: 228.5,
    Sensor_CurrentPhase: 12.3,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "05:00 PM",
    Sensor_VoltageLoad: 231.6,
    Sensor_CurrentPhase: 16.1,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "06:00 PM",
    Sensor_VoltageLoad: 228.6,
    Sensor_CurrentPhase: 13.1,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "07:00 PM",
    Sensor_VoltageLoad: 231.6,
    Sensor_CurrentPhase: 15.7,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "08:00 PM",
    Sensor_VoltageLoad: 230.5,
    Sensor_CurrentPhase: 16.6,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "09:00 PM",
    Sensor_VoltageLoad: 229.1,
    Sensor_CurrentPhase: 15.3,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "10:00 PM",
    Sensor_VoltageLoad: 229.2,
    Sensor_CurrentPhase: 10.2,
    Sensor_BreakerStatus: 0,
  },
  {
    time: "11:00 PM",
    Sensor_VoltageLoad: 228.5,
    Sensor_CurrentPhase: 13.8,
    Sensor_BreakerStatus: 0,
  },
];

// Alarm thresholds
const VOLTAGE_MIN = 220;
const VOLTAGE_MAX = 240;
const VOLTAGE_WARNING_LOW = 225;
const VOLTAGE_WARNING_HIGH = 235;
const CURRENT_WARNING = 18;
const CURRENT_CRITICAL = 22;

export default function ElectricalDashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [alarms, setAlarms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(16); // Start at 4:00 PM
  const [currentData, setCurrentData] = useState(electricalData[16]);

  // Calculate power using P = V * I
  const calculatePower = (voltage, current) => {
    return ((voltage * current) / 1000).toFixed(2);
  };

  // Add power calculation to each data point
  const enhancedData = electricalData.map((item) => ({
    ...item,
    Power: calculatePower(item.Sensor_VoltageLoad, item.Sensor_CurrentPhase),
  }));

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());

      // Cycle through data to simulate real-time updates
      setCurrentIndex((prevIndex) => (prevIndex + 1) % electricalData.length);
      setCurrentData(electricalData[currentIndex]);

      // Check for alarms
      checkAlarms(electricalData[currentIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Function to check alarms based on current data
  const checkAlarms = (data) => {
    const newAlarms = [];

    // Breaker status alarm (highest priority)
    if (data.Sensor_BreakerStatus === 1) {
      newAlarms.push({
        id: Date.now() + 1,
        message: "Circuit breaker has tripped",
        level: "critical",
        value: "TRIPPED",
        time: data.time,
      });
    }

    // Voltage alarms
    if (data.Sensor_VoltageLoad < VOLTAGE_MIN) {
      newAlarms.push({
        id: Date.now() + 2,
        message: "Voltage below minimum threshold",
        level: "critical",
        value: `${data.Sensor_VoltageLoad} V`,
        time: data.time,
      });
    } else if (data.Sensor_VoltageLoad > VOLTAGE_MAX) {
      newAlarms.push({
        id: Date.now() + 3,
        message: "Voltage exceeds maximum threshold",
        level: "critical",
        value: `${data.Sensor_VoltageLoad} V`,
        time: data.time,
      });
    } else if (data.Sensor_VoltageLoad < VOLTAGE_WARNING_LOW) {
      newAlarms.push({
        id: Date.now() + 4,
        message: "Voltage approaching low threshold",
        level: "warning",
        value: `${data.Sensor_VoltageLoad} V`,
        time: data.time,
      });
    } else if (data.Sensor_VoltageLoad > VOLTAGE_WARNING_HIGH) {
      newAlarms.push({
        id: Date.now() + 5,
        message: "Voltage approaching high threshold",
        level: "warning",
        value: `${data.Sensor_VoltageLoad} V`,
        time: data.time,
      });
    }

    // Current alarms
    if (data.Sensor_CurrentPhase > CURRENT_CRITICAL) {
      newAlarms.push({
        id: Date.now() + 6,
        message: "Current exceeds critical threshold",
        level: "critical",
        value: `${data.Sensor_CurrentPhase} A`,
        time: data.time,
      });
    } else if (data.Sensor_CurrentPhase > CURRENT_WARNING) {
      newAlarms.push({
        id: Date.now() + 7,
        message: "Current approaching high threshold",
        level: "warning",
        value: `${data.Sensor_CurrentPhase} A`,
        time: data.time,
      });
    }

    if (newAlarms.length > 0) {
      setAlarms((prev) => [...newAlarms, ...prev].slice(0, 5)); // Keep last 5 alarms
    }
  };

  // Determine status indicators
  const getVoltageStatus = (voltage) => {
    if (voltage < VOLTAGE_MIN || voltage > VOLTAGE_MAX) {
      return { color: "status-critical", message: "Critical" };
    }
    if (voltage < VOLTAGE_WARNING_LOW || voltage > VOLTAGE_WARNING_HIGH) {
      return { color: "status-warning", message: "Warning" };
    }
    return { color: "status-normal", message: "Normal" };
  };

  const getCurrentStatus = (current) => {
    if (current > CURRENT_CRITICAL)
      return { color: "status-critical", message: "Critical" };
    if (current > CURRENT_WARNING)
      return { color: "status-warning", message: "High" };
    return { color: "status-normal", message: "Normal" };
  };

  const getBreakerStatus = (status) => {
    if (status === 1) return { color: "status-critical", message: "Tripped" };
    return { color: "status-normal", message: "Normal" };
  };

  const voltageStatus = getVoltageStatus(currentData.Sensor_VoltageLoad);
  const currentStatus = getCurrentStatus(currentData.Sensor_CurrentPhase);
  const breakerStatus = getBreakerStatus(currentData.Sensor_BreakerStatus);
  const calculatedPower = calculatePower(
    currentData.Sensor_VoltageLoad,
    currentData.Sensor_CurrentPhase
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">
            Building Automation System - Electrical Dashboard
          </h1>
          <div className="header-time">
            {currentTime} | Current View: {currentData.time}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="dashboard-main">
        {/* Left Column - Charts */}
        <div className="charts-column">
          {/* Voltage Chart */}
          <div className="chart-panel">
            <h2 className="chart-title">Voltage Load (V)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={electricalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[210, 245]} />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine
                    y={VOLTAGE_MIN}
                    stroke="#EF4444"
                    strokeDasharray="3 3"
                    label="Min (220V)"
                  />
                  <ReferenceLine
                    y={VOLTAGE_MAX}
                    stroke="#EF4444"
                    strokeDasharray="3 3"
                    label="Max (240V)"
                  />
                  <ReferenceLine
                    y={VOLTAGE_WARNING_LOW}
                    stroke="#F59E0B"
                    strokeDasharray="3 3"
                    label="Low Warning"
                  />
                  <ReferenceLine
                    y={VOLTAGE_WARNING_HIGH}
                    stroke="#F59E0B"
                    strokeDasharray="3 3"
                    label="High Warning"
                  />
                  <Line
                    type="monotone"
                    dataKey="Sensor_VoltageLoad"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                    name="Voltage"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Current Chart */}
          <div className="chart-panel">
            <h2 className="chart-title">Current Phase (A)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={electricalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[5, 25]} />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine
                    y={CURRENT_WARNING}
                    stroke="#F59E0B"
                    strokeDasharray="3 3"
                    label="Warning (18A)"
                  />
                  <ReferenceLine
                    y={CURRENT_CRITICAL}
                    stroke="#EF4444"
                    strokeDasharray="3 3"
                    label="Critical (22A)"
                  />
                  <Line
                    type="monotone"
                    dataKey="Sensor_CurrentPhase"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                    name="Current"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Power Chart */}
          <div className="chart-panel">
            <h2 className="chart-title">Power Consumption (kW)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={enhancedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine
                    y={4}
                    stroke="#F59E0B"
                    strokeDasharray="3 3"
                    label="High Usage"
                  />
                  <Line
                    type="monotone"
                    dataKey="Power"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                    name="Power (kW)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Current Status & Alarms */}
        <div className="status-column">
          {/* Current Metrics Panel */}
          <div className="metrics-panel">
            <h2 className="panel-title">Current Metrics</h2>

            <div className="metrics-list">
              <div className="metric-row">
                <div className="metric-label">Time:</div>
                <div className="metric-value">{currentData.time}</div>
              </div>

              <div className="metric-row">
                <div className="metric-label">
                  <Zap size={16} className="icon-small" />
                  Voltage Load:
                </div>
                <div
                  className={`metric-value-with-status ${voltageStatus.color}`}
                >
                  {currentData.Sensor_VoltageLoad} V
                  <span className="status-badge">{voltageStatus.message}</span>
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-label">
                  <Activity size={16} className="icon-small" />
                  Current Phase:
                </div>
                <div
                  className={`metric-value-with-status ${currentStatus.color}`}
                >
                  {currentData.Sensor_CurrentPhase} A
                  <span className="status-badge">{currentStatus.message}</span>
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-label">Circuit Breaker:</div>
                <div className="breaker-status">
                  {currentData.Sensor_BreakerStatus === 0 ? (
                    <div className="breaker-normal">
                      <Check size={20} />
                      <span>Normal</span>
                    </div>
                  ) : (
                    <div className="breaker-tripped">
                      <AlertTriangle size={20} />
                      <span>TRIPPED</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-label">Power Consumption:</div>
                <div className="metric-value">{calculatedPower} kW</div>
              </div>
            </div>
          </div>

          {/* Circuit Breaker Status Panel */}
          <div className="breaker-panel">
            <h2 className="panel-title">Circuit Breaker Status</h2>
            <div className="breaker-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={electricalData}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 1]} ticks={[0, 1]} />
                  <Tooltip
                    formatter={(value) => (value === 1 ? "Tripped" : "Normal")}
                  />
                  <Line
                    type="step"
                    dataKey="Sensor_BreakerStatus"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    name="Breaker Status"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="breaker-legend">
              <div>Normal (0)</div>
              <div className="text-red">Tripped (1)</div>
            </div>
          </div>

          {/* Alarm Panel */}
          <div className="alarm-panel">
            <div className="alarm-header-with-icon">
              <Bell size={20} className="bell-icon" />
              <h2 className="panel-title">Active Alarms</h2>
            </div>

            {alarms.length === 0 ? (
              <div className="no-alarms">No active alarms</div>
            ) : (
              <div className="alarm-list">
                {alarms.map((alarm) => (
                  <div
                    key={alarm.id}
                    className={`alarm-item ${
                      alarm.level === "critical"
                        ? "alarm-critical"
                        : "alarm-warning"
                    }`}
                  >
                    <AlertTriangle size={18} className="alert-icon" />
                    <div className="alarm-content">
                      <div className="alarm-message">{alarm.message}</div>
                      <div className="alarm-details">
                        {alarm.time} | {alarm.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        Building Automation System - Electrical Module | © 2025 Locker Studio
      </footer>
    </div>
  );
}
