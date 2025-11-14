import { useEffect, useState } from "react";

function HistoryTable() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

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
        setError("Unable to load health history.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    });
  };

  const sortedHistory = [...history].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string") {
      return sortConfig.direction === "asc" 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  if (loading) {
    return (
      <div className="card">
        <h2>📜 Health History</h2>
        <p>⏳ Loading history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2>📜 Health History</h2>
        <p style={{ color: "#e74c3c" }}>❌ {error}</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="card">
        <h2>📜 Health History</h2>
        <p>No health records available yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📜 Complete Health History</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        {history.length} records found. Click column headers to sort.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                📅 Date {sortConfig.key === "date" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => handleSort("steps")} style={{ cursor: "pointer" }}>
                👣 Steps {sortConfig.key === "steps" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => handleSort("heart_rate")} style={{ cursor: "pointer" }}>
                ❤️ Heart Rate {sortConfig.key === "heart_rate" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => handleSort("spo2")} style={{ cursor: "pointer" }}>
                🩸 SpO₂ {sortConfig.key === "spo2" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedHistory.map((item, idx) => (
              <tr key={idx}>
                <td><strong>{item.date}</strong></td>
                <td>{item.steps}</td>
                <td>{item.heart_rate} bpm</td>
                <td>{item.spo2}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTable;