import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function HistoryChart() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/history")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch history");
        return res.json();
      })
      .then((json) => {
        setHistory(json);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load health trends data.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="card">
        <h2>📊 Health Trends</h2>
        <p>⏳ Loading trend data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2>📊 Health Trends</h2>
        <p style={{ color: "#e74c3c" }}>❌ {error}</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="card">
        <h2>📊 Health Trends</h2>
        <p>No data available yet. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📊 Health Trends Over Time</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Track your daily health metrics and identify patterns
      </p>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={history} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="date" 
            stroke="#666"
            style={{ fontSize: "0.9rem" }}
          />
          <YAxis 
            stroke="#666"
            style={{ fontSize: "0.9rem" }}
          />
          <Tooltip 
            contentStyle={{ 
              background: "#fff", 
              border: "2px solid #667eea",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
            labelStyle={{ color: "#333", fontWeight: "bold" }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="steps" 
            stroke="#667eea" 
            strokeWidth={3}
            dot={{ fill: "#667eea", r: 4 }}
            activeDot={{ r: 6 }}
            name="Steps" 
          />
          <Line 
            type="monotone" 
            dataKey="heart_rate" 
            stroke="#764ba2" 
            strokeWidth={3}
            dot={{ fill: "#764ba2", r: 4 }}
            activeDot={{ r: 6 }}
            name="Heart Rate (bpm)" 
          />
          <Line 
            type="monotone" 
            dataKey="spo2" 
            stroke="#f59e0b" 
            strokeWidth={3}
            dot={{ fill: "#f59e0b", r: 4 }}
            activeDot={{ r: 6 }}
            name="SpO₂ (%)" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoryChart;