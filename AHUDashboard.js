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
import {
  AlertCircle,
  ThermometerSnowflake,
  Fan,
  Droplet,
  Activity,
  Filter,
} from "lucide-react";
import "./AHUDashboard.css";

// AHU sensor data
const ahuData = [
  {
    time: "12:00 AM",
    airflow: 1208,
    filterPressure: 1.27,
    supplyTemp: 56.1,
    returnTemp: 73.4,
    humidity: 48,
    vibration: 2.69,
  },
  {
    time: "01:00 AM",
    airflow: 1117,
    filterPressure: 1.06,
    supplyTemp: 56.9,
    returnTemp: 72.5,
    humidity: 46,
    vibration: 2.29,
  },
  {
    time: "02:00 AM",
    airflow: 1105,
    filterPressure: 1.48,
    supplyTemp: 57.9,
    returnTemp: 71.8,
    humidity: 47,
    vibration: 2.89,
  },
  {
    time: "03:00 AM",
    airflow: 1248,
    filterPressure: 1.08,
    supplyTemp: 57.6,
    returnTemp: 72.9,
    humidity: 46,
    vibration: 2.78,
  },
  {
    time: "04:00 AM",
    airflow: 1276,
    filterPressure: 1.12,
    supplyTemp: 54.2,
    returnTemp: 73.0,
    humidity: 45,
    vibration: 2.39,
  },
  {
    time: "05:00 AM",
    airflow: 1190,
    filterPressure: 1.18,
    supplyTemp: 55.4,
    returnTemp: 73.4,
    humidity: 50,
    vibration: 2.18,
  },
  {
    time: "06:00 AM",
    airflow: 1184,
    filterPressure: 1.25,
    supplyTemp: 57.0,
    returnTemp: 70.3,
    humidity: 50,
    vibration: 2.64,
  },
  {
    time: "07:00 AM",
    airflow: 1266,
    filterPressure: 1.42,
    supplyTemp: 54.5,
    returnTemp: 71.3,
    humidity: 44,
    vibration: 2.49,
  },
  {
    time: "08:00 AM",
    airflow: 1243,
    filterPressure: 1.25,
    supplyTemp: 55.2,
    returnTemp: 73.3,
    humidity: 46,
    vibration: 2.74,
  },
  {
    time: "09:00 AM",
    airflow: 1174,
    filterPressure: 1.4,
    supplyTemp: 57.6,
    returnTemp: 71.3,
    humidity: 50,
    vibration: 2.85,
  },
  {
    time: "10:00 AM",
    airflow: 1187,
    filterPressure: 1.61,
    supplyTemp: 57.0,
    returnTemp: 70.1,
    humidity: 51,
    vibration: 2.74,
  },
  {
    time: "11:00 AM",
    airflow: 1223,
    filterPressure: 1.0,
    supplyTemp: 54.7,
    returnTemp: 70.7,
    humidity: 49,
    vibration: 2.32,
  },
  {
    time: "12:00 PM",
    airflow: 1211,
    filterPressure: 1.26,
    supplyTemp: 57.2,
    returnTemp: 73.2,
    humidity: 44,
    vibration: 2.83,
  },
  {
    time: "01:00 PM",
    airflow: 1103,
    filterPressure: 1.15,
    supplyTemp: 55.4,
    returnTemp: 71.1,
    humidity: 48,
    vibration: 2.73,
  },
  {
    time: "02:00 PM",
    airflow: 1325,
    filterPressure: 1.78,
    supplyTemp: 56.7,
    returnTemp: 72.2,
    humidity: 48,
    vibration: 2.66,
  },
  {
    time: "03:00 PM",
    airflow: 1114,
    filterPressure: 1.08,
    supplyTemp: 56.5,
    returnTemp: 74.0,
    humidity: 47,
    vibration: 2.16,
  },
  {
    time: "04:00 PM",
    airflow: 1216,
    filterPressure: 1.02,
    supplyTemp: 55.4,
    returnTemp: 70.2,
    humidity: 46,
    vibration: 2.8,
  },
  {
    time: "05:00 PM",
    airflow: 1213,
    filterPressure: 1.4,
    supplyTemp: 54.1,
    returnTemp: 71.5,
    humidity: 47,
    vibration: 2.87,
  },
  {
    time: "06:00 PM",
    airflow: 1160,
    filterPressure: 1.26,
    supplyTemp: 57.6,
    returnTemp: 71.8,
    humidity: 48,
    vibration: 3.2,
  },
  {
    time: "07:00 PM",
    airflow: 1206,
    filterPressure: 1.43,
    supplyTemp: 56.1,
    returnTemp: 71.3,
    humidity: 46,
    vibration: 2.79,
  },
  {
    time: "08:00 PM",
    airflow: 1282,
    filterPressure: 1.46,
    supplyTemp: 57.7,
    returnTemp: 73.0,
    humidity: 49,
    vibration: 2.42,
  },
  {
    time: "09:00 PM",
    airflow: 1105,
    filterPressure: 1.36,
    supplyTemp: 57.2,
    returnTemp: 73.2,
    humidity: 49,
    vibration: 2.25,
  },
  {
    time: "10:00 PM",
    airflow: 1274,
    filterPressure: 1.02,
    supplyTemp: 56.2,
    returnTemp: 72.1,
    humidity: 50,
    vibration: 2.35,
  },
  {
    time: "11:00 PM",
    airflow: 1202,
    filterPressure: 1.11,
    supplyTemp: 54.4,
    returnTemp: 73.3,
    humidity: 44,
    vibration: 2.68,
  },
];

// Thresholds for alarms
const thresholds = {
  airflow: { min: 1100, max: 1300 },
  filterPressure: { min: 1.0, max: 1.7 },
  supplyTemp: { min: 54, max: 58 },
  returnTemp: { min: 70, max: 74 },
  humidity: { min: 45, max: 50 },
  vibration: { min: 2.0, max: 3.0 },
};

// Function to check if value exceeds threshold
const checkAlarm = (value, parameter) => {
  return value < thresholds[parameter].min || value > thresholds[parameter].max;
};

// Stats card component
const StatCard = ({ title, value, unit, icon, alarm }) => {
  const Icon = icon;
  return (
    <div className={`stat-card ${alarm ? "alarm" : ""}`}>
      <div className="stat-content">
        <div>
          <p className="stat-title">{title}</p>
          <p className="stat-value">
            {value} <span className="stat-unit">{unit}</span>
          </p>
        </div>
        <div className={`stat-icon-container ${alarm ? "alarm" : ""}`}>
          <Icon size={24} className={`stat-icon ${alarm ? "alarm" : ""}`} />
        </div>
      </div>
    </div>
  );
};

// Main dashboard component
const AHUDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    // Simulate real-time updates
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ahuData.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Get current data point
  const currentData = ahuData[currentIndex];

  // Check for alarms
  useEffect(() => {
    const newAlarms = [];
    if (checkAlarm(currentData.airflow, "airflow"))
      newAlarms.push({
        parameter: "Airflow",
        value: currentData.airflow,
        unit: "CFM",
      });
    if (checkAlarm(currentData.filterPressure, "filterPressure"))
      newAlarms.push({
        parameter: "Filter Pressure",
        value: currentData.filterPressure,
        unit: "in.wg",
      });
    if (checkAlarm(currentData.supplyTemp, "supplyTemp"))
      newAlarms.push({
        parameter: "Supply Temp",
        value: currentData.supplyTemp,
        unit: "°F",
      });
    if (checkAlarm(currentData.returnTemp, "returnTemp"))
      newAlarms.push({
        parameter: "Return Temp",
        value: currentData.returnTemp,
        unit: "°F",
      });
    if (checkAlarm(currentData.humidity, "humidity"))
      newAlarms.push({
        parameter: "Humidity",
        value: currentData.humidity,
        unit: "%RH",
      });
    if (checkAlarm(currentData.vibration, "vibration"))
      newAlarms.push({
        parameter: "Vibration",
        value: currentData.vibration,
        unit: "mm/s RMS",
      });

    setAlarms(newAlarms);
  }, [currentIndex, currentData]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">AHU-01 Building Automation System</h1>
        <p className="dashboard-time">
          Last updated: {currentTime.toLocaleTimeString()}
        </p>
      </div>

      {/* Status Cards */}
      <div className="stat-grid">
        <StatCard
          title="Airflow"
          value={currentData.airflow}
          unit="CFM"
          icon={Fan}
          alarm={checkAlarm(currentData.airflow, "airflow")}
        />
        <StatCard
          title="Filter Pressure"
          value={currentData.filterPressure.toFixed(2)}
          unit="in.wg"
          icon={Filter}
          alarm={checkAlarm(currentData.filterPressure, "filterPressure")}
        />
        <StatCard
          title="Supply Temp"
          value={currentData.supplyTemp.toFixed(1)}
          unit="°F"
          icon={ThermometerSnowflake}
          alarm={checkAlarm(currentData.supplyTemp, "supplyTemp")}
        />
        <StatCard
          title="Return Temp"
          value={currentData.returnTemp.toFixed(1)}
          unit="°F"
          icon={ThermometerSnowflake}
          alarm={checkAlarm(currentData.returnTemp, "returnTemp")}
        />
        <StatCard
          title="Humidity"
          value={currentData.humidity}
          unit="%RH"
          icon={Droplet}
          alarm={checkAlarm(currentData.humidity, "humidity")}
        />
        <StatCard
          title="Vibration"
          value={currentData.vibration.toFixed(2)}
          unit="mm/s RMS"
          icon={Activity}
          alarm={checkAlarm(currentData.vibration, "vibration")}
        />
      </div>

      {/* Alarm Panel */}
      {alarms.length > 0 && (
        <div className="alarm-panel">
          <div className="alarm-header">
            <AlertCircle className="alarm-icon" />
            <h2 className="alarm-title">Active Alarms</h2>
          </div>
          <div className="alarm-list">
            {alarms.map((alarm, index) => (
              <div key={index} className="alarm-item">
                <span className="alarm-parameter">{alarm.parameter}</span>
                <span className="alarm-value">
                  {alarm.value} {alarm.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="chart-grid">
        <div className="chart-container">
          <h3 className="chart-title">Airflow Trend</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={ahuData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[1000, 1400]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="airflow"
                  stroke="#3b82f6"
                  name="Airflow (CFM)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Temperature Trend</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={ahuData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[50, 80]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="supplyTemp"
                  stroke="#0ea5e9"
                  name="Supply Temp (°F)"
                />
                <Line
                  type="monotone"
                  dataKey="returnTemp"
                  stroke="#ef4444"
                  name="Return Temp (°F)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Filter Pressure Trend</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={ahuData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0.5, 2]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="filterPressure"
                  stroke="#8b5cf6"
                  name="Filter Pressure (in.wg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Humidity & Vibration Trend</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={ahuData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" domain={[40, 55]} />
                <YAxis yAxisId="right" orientation="right" domain={[2, 3.5]} />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#10b981"
                  name="Humidity (%RH)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="vibration"
                  stroke="#f59e0b"
                  name="Vibration (mm/s RMS)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Equipment Information */}
      <div className="equipment-panel">
        <h3 className="equipment-title">Equipment Information</h3>
        <div className="equipment-grid">
          <div className="equipment-item">
            <h4 className="equipment-name">AHU-01</h4>
            <p className="equipment-type">Air Handling Unit</p>
            <p className="equipment-status">
              Status: <span className="status-running">Running</span>
            </p>
          </div>
          <div className="equipment-item">
            <h4 className="equipment-name">SF-01</h4>
            <p className="equipment-type">Supply Fan</p>
            <p className="equipment-status">
              Status: <span className="status-running">Running</span>
            </p>
          </div>
          <div className="equipment-item">
            <h4 className="equipment-name">RF-01</h4>
            <p className="equipment-type">Return Fan</p>
            <p className="equipment-status">
              Status: <span className="status-running">Running</span>
            </p>
          </div>
          <div className="equipment-item">
            <h4 className="equipment-name">CC-01</h4>
            <p className="equipment-type">Cooling Coil</p>
            <p className="equipment-status">
              Valve Position: <span className="equipment-value">65%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AHUDashboard;
