import { useState } from "react";
import DailyStats from "./components/DailyStats";
import HistoryTable from "./components/HistoryTable";
import HistoryChart from "./components/HistoryChart";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>⌚ Wearable AI Monitor</h1>
            <p className="tagline">Real-time Health Tracking & Analysis</p>
          </div>
          <nav className="nav-menu">
            <button 
              className={`nav-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button 
              className={`nav-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {activeTab === "overview" && (
            <>
              <DailyStats />
            </>
          )}
          
          {activeTab === "analytics" && (
            <>
              <HistoryChart />
              <HistoryTable />
            </>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Wearable AI Monitor. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;