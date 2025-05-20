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
import { Bell, AlertTriangle, Check, X } from "lucide-react";
import "./LightingDashboard.css";

const lightingData = [
  {
    time: "12:00 AM",
    Sensor_LightLevel: 34,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15.1,
  },
  {
    time: "01:00 AM",
    Sensor_LightLevel: 46,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15.2,
  },
  {
    time: "02:00 AM",
    Sensor_LightLevel: 46,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15.1,
  },
  {
    time: "03:00 AM",
    Sensor_LightLevel: 16,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 14.9,
  },
  {
    time: "04:00 AM",
    Sensor_LightLevel: 0,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15,
  },
  {
    time: "05:00 AM",
    Sensor_LightLevel: 23,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15.7,
  },
  {
    time: "06:00 AM",
    Sensor_LightLevel: 432,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15.7,
  },
  {
    time: "07:00 AM",
    Sensor_LightLevel: 413,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15.9,
  },
  {
    time: "08:00 AM",
    Sensor_LightLevel: 584,
    Sensor_Occupancy: 1,
    Sensor_EnergyConsumption: 19.5,
  },
  {
    time: "09:00 AM",
    Sensor_LightLevel: 467,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 14.7,
  },
  {
    time: "10:00 AM",
    Sensor_LightLevel: 555,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15.8,
  },
  {
    time: "11:00 AM",
    Sensor_LightLevel: 548,
    Sensor_Occupancy: 1,
    Sensor_EnergyConsumption: 19.5,
  },
  {
    time: "12:00 PM",
    Sensor_LightLevel: 306,
    Sensor_Occupancy: 1,
    Sensor_EnergyConsumption: 20.5,
  },
  {
    time: "01:00 PM",
    Sensor_LightLevel: 406,
    Sensor_Occupancy: 1,
    Sensor_EnergyConsumption: 20,
  },
  {
    time: "02:00 PM",
    Sensor_LightLevel: 390,
    Sensor_Occupancy: 1,
    Sensor_EnergyConsumption: 20.5,
  },
  {
    time: "03:00 PM",
    Sensor_LightLevel: 341,
    Sensor_Occupancy: 1,
    Sensor_EnergyConsumption: 20.5,
  },
  {
    time: "04:00 PM",
    Sensor_LightLevel: 543,
    Sensor_Occupancy: 1,
    Sensor_EnergyConsumption: 20.7,
  },
  {
    time: "05:00 PM",
    Sensor_LightLevel: 533,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15.5,
  },
  {
    time: "06:00 PM",
    Sensor_LightLevel: 490,
    Sensor_Occupancy: 1,
    Sensor_EnergyConsumption: 19.6,
  },
  {
    time: "07:00 PM",
    Sensor_LightLevel: 46,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 14.1,
  },
  {
    time: "08:00 PM",
    Sensor_LightLevel: 47,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15,
  },
  {
    time: "09:00 PM",
    Sensor_LightLevel: 41,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15.9,
  },
  {
    time: "10:00 PM",
    Sensor_LightLevel: 30,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 15,
  },
  {
    time: "11:00 PM",
    Sensor_LightLevel: 31,
    Sensor_Occupancy: 0,
    Sensor_EnergyConsumption: 14.1,
  },
];

// Alarm thresholds
const LIGHT_LEVEL_MIN = 200;
const LIGHT_LEVEL_MAX = 700;
const ENERGY_CONSUMPTION_HIGH = 20;
const ENERGY_CONSUMPTION_CRITICAL = 25;

export default function LightingDashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [alarms, setAlarms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(16); // Start at 4:00 PM
  const [currentData, setCurrentData] = useState(lightingData[16]);

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());

      // Cycle through data to simulate real-time updates
      setCurrentIndex((prevIndex) => (prevIndex + 1) % lightingData.length);
      setCurrentData(lightingData[currentIndex]);

      // Check for alarms
      checkAlarms(lightingData[currentIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Function to check alarms based on current data
  const checkAlarms = (data) => {
    const newAlarms = [];

    // Light level alarms
    if (data.Sensor_LightLevel > LIGHT_LEVEL_MAX) {
      newAlarms.push({
        id: Date.now() + 1,
        message: "Light level exceeds maximum threshold",
        level: "critical",
        value: `${data.Sensor_LightLevel} lux`,
        time: data.time,
      });
    } else if (
      isBusinessHours(data.time) &&
      data.Sensor_LightLevel < LIGHT_LEVEL_MIN &&
      data.Sensor_Occupancy === 1
    ) {
      newAlarms.push({
        id: Date.now() + 2,
        message: "Light level below minimum during occupied hours",
        level: "warning",
        value: `${data.Sensor_LightLevel} lux`,
        time: data.time,
      });
    }

    // Energy consumption alarms
    if (data.Sensor_EnergyConsumption > ENERGY_CONSUMPTION_CRITICAL) {
      newAlarms.push({
        id: Date.now() + 3,
        message: "Critical energy consumption level",
        level: "critical",
        value: `${data.Sensor_EnergyConsumption} W`,
        time: data.time,
      });
    } else if (
      data.Sensor_EnergyConsumption > ENERGY_CONSUMPTION_HIGH &&
      data.Sensor_Occupancy === 0
    ) {
      newAlarms.push({
        id: Date.now() + 4,
        message: "High energy consumption while unoccupied",
        level: "warning",
        value: `${data.Sensor_EnergyConsumption} W`,
        time: data.time,
      });
    }

    if (newAlarms.length > 0) {
      setAlarms((prev) => [...newAlarms, ...prev].slice(0, 5)); // Keep last 5 alarms
    }
  };

  // Helper function to check if time is during business hours (8 AM - 6 PM)
  const isBusinessHours = (timeStr) => {
    const hour = parseInt(timeStr.split(":")[0]);
    const isPM = timeStr.includes("PM");
    const hourIn24 =
      isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour;
    return hourIn24 >= 8 && hourIn24 <= 18;
  };

  // Determine status indicators
  const getLightLevelStatus = (level) => {
    if (level > LIGHT_LEVEL_MAX)
      return { color: "status-critical", message: "Too Bright" };
    if (
      level < LIGHT_LEVEL_MIN &&
      currentData.Sensor_Occupancy === 1 &&
      isBusinessHours(currentData.time)
    ) {
      return { color: "status-warning", message: "Too Dim" };
    }
    return { color: "status-success", message: "Optimal" };
  };

  const getEnergyStatus = (energy) => {
    if (energy > ENERGY_CONSUMPTION_CRITICAL)
      return { color: "status-critical", message: "Critical" };
    if (energy > ENERGY_CONSUMPTION_HIGH) {
      if (currentData.Sensor_Occupancy === 0) {
        return { color: "status-warning", message: "Wasteful" };
      } else {
        return { color: "status-warning", message: "High" };
      }
    }
    return { color: "status-success", message: "Efficient" };
  };

  const lightLevelStatus = getLightLevelStatus(currentData.Sensor_LightLevel);
  const energyStatus = getEnergyStatus(currentData.Sensor_EnergyConsumption);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">
            Building Automation System - Lighting Dashboard
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
          {/* Light Level Chart */}
          <div className="chart-panel">
            <h2 className="chart-title">Light Level (lux)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lightingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine
                    y={LIGHT_LEVEL_MIN}
                    stroke="#F59E0B"
                    strokeDasharray="3 3"
                    label="Min (200 lux)"
                  />
                  <ReferenceLine
                    y={LIGHT_LEVEL_MAX}
                    stroke="#EF4444"
                    strokeDasharray="3 3"
                    label="Max (700 lux)"
                  />
                  <Line
                    type="monotone"
                    dataKey="Sensor_LightLevel"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                    name="Light Level"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Energy Consumption Chart */}
          <div className="chart-panel">
            <h2 className="chart-title">Energy Consumption (W)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lightingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[10, 25]} />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine
                    y={ENERGY_CONSUMPTION_HIGH}
                    stroke="#F59E0B"
                    strokeDasharray="3 3"
                    label="High (20W)"
                  />
                  <ReferenceLine
                    y={ENERGY_CONSUMPTION_CRITICAL}
                    stroke="#EF4444"
                    strokeDasharray="3 3"
                    label="Critical (25W)"
                  />
                  <Line
                    type="monotone"
                    dataKey="Sensor_EnergyConsumption"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                    name="Energy"
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
                <div className="metric-label">Light Level:</div>
                <div
                  className={`metric-value-with-status ${lightLevelStatus.color}`}
                >
                  {currentData.Sensor_LightLevel} lux
                  <span className="status-badge">
                    {lightLevelStatus.message}
                  </span>
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-label">Occupancy:</div>
                <div className="occupancy-status">
                  {currentData.Sensor_Occupancy === 1 ? (
                    <div className="occupied-status">
                      <Check size={20} />
                      <span>Occupied</span>
                    </div>
                  ) : (
                    <div className="unoccupied-status">
                      <X size={20} />
                      <span>Unoccupied</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-label">Energy Use:</div>
                <div
                  className={`metric-value-with-status ${energyStatus.color}`}
                >
                  {currentData.Sensor_EnergyConsumption} W
                  <span className="status-badge">{energyStatus.message}</span>
                </div>
              </div>
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

          {/* Occupancy Timeline */}
          <div className="occupancy-panel">
            <h2 className="panel-title">Occupancy Timeline</h2>
            <div className="occupancy-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lightingData}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 1]} ticks={[0, 1]} />
                  <Line
                    type="stepAfter"
                    dataKey="Sensor_Occupancy"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={false}
                    name="Occupancy"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        Building Automation System - Lighting Module | © 2025 Locker Studio
      </footer>
    </div>
  );
}
