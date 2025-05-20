import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./TransformerDashboard.css";

// Register Chart.js components
Chart.register(...registerables);

const TransformerDashboard = () => {
  // Data from provided readings
  const timeLabels = [
    "12:00 AM",
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const tempData = [
    77.9, 79.7, 68.2, 74.4, 70.9, 70.9, 65.0, 77.7, 79.7, 77.4, 72.1, 71.1,
    69.9, 71.0, 95.0, 65.1, 71.3, 79.5, 65.1, 78.7, 76.9, 68.3, 72.5, 66.9,
  ];

  const currentData = [
    107.7, 92.4, 103.0, 119.4, 119.1, 102.8, 112.8, 97.5, 110.7, 94.6, 96.2,
    83.5, 82.3, 97.1, 91.9, 81.4, 100.1, 92.5, 116.3, 119.6, 117.5, 106.5,
    118.6, 88.3,
  ];

  const voltageData = [
    427.1, 422.8, 423.9, 410.9, 419.6, 410.1, 417.0, 429.6, 418.2, 422.5, 429.8,
    418.3, 413.3, 424.6, 416.6, 420.3, 428.0, 414.5, 425.3, 417.5, 420.0, 418.1,
    420.7, 422.4,
  ];

  // Thresholds for alarms
  const thresholds = {
    temp: {
      min: 60,
      lowWarning: 65,
      highWarning: 85,
      max: 90,
    },
    current: {
      min: 80,
      lowWarning: 80,
      highWarning: 120,
      max: 120,
    },
    voltage: {
      min: 400,
      lowWarning: 410,
      highWarning: 430,
      max: 440,
    },
  };

  // State for current data
  const [currentTemp, setCurrentTemp] = useState(95.0);
  const [currentCurrent, setCurrentCurrent] = useState(91.9);
  const [currentVoltage, setCurrentVoltage] = useState(416.6);
  const [tempStatus, setTempStatus] = useState("alarm");
  const [currentStatus, setCurrentStatus] = useState("normal");
  const [voltageStatus, setVoltageStatus] = useState("normal");
  const [systemStatus, setSystemStatus] = useState("alarm");
  const [selectedParam, setSelectedParam] = useState("temp");
  const [timeFilter, setTimeFilter] = useState("24H");
  const [alarms, setAlarms] = useState([
    {
      id: 1,
      time: "02:00 PM",
      description:
        "CRITICAL: Transformer Temperature exceeded maximum threshold (95.0°C)",
      level: "critical",
    },
    {
      id: 2,
      time: "07:00 PM",
      description:
        "WARNING: Load Current approaching maximum threshold (119.6A)",
      level: "warning",
    },
    {
      id: 3,
      time: "05:00 AM",
      description: "WARNING: Voltage dropped below normal range (410.1V)",
      level: "warning",
    },
  ]);

  // Main chart data
  const getMainChartData = () => {
    if (selectedParam === "all") {
      return {
        labels: timeLabels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: tempData,
            borderColor: "#f72585",
            backgroundColor: "rgba(247, 37, 133, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
            yAxisID: "y",
          },
          {
            label: "Current (A)",
            data: currentData,
            borderColor: "#4361ee",
            backgroundColor: "rgba(67, 97, 238, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            pointRadius: 3,
            pointHoverRadius: 5,
            yAxisID: "y1",
          },
          {
            label: "Voltage (V)",
            data: voltageData,
            borderColor: "#4cc9f0",
            backgroundColor: "rgba(76, 201, 240, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            pointRadius: 3,
            pointHoverRadius: 5,
            yAxisID: "y2",
          },
        ],
      };
    } else if (selectedParam === "temp") {
      return {
        labels: timeLabels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: tempData,
            borderColor: "#f72585",
            backgroundColor: "rgba(247, 37, 133, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      };
    } else if (selectedParam === "current") {
      return {
        labels: timeLabels,
        datasets: [
          {
            label: "Current (A)",
            data: currentData,
            borderColor: "#4361ee",
            backgroundColor: "rgba(67, 97, 238, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      };
    } else if (selectedParam === "voltage") {
      return {
        labels: timeLabels,
        datasets: [
          {
            label: "Voltage (V)",
            data: voltageData,
            borderColor: "#4cc9f0",
            backgroundColor: "rgba(76, 201, 240, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      };
    }
  };

  // Main chart options
  const getMainChartOptions = () => {
    if (selectedParam === "all") {
      return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            usePointStyle: true,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "white",
            bodyColor: "white",
            borderColor: "white",
            borderWidth: 0.5,
            padding: 10,
            displayColors: true,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Temperature (°C)",
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Current (A)",
            },
            grid: {
              drawOnChartArea: false,
            },
          },
          y2: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Voltage (V)",
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };
    } else {
      return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            usePointStyle: true,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "white",
            bodyColor: "white",
            borderColor: "white",
            borderWidth: 0.5,
            padding: 10,
            displayColors: true,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: false,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
        },
      };
    }
  };

  // Individual chart data
  const getTempChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: tempData,
        borderColor: "#f72585",
        backgroundColor: "rgba(247, 37, 133, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };

  const getCurrentChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Current (A)",
        data: currentData,
        borderColor: "#4361ee",
        backgroundColor: "rgba(67, 97, 238, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };

  const getVoltageChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Voltage (V)",
        data: voltageData,
        borderColor: "#4cc9f0",
        backgroundColor: "rgba(76, 201, 240, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };

  // Individual chart options
  const getIndividualChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: false,
        grid: {
          display: false,
        },
      },
    },
  };

  // Critical point chart data
  const criticalPointData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: tempData,
        borderColor: "#f72585",
        backgroundColor: "rgba(247, 37, 133, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: "High Threshold",
        data: Array(timeLabels.length).fill(thresholds.temp.max),
        borderColor: "#ef4444",
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  // Critical point chart options
  const criticalPointOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  // Handle alarm acknowledgement
  const handleAcknowledgeAlarm = () => {
    setSystemStatus("normal");
    setTempStatus("normal");
    setAlarms([]);
  };

  // Handle parameter selection
  const handleParamChange = (param) => {
    setSelectedParam(param);
  };

  // Handle time filter change
  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
  };

  // Handle alarm clearing
  const handleClearAlarms = () => {
    setAlarms([]);
  };

  // Handle individual alarm acknowledgement
  const handleAcknowledgeIndividualAlarm = (id) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
    if (alarms.length <= 1) {
      setSystemStatus("normal");
      setTempStatus("normal");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <div className="brand-icon">BAS</div>
          <span>Building Automation</span>
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#" className="nav-link active">
              <span>📊</span> Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span>⚡</span> Transformers
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span>❄️</span> HVAC Systems
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span>💡</span> Lighting
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span>🚿</span> Water Systems
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span>🔒</span> Security
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span>📋</span> Reports
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span>⚙️</span> Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Main Power Transformer</h1>
          <div className={`status-badge status-${systemStatus}`}>
            <div className="status-indicator"></div>
            <span>
              {systemStatus === "alarm" ? "ALARM ACTIVE" : "NORMAL OPERATION"}
            </span>
          </div>
        </div>

        {/* Quick Stats Widgets */}
        <div className="widgets-container">
          <div className="widget">
            <div className="widget-header">
              <div className="widget-title">Temperature</div>
              <div
                className={`status-badge status-${tempStatus}`}
                style={{ fontSize: "12px", padding: "3px 10px" }}
              >
                <div className="status-indicator"></div>
                <span>{tempStatus === "alarm" ? "CRITICAL" : "Normal"}</span>
              </div>
            </div>
            <div className={`widget-value value-${tempStatus}`}>
              {currentTemp}°C
            </div>
            <div className="widget-footer">
              <span>Normal Range: 65-85°C</span>
              <span>Updated: Just now</span>
            </div>
          </div>

          <div className="widget">
            <div className="widget-header">
              <div className="widget-title">Load Current</div>
              <div
                className={`status-badge status-${currentStatus}`}
                style={{ fontSize: "12px", padding: "3px 10px" }}
              >
                <div className="status-indicator"></div>
                <span>{currentStatus === "alarm" ? "CRITICAL" : "Normal"}</span>
              </div>
            </div>
            <div className={`widget-value value-${currentStatus}`}>
              {currentCurrent}A
            </div>
            <div className="widget-footer">
              <span>Normal Range: 80-120A</span>
              <span>Updated: Just now</span>
            </div>
          </div>

          <div className="widget">
            <div className="widget-header">
              <div className="widget-title">Voltage</div>
              <div
                className={`status-badge status-${voltageStatus}`}
                style={{ fontSize: "12px", padding: "3px 10px" }}
              >
                <div className="status-indicator"></div>
                <span>{voltageStatus === "alarm" ? "CRITICAL" : "Normal"}</span>
              </div>
            </div>
            <div className={`widget-value value-${voltageStatus}`}>
              {currentVoltage}V
            </div>
            <div className="widget-footer">
              <span>Normal Range: 410-430V</span>
              <span>Updated: Just now</span>
            </div>
          </div>
        </div>

        {/* Main Chart Section */}
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">Overall Performance</div>
            <div className="time-filter">
              <button
                className={`time-btn ${timeFilter === "24H" ? "active" : ""}`}
                onClick={() => handleTimeFilterChange("24H")}
              >
                24H
              </button>
              <button
                className={`time-btn ${timeFilter === "12H" ? "active" : ""}`}
                onClick={() => handleTimeFilterChange("12H")}
              >
                12H
              </button>
              <button
                className={`time-btn ${timeFilter === "6H" ? "active" : ""}`}
                onClick={() => handleTimeFilterChange("6H")}
              >
                6H
              </button>
              <button
                className={`time-btn ${timeFilter === "1H" ? "active" : ""}`}
                onClick={() => handleTimeFilterChange("1H")}
              >
                1H
              </button>
            </div>
          </div>
          <div className="parameter-selector">
            <button
              className={`parameter-btn ${
                selectedParam === "temp" ? "active" : ""
              }`}
              onClick={() => handleParamChange("temp")}
            >
              Temperature
            </button>
            <button
              className={`parameter-btn ${
                selectedParam === "current" ? "active" : ""
              }`}
              onClick={() => handleParamChange("current")}
            >
              Current
            </button>
            <button
              className={`parameter-btn ${
                selectedParam === "voltage" ? "active" : ""
              }`}
              onClick={() => handleParamChange("voltage")}
            >
              Voltage
            </button>
            <button
              className={`parameter-btn ${
                selectedParam === "all" ? "active" : ""
              }`}
              onClick={() => handleParamChange("all")}
            >
              All Parameters
            </button>
          </div>
          <div className="chart-container">
            <Line data={getMainChartData()} options={getMainChartOptions()} />
          </div>
        </div>

        {/* Individual Charts */}
        <div className="individual-charts">
          <div className="mini-chart-card">
            <div className="mini-chart-header">
              <div className="mini-chart-title">Temperature Trend</div>
            </div>
            <div className="mini-chart-container">
              <Line
                data={getTempChartData}
                options={getIndividualChartOptions}
              />
            </div>
          </div>
          <div className="mini-chart-card">
            <div className="mini-chart-header">
              <div className="mini-chart-title">Current Trend</div>
            </div>
            <div className="mini-chart-container">
              <Line
                data={getCurrentChartData}
                options={getIndividualChartOptions}
              />
            </div>
          </div>
          <div className="mini-chart-card">
            <div className="mini-chart-header">
              <div className="mini-chart-title">Voltage Trend</div>
            </div>
            <div className="mini-chart-container">
              <Line
                data={getVoltageChartData}
                options={getIndividualChartOptions}
              />
            </div>
          </div>
        </div>

        {/* Charts and Alarm Container */}
        <div className="charts-container">
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-title">Critical Point Analysis</div>
            </div>
            <div className="chart-container">
              <Line data={criticalPointData} options={criticalPointOptions} />
            </div>
          </div>

          <div className="alarm-log">
            <div className="alarm-log-header">
              <div className="alarm-log-title">Alarm Log</div>
              <button
                className="btn btn-outline"
                style={{ padding: "5px 10px", fontSize: "12px" }}
                onClick={handleClearAlarms}
              >
                Clear All
              </button>
            </div>
            <div className="alarm-entries">
              {alarms.length > 0 ? (
                alarms.map((alarm) => (
                  <div key={alarm.id} className={`alarm-entry ${alarm.level}`}>
                    <div className="alarm-time">{alarm.time}</div>
                    <div className="alarm-description">{alarm.description}</div>
                    <div className="alarm-actions">
                      <button
                        className="action-btn"
                        onClick={() =>
                          handleAcknowledgeIndividualAlarm(alarm.id)
                        }
                      >
                        ✓
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-alarms">No active alarms</div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <button className="btn btn-primary" onClick={handleAcknowledgeAlarm}>
            Acknowledge Alarm
          </button>
          <button className="btn btn-outline">Export Data</button>
          <button className="btn btn-outline">System Settings</button>
        </div>
      </div>
    </div>
  );
};

export default TransformerDashboard;
