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
import { AlertTriangle, ThermometerSun } from "lucide-react";
import "./TemperatureDashboard.css";

// Temperature sensor data from the provided values
const initialData = [
  { time: "12:00 AM", Sensor_Temperature: 68.7 },
  { time: "01:00 AM", Sensor_Temperature: 74.2 },
  { time: "02:00 AM", Sensor_Temperature: 70.5 },
  { time: "03:00 AM", Sensor_Temperature: 72.4 },
  { time: "04:00 AM", Sensor_Temperature: 71.2 },
  { time: "05:00 AM", Sensor_Temperature: 70.9 },
  { time: "06:00 AM", Sensor_Temperature: 69.1 },
  { time: "07:00 AM", Sensor_Temperature: 69.8 },
  { time: "08:00 AM", Sensor_Temperature: 74.3 },
  { time: "09:00 AM", Sensor_Temperature: 69.5 },
  { time: "10:00 AM", Sensor_Temperature: 69.4 },
  { time: "11:00 AM", Sensor_Temperature: 71.9 },
  { time: "12:00 PM", Sensor_Temperature: 68.5 },
  { time: "01:00 PM", Sensor_Temperature: 77.1 },
  { time: "02:00 PM", Sensor_Temperature: 77.7 },
  { time: "03:00 PM", Sensor_Temperature: 71.4 },
  { time: "04:00 PM", Sensor_Temperature: 72.1 },
  { time: "05:00 PM", Sensor_Temperature: 69.3 },
  { time: "06:00 PM", Sensor_Temperature: 68.5 },
  { time: "07:00 PM", Sensor_Temperature: 68.5 },
  { time: "08:00 PM", Sensor_Temperature: 69.5 },
  { time: "09:00 PM", Sensor_Temperature: 69.0 },
  { time: "10:00 PM", Sensor_Temperature: 73.6 },
  { time: "11:00 PM", Sensor_Temperature: 69.7 },
];

// Define normal operating parameters
const MIN_NORMAL_TEMP = 68.0;
const MAX_NORMAL_TEMP = 75.0;

export default function TemperatureDashboard() {
  const [data, setData] = useState(initialData);
  const [currentTemp, setCurrentTemp] = useState(
    initialData[initialData.length - 1].Sensor_Temperature
  );
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmHistory, setAlarmHistory] = useState([]);
  const [equipmentList, setEquipmentList] = useState([
    {
      id: 1,
      name: "AHU-01",
      type: "Air Handling Unit",
      location: "Floor 1",
      sensor: "Sensor_Temperature",
    },
    {
      id: 2,
      name: "FCU-03",
      type: "Fan Coil Unit",
      location: "Floor 2",
      sensor: "Sensor_Temperature",
    },
    {
      id: 3,
      name: "CHW-01",
      type: "Chilled Water Pump",
      location: "Basement",
      sensor: "Sensor_Temperature",
    },
    {
      id: 4,
      name: "VAV-12",
      type: "Variable Air Volume Box",
      location: "Floor 3",
      sensor: "Sensor_Temperature",
    },
    {
      id: 5,
      name: "RTU-02",
      type: "Rooftop Unit",
      location: "Roof",
      sensor: "Sensor_Temperature",
    },
  ]);
  const [selectedEquipment, setSelectedEquipment] = useState(1);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a new temperature value with minor fluctuations
      const newTemp = parseFloat(
        (currentTemp + (Math.random() * 2 - 1)).toFixed(1)
      );

      // Check if temperature is outside parameters
      if (newTemp > MAX_NORMAL_TEMP || newTemp < MIN_NORMAL_TEMP) {
        setAlarmActive(true);
        setAlarmHistory((prev) =>
          [
            ...prev,
            {
              time: new Date().toLocaleTimeString(),
              value: newTemp,
              message: `Temperature out of range: ${newTemp}°F`,
            },
          ].slice(-5)
        ); // Keep only the 5 most recent alarms
      } else {
        setAlarmActive(false);
      }

      setCurrentTemp(newTemp);

      // Get current time
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      // Add new data point
      setData((prevData) => [
        ...prevData.slice(1),
        { time: timeStr, Sensor_Temperature: newTemp },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentTemp]);

  // Function to get temperature status class
  const getTempStatusClass = (temp) => {
    if (temp < MIN_NORMAL_TEMP) return "status-cold";
    if (temp > MAX_NORMAL_TEMP) return "status-hot";
    return "status-normal";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Building Automation System</h1>
        <div className="header-info">
          <ThermometerSun size={24} />
          <span className="header-text">Temperature Monitoring</span>
        </div>
      </div>

      <div className="panel-grid">
        <div className="panel">
          <h2 className="panel-title">Current Temperature</h2>
          <div className="temp-display">
            <ThermometerSun
              size={32}
              className={getTempStatusClass(currentTemp)}
            />
            <span className={`temp-value ${getTempStatusClass(currentTemp)}`}>
              {currentTemp}°F
            </span>
          </div>
          <div className="temp-range">
            Normal Range: {MIN_NORMAL_TEMP}°F - {MAX_NORMAL_TEMP}°F
          </div>
        </div>

        <div className="panel">
          <h2 className="panel-title">Equipment Status</h2>
          <select
            className="equipment-select"
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(parseInt(e.target.value))}
          >
            {equipmentList.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name} ({eq.type})
              </option>
            ))}
          </select>
          <div className="equipment-info">
            <div>
              <span className="info-label">Location:</span>{" "}
              {equipmentList.find((e) => e.id === selectedEquipment)?.location}
            </div>
            <div>
              <span className="info-label">Sensor:</span>{" "}
              {equipmentList.find((e) => e.id === selectedEquipment)?.sensor}
            </div>
            <div>
              <span className="info-label">Status:</span>
              <span className={alarmActive ? "status-alarm" : "status-normal"}>
                {alarmActive ? "Alarm Active" : "Normal Operation"}
              </span>
            </div>
          </div>
        </div>

        <div className={`panel ${alarmActive ? "alarm-panel" : ""}`}>
          <h2 className="panel-title alarm-title">
            Alarm Status
            {alarmActive && <AlertTriangle size={20} className="alarm-icon" />}
          </h2>
          {alarmActive ? (
            <div className="alarm-box">
              <p className="alarm-message">ALARM: Temperature out of range!</p>
              <p className="alarm-details">Current value: {currentTemp}°F</p>
            </div>
          ) : (
            <div className="normal-box">
              <p className="normal-message">All systems normal</p>
            </div>
          )}
          <div className="alarm-history">
            <h3 className="history-title">Recent Alarms:</h3>
            <ul className="history-list">
              {alarmHistory.map((alarm, idx) => (
                <li key={idx} className="history-item">
                  {alarm.time} - {alarm.message}
                </li>
              ))}
              {alarmHistory.length === 0 && (
                <li className="no-alarms">No recent alarms</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="chart-panel">
        <h2 className="panel-title">Temperature Trends</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis domain={[65, 80]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Sensor_Temperature"
                stroke="#0284c7"
                activeDot={{ r: 8 }}
                name="Temperature (°F)"
              />
              {/* Display reference lines for normal range */}
              <Line
                type="monotone"
                dataKey={() => MIN_NORMAL_TEMP}
                stroke="#9ca3af"
                strokeDasharray="3 3"
                dot={false}
                name="Min Normal"
              />
              <Line
                type="monotone"
                dataKey={() => MAX_NORMAL_TEMP}
                stroke="#9ca3af"
                strokeDasharray="3 3"
                dot={false}
                name="Max Normal"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
