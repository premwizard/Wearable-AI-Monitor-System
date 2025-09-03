import { useEffect, useState } from "react";

function HistoryTable() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/history")
      .then((res) => res.json())
      .then((json) => setHistory(json))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="card">
      <h2>📜 History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Steps</th>
            <th>Heart Rate</th>
            <th>SpO₂</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, idx) => (
            <tr key={idx}>
              <td>{item.date}</td>
              <td>{item.steps}</td>
              <td>{item.heart_rate}</td>
              <td>{item.spo2}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
