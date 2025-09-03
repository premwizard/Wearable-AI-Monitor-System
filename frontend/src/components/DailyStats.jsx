import { useEffect, useState } from "react";

function DailyStats() {
  const [data, setData] = useState(null);
  const [report, setReport] = useState("");

  const fetchData = () => {
    fetch("http://127.0.0.1:5000/daily")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  };

  const fetchReport = () => {
    fetch("http://127.0.0.1:5000/report")
      .then((res) => res.json())
      .then((json) => setReport(json.report))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p>Loading today's stats...</p>;

  return (
    <div className="card">
      <h2>📅 {data.date}</h2>
      <p>👣 Steps: {data.steps}</p>
      <p>❤️ Heart Rate: {data.heart_rate} bpm</p>
      <p>🩸 SpO₂: {data.spo2}%</p>
      <button onClick={fetchReport} className="btn">Get Detailed Report</button>

      {report && (
        <div className="report-box">
          <h3>📄 AI Report</h3>
          <pre>{report}</pre>
        </div>
      )}
    </div>
  );
}

export default DailyStats;
