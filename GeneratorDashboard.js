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
import "./GeneratorDashboard.css";

// You'll need to install lucide-react or replace these with your own icons
// npm install lucide-react
import {
  Bell,
  AlertTriangle,
  Check,
  Battery,
  Gauge,
  Clock,
  Droplet,
} from "lucide-react";

const generatorData = [
  {
    time: "12:00 AM",
    Sensor_FuelLevel: 99.5,
    Sensor_BatteryVoltage: 12.98,
    Sensor_OilPressure: 39.5,
    Sensor_RunHours: 0,
  },
  {
    time: "01:00 AM",
    Sensor_FuelLevel: 99.1,
    Sensor_BatteryVoltage: 12.44,
    Sensor_OilPressure: 35.7,
    Sensor_RunHours: 0.8,
  },
  {
    time: "02:00 AM",
    Sensor_FuelLevel: 97.1,
    Sensor_BatteryVoltage: 12.43,
    Sensor_OilPressure: 33.5,
    Sensor_RunHours: 1.6,
  },
  {
    time: "03:00 AM",
    Sensor_FuelLevel: 95.3,
    Sensor_BatteryVoltage: 12.83,
    Sensor_OilPressure: 34.7,
    Sensor_RunHours: 2.4,
  },
  {
    time: "04:00 AM",
    Sensor_FuelLevel: 94.2,
    Sensor_BatteryVoltage: 12.46,
    Sensor_OilPressure: 36.7,
    Sensor_RunHours: 3.2,
  },
  {
    time: "05:00 AM",
    Sensor_FuelLevel: 93.5,
    Sensor_BatteryVoltage: 12.65,
    Sensor_OilPressure: 39.9,
    Sensor_RunHours: 4,
  },
  {
    time: "06:00 AM",
    Sensor_FuelLevel: 90.1,
    Sensor_BatteryVoltage: 11.5,
    Sensor_OilPressure: 32.6,
    Sensor_RunHours: 4.8,
  },
  {
    time: "07:00 AM",
    Sensor_FuelLevel: 88.6,
    Sensor_BatteryVoltage: 12.51,
    Sensor_OilPressure: 39.6,
    Sensor_RunHours: 5.6,
  },
  {
    time: "08:00 AM",
    Sensor_FuelLevel: 88.8,
    Sensor_BatteryVoltage: 12.95,
    Sensor_OilPressure: 35,
    Sensor_RunHours: 6.4,
  },
  {
    time: "09:00 AM",
    Sensor_FuelLevel: 85.6,
    Sensor_BatteryVoltage: 12.9,
    Sensor_OilPressure: 36.6,
    Sensor_RunHours: 7.2,
  },
  {
    time: "10:00 AM",
    Sensor_FuelLevel: 85.1,
    Sensor_BatteryVoltage: 12.6,
    Sensor_OilPressure: 39.8,
    Sensor_RunHours: 8,
  },
  {
    time: "11:00 AM",
    Sensor_FuelLevel: 83.7,
    Sensor_BatteryVoltage: 12.52,
    Sensor_OilPressure: 33.4,
    Sensor_RunHours: 8.8,
  },
  {
    time: "12:00 PM",
    Sensor_FuelLevel: 82.9,
    Sensor_BatteryVoltage: 12.9,
    Sensor_OilPressure: 38,
    Sensor_RunHours: 9.6,
  },
  {
    time: "01:00 PM",
    Sensor_FuelLevel: 81.4,
    Sensor_BatteryVoltage: 12.53,
    Sensor_OilPressure: 36.5,
    Sensor_RunHours: 10.4,
  },
  {
    time: "02:00 PM",
    Sensor_FuelLevel: 78.6,
    Sensor_BatteryVoltage: 12.41,
    Sensor_OilPressure: 39.1,
    Sensor_RunHours: 11.2,
  },
  {
    time: "03:00 PM",
    Sensor_FuelLevel: 76.6,
    Sensor_BatteryVoltage: 12.58,
    Sensor_OilPressure: 38.2,
    Sensor_RunHours: 12,
  },
  {
    time: "04:00 PM",
    Sensor_FuelLevel: 75.6,
    Sensor_BatteryVoltage: 12.45,
    Sensor_OilPressure: 33.4,
    Sensor_RunHours: 12.8,
  },
  {
    time: "05:00 PM",
    Sensor_FuelLevel: 74.3,
    Sensor_BatteryVoltage: 12.54,
    Sensor_OilPressure: 20,
    Sensor_RunHours: 13.6,
  },
  {
    time: "06:00 PM",
    Sensor_FuelLevel: 73.9,
    Sensor_BatteryVoltage: 12.83,
    Sensor_OilPressure: 36.6,
    Sensor_RunHours: 14.4,
  },
  {
    time: "07:00 PM",
    Sensor_FuelLevel: 71.7,
    Sensor_BatteryVoltage: 12.45,
    Sensor_OilPressure: 33.8,
    Sensor_RunHours: 15.2,
  },
  {
    time: "08:00 PM",
    Sensor_FuelLevel: 69.9,
    Sensor_BatteryVoltage: 12.46,
    Sensor_OilPressure: 32,
    Sensor_RunHours: 16,
  },
  {
    time: "09:00 PM",
    Sensor_FuelLevel: 69.1,
    Sensor_BatteryVoltage: 12.91,
    Sensor_OilPressure: 32.4,
    Sensor_RunHours: 16.8,
  },
  {
    time: "10:00 PM",
    Sensor_FuelLevel: 67.3,
    Sensor_BatteryVoltage: 12.42,
    Sensor_OilPressure: 38.3,
    Sensor_RunHours: 17.6,
  },
  {
    time: "11:00 PM",
    Sensor_FuelLevel: 65.9,
    Sensor_BatteryVoltage: 12.68,
    Sensor_OilPressure: 37,
    Sensor_RunHours: 18.4,
  },
];

// Alarm thresholds
const FUEL_LEVEL_LOW_WARNING = 30;
const FUEL_LEVEL_LOW_CRITICAL = 15;
const BATTERY_VOLTAGE_LOW_WARNING = 12.0;
const BATTERY_VOLTAGE_LOW_CRITICAL = 11.5;
const BATTERY_VOLTAGE_HIGH_WARNING = 14.0;
const BATTERY_VOLTAGE_HIGH_CRITICAL = 15.0;
const OIL_PRESSURE_LOW_WARNING = 25;
const OIL_PRESSURE_LOW_CRITICAL = 20;
const OIL_PRESSURE_HIGH_WARNING = 55;
const OIL_PRESSURE_HIGH_CRITICAL = 60;
const RUN_HOURS_SERVICE_WARNING = 200;
const RUN_HOURS_SERVICE_CRITICAL = 250;

const GeneratorDashboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [alarms, setAlarms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(16); // Start at 4:00 PM
  const [currentData, setCurrentData] = useState(generatorData[16]);
  const [refuelNeededIn, setRefuelNeededIn] = useState(0);
  const [serviceNeededIn, setServiceNeededIn] = useState(0);

  // Calculate time until refueling needed
  useEffect(() => {
    // Calculate fuel consumption rate per hour
    const firstFuelLevel = generatorData[0].Sensor_FuelLevel;
    const lastFuelLevel =
      generatorData[generatorData.length - 1].Sensor_FuelLevel;
    const totalHours = generatorData[generatorData.length - 1].Sensor_RunHours;

    const fuelConsumptionRate = (firstFuelLevel - lastFuelLevel) / totalHours;

    // Calculate time until reaching critical fuel level
    const currentFuelLevel = currentData.Sensor_FuelLevel;
    const fuelUntilCritical = currentFuelLevel - FUEL_LEVEL_LOW_CRITICAL;
    const hoursUntilRefuel = fuelUntilCritical / fuelConsumptionRate;

    setRefuelNeededIn(Math.round(hoursUntilRefuel));

    // Calculate time until next service
    const currentRunHours = currentData.Sensor_RunHours;
    const hoursUntilService = RUN_HOURS_SERVICE_WARNING - currentRunHours;

    setServiceNeededIn(Math.round(hoursUntilService));
  }, [currentData]);

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());

      // Cycle through data to simulate real-time updates
      setCurrentIndex((prevIndex) => (prevIndex + 1) % generatorData.length);
      setCurrentData(generatorData[currentIndex]);

      // Check for alarms
      checkAlarms(generatorData[currentIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Function to check alarms based on current data
  const checkAlarms = (data) => {
    const newAlarms = [];

    // Fuel level alarms
    if (data.Sensor_FuelLevel < FUEL_LEVEL_LOW_CRITICAL) {
      newAlarms.push({
        id: Date.now() + 1,
        message: "Fuel level critically low",
        level: "critical",
        value: `${data.Sensor_FuelLevel}%`,
        time: data.time,
      });
    } else if (data.Sensor_FuelLevel < FUEL_LEVEL_LOW_WARNING) {
      newAlarms.push({
        id: Date.now() + 2,
        message: "Fuel level low",
        level: "warning",
        value: `${data.Sensor_FuelLevel}%`,
        time: data.time,
      });
    }

    // Battery voltage alarms
    if (data.Sensor_BatteryVoltage < BATTERY_VOLTAGE_LOW_CRITICAL) {
      newAlarms.push({
        id: Date.now() + 3,
        message: "Battery voltage critically low",
        level: "critical",
        value: `${data.Sensor_BatteryVoltage}V`,
        time: data.time,
      });
    } else if (data.Sensor_BatteryVoltage < BATTERY_VOLTAGE_LOW_WARNING) {
      newAlarms.push({
        id: Date.now() + 4,
        message: "Battery voltage low",
        level: "warning",
        value: `${data.Sensor_BatteryVoltage}V`,
        time: data.time,
      });
    } else if (data.Sensor_BatteryVoltage > BATTERY_VOLTAGE_HIGH_CRITICAL) {
      newAlarms.push({
        id: Date.now() + 5,
        message: "Battery voltage critically high",
        level: "critical",
        value: `${data.Sensor_BatteryVoltage}V`,
        time: data.time,
      });
    } else if (data.Sensor_BatteryVoltage > BATTERY_VOLTAGE_HIGH_WARNING) {
      newAlarms.push({
        id: Date.now() + 6,
        message: "Battery voltage high",
        level: "warning",
        value: `${data.Sensor_BatteryVoltage}V`,
        time: data.time,
      });
    }

    // Oil pressure alarms
    if (data.Sensor_OilPressure < OIL_PRESSURE_LOW_CRITICAL) {
      newAlarms.push({
        id: Date.now() + 7,
        message: "Oil pressure critically low",
        level: "critical",
        value: `${data.Sensor_OilPressure} psi`,
        time: data.time,
      });
    } else if (data.Sensor_OilPressure < OIL_PRESSURE_LOW_WARNING) {
      newAlarms.push({
        id: Date.now() + 8,
        message: "Oil pressure low",
        level: "warning",
        value: `${data.Sensor_OilPressure} psi`,
        time: data.time,
      });
    } else if (data.Sensor_OilPressure > OIL_PRESSURE_HIGH_CRITICAL) {
      newAlarms.push({
        id: Date.now() + 9,
        message: "Oil pressure critically high",
        level: "critical",
        value: `${data.Sensor_OilPressure} psi`,
        time: data.time,
      });
    } else if (data.Sensor_OilPressure > OIL_PRESSURE_HIGH_WARNING) {
      newAlarms.push({
        id: Date.now() + 10,
        message: "Oil pressure high",
        level: "warning",
        value: `${data.Sensor_OilPressure} psi`,
        time: data.time,
      });
    }

    // Run hours service alarms
    if (data.Sensor_RunHours > RUN_HOURS_SERVICE_CRITICAL) {
      newAlarms.push({
        id: Date.now() + 11,
        message: "Service critically overdue",
        level: "critical",
        value: `${data.Sensor_RunHours} hrs`,
        time: data.time,
      });
    } else if (data.Sensor_RunHours > RUN_HOURS_SERVICE_WARNING) {
      newAlarms.push({
        id: Date.now() + 12,
        message: "Service due soon",
        level: "warning",
        value: `${data.Sensor_RunHours} hrs`,
        time: data.time,
      });
    }

    if (newAlarms.length > 0) {
      setAlarms((prev) => [...newAlarms, ...prev].slice(0, 5)); // Keep last 5 alarms
    }
  };

  // Determine status indicators
  const getFuelLevelStatus = (level) => {
    if (level < FUEL_LEVEL_LOW_CRITICAL)
      return { color: "status-critical", message: "Critical" };
    if (level < FUEL_LEVEL_LOW_WARNING)
      return { color: "status-warning", message: "Warning" };
    return { color: "status-normal", message: "Normal" };
  };

  const getBatteryStatus = (voltage) => {
    if (
      voltage < BATTERY_VOLTAGE_LOW_CRITICAL ||
      voltage > BATTERY_VOLTAGE_HIGH_CRITICAL
    ) {
      return { color: "status-critical", message: "Critical" };
    }
    if (
      voltage < BATTERY_VOLTAGE_LOW_WARNING ||
      voltage > BATTERY_VOLTAGE_HIGH_WARNING
    ) {
      return { color: "status-warning", message: "Warning" };
    }
    return { color: "status-normal", message: "Normal" };
  };

  const getOilPressureStatus = (pressure) => {
    if (
      pressure < OIL_PRESSURE_LOW_CRITICAL ||
      pressure > OIL_PRESSURE_HIGH_CRITICAL
    ) {
      return { color: "status-critical", message: "Critical" };
    }
    if (
      pressure < OIL_PRESSURE_LOW_WARNING ||
      pressure > OIL_PRESSURE_HIGH_WARNING
    ) {
      return { color: "status-warning", message: "Warning" };
    }
    return { color: "status-normal", message: "Normal" };
  };

  const getRunHoursStatus = (hours) => {
    if (hours > RUN_HOURS_SERVICE_CRITICAL)
      return { color: "status-critical", message: "Service Overdue" };
    if (hours > RUN_HOURS_SERVICE_WARNING)
      return { color: "status-warning", message: "Service Due" };
    return { color: "status-normal", message: "Normal" };
  };

  const fuelStatus = getFuelLevelStatus(currentData.Sensor_FuelLevel);
  const batteryStatus = getBatteryStatus(currentData.Sensor_BatteryVoltage);
  const oilStatus = getOilPressureStatus(currentData.Sensor_OilPressure);
  const runHoursStatus = getRunHoursStatus(currentData.Sensor_RunHours);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">
            Building Automation System - Generator Dashboard
          </h1>
          <div className="header-time">
            {currentTime} | Current View: {currentData.time}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="dashboard-main">
        {/* Left Column - Charts */}
        <div className="chart-column">
          {/* Fuel Level Chart */}
          <div className="panel">
            <h2 className="chart-title">Fuel Level (%)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={generatorData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine
                    y={FUEL_LEVEL_LOW_WARNING}
                    stroke="#F59E0B"
                    strokeDasharray="3 3"
                    label="Warning (30%)"
                  />
                  <ReferenceLine
                    y={FUEL_LEVEL_LOW_CRITICAL}
                    stroke="#EF4444"
                    strokeDasharray="3 3"
                    label="Critical (15%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="Sensor_FuelLevel"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                    name="Fuel Level"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-grid">
            {/* Battery Voltage Chart */}
            <div className="panel">
              <h2 className="chart-title">Battery Voltage (V)</h2>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={generatorData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[11, 15]} />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine
                      y={BATTERY_VOLTAGE_LOW_WARNING}
                      stroke="#F59E0B"
                      strokeDasharray="3 3"
                      label="Low"
                    />
                    <ReferenceLine
                      y={BATTERY_VOLTAGE_LOW_CRITICAL}
                      stroke="#EF4444"
                      strokeDasharray="3 3"
                      label="Critical Low"
                    />
                    <ReferenceLine
                      y={BATTERY_VOLTAGE_HIGH_WARNING}
                      stroke="#F59E0B"
                      strokeDasharray="3 3"
                      label="High"
                    />
                    <ReferenceLine
                      y={BATTERY_VOLTAGE_HIGH_CRITICAL}
                      stroke="#EF4444"
                      strokeDasharray="3 3"
                      label="Critical High"
                    />
                    <Line
                      type="monotone"
                      dataKey="Sensor_BatteryVoltage"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ r: 1 }}
                      activeDot={{ r: 5 }}
                      name="Battery"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Oil Pressure Chart */}
            <div className="panel">
              <h2 className="chart-title">Oil Pressure (psi)</h2>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={generatorData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 70]} />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine
                      y={OIL_PRESSURE_LOW_WARNING}
                      stroke="#F59E0B"
                      strokeDasharray="3 3"
                      label="Low"
                    />
                    <ReferenceLine
                      y={OIL_PRESSURE_LOW_CRITICAL}
                      stroke="#EF4444"
                      strokeDasharray="3 3"
                      label="Critical Low"
                    />
                    <ReferenceLine
                      y={OIL_PRESSURE_HIGH_WARNING}
                      stroke="#F59E0B"
                      strokeDasharray="3 3"
                      label="High"
                    />
                    <ReferenceLine
                      y={OIL_PRESSURE_HIGH_CRITICAL}
                      stroke="#EF4444"
                      strokeDasharray="3 3"
                      label="Critical High"
                    />
                    <Line
                      type="monotone"
                      dataKey="Sensor_OilPressure"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ r: 1 }}
                      activeDot={{ r: 5 }}
                      name="Oil Pressure"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Run Hours Chart */}
          <div className="panel">
            <h2 className="chart-title">Run Hours (hrs)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={generatorData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Sensor_RunHours"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                    name="Run Hours"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Current Status & Alarms */}
        <div className="status-column">
          {/* Current Metrics Panel */}
          <div className="panel">
            <h2 className="panel-title">Current Metrics</h2>

            <div className="metric-container">
              <div className="metric-row">
                <div className="metric-label">Time:</div>
                <div className="metric-value">{currentData.time}</div>
              </div>

              <div className="metric-row">
                <div className="metric-label">
                  <Droplet size={16} className="metric-icon" />
                  Fuel Level:
                </div>
                <div className={`metric-value ${fuelStatus.color}`}>
                  {currentData.Sensor_FuelLevel}%
                  <span className="metric-status">{fuelStatus.message}</span>
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-label">
                  <Battery size={16} className="metric-icon" />
                  Battery Voltage:
                </div>
                <div className={`metric-value ${batteryStatus.color}`}>
                  {currentData.Sensor_BatteryVoltage}V
                  <span className="metric-status">{batteryStatus.message}</span>
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-label">
                  <Gauge size={16} className="metric-icon" />
                  Oil Pressure:
                </div>
                <div className={`metric-value ${oilStatus.color}`}>
                  {currentData.Sensor_OilPressure} psi
                  <span className="metric-status">{oilStatus.message}</span>
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-label">
                  <Clock size={16} className="metric-icon" />
                  Run Hours:
                </div>
                <div className={`metric-value ${runHoursStatus.color}`}>
                  {currentData.Sensor_RunHours} hrs
                  <span className="metric-status">
                    {runHoursStatus.message}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Predictive Maintenance Panel */}
          <div className="panel">
            <h2 className="panel-title">Predictive Maintenance</h2>

            <div className="metric-container">
              <div className="metric-row">
                <div className="metric-label">
                  Estimated time until refueling needed:
                </div>
                <div
                  className={`metric-value ${
                    refuelNeededIn < 24 ? "status-warning" : "status-normal"
                  }`}
                >
                  {refuelNeededIn} hours
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-label">
                  Estimated time until service:
                </div>
                <div
                  className={`metric-value ${
                    serviceNeededIn < 24 ? "status-warning" : "status-normal"
                  }`}
                >
                  {serviceNeededIn} hours
                </div>
              </div>
            </div>
          </div>

          {/* Alarm Panel */}
          <div className="panel">
            <div className="alarm-header">
              <Bell size={20} style={{ color: "#ef4444" }} />
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
                    <AlertTriangle
                      size={18}
                      style={{
                        color:
                          alarm.level === "critical" ? "#ef4444" : "#f59e0b",
                      }}
                    />
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

          {/* Maintenance Log */}
          <div className="panel">
            <h2 className="panel-title">Maintenance Log</h2>
            <div className="maintenance-log">
              <div className="log-item">
                <span className="log-label">Last Oil Change</span>
                <span className="log-value">152.4 hrs</span>
              </div>
              <div className="log-item">
                <span className="log-label">Last Filter Change</span>
                <span className="log-value">152.4 hrs</span>
              </div>
              <div className="log-item">
                <span className="log-label">Last Full Service</span>
                <span className="log-value">0.0 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        Building Automation System - Generator Module | © 2025 Locker Studio
      </footer>
    </div>
  );
};

export default GeneratorDashboard;
