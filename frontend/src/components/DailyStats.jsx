import { useEffect, useState } from "react";

function DailyStats() {
  const [data, setData] = useState(null);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/daily")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to fetch health data. Please check the server.");
      })
      .finally(() => setLoading(false));
  };

  const fetchReport = () => {
    fetch("http://127.0.0.1:5000/report")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch report");
        return res.json();
      })
      .then((json) => setReport(json.report))
      .catch((err) => {
        console.error(err);
        setError("Unable to fetch AI report.");
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="card">
        <p>⏳ Loading today's health stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <p style={{ color: "#e74c3c" }}>❌ {error}</p>
        <button onClick={fetchData} className="btn">Retry</button>
      </div>
    );
  }

  if (!data) return null;

  // Determine health status based on metrics
  const getHealthStatus = () => {
    if (data.steps < 3000) return "Low Activity";
    if (data.steps < 7000) return "Moderate Activity";
    if (data.steps >= 10000) return "Excellent Activity";
    return "Good Activity";
  };

  const getHeartRateStatus = () => {
    if (data.heart_rate < 60) return "Below Normal";
    if (data.heart_rate > 100) return "Elevated";
    return "Normal Range";
  };

  const getSpO2Status = () => {
    if (data.spo2 < 95) return "Low";
    return "Healthy";
  };

  return (
    <div className="card">
      <div>
        <h2>📅 Daily Health Summary - {data.date}</h2>
        
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">👣 Steps</div>
            <div className="stat-value">{data.steps}</div>
            <div className="stat-unit">{getHealthStatus()}</div>
          </div>

          <div className="stat-item">
            <div className="stat-label">❤️ Heart Rate</div>
            <div className="stat-value">{data.heart_rate}</div>
            <div className="stat-unit">{getHeartRateStatus()}</div>
          </div>

          <div className="stat-item">
            <div className="stat-label">🩸 Oxygen Level</div>
            <div className="stat-value">{data.spo2}%</div>
            <div className="stat-unit">{getSpO2Status()}</div>
          </div>
        </div>

        <button onClick={fetchReport} className="btn">📊 Get AI Health Report</button>

        {report && (
          <div className="report-box">
            <h3>📄 AI Health Analysis</h3>
            <pre>{report}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyStats;