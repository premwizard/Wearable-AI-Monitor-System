import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function HistoryChart() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/history")
      .then((res) => res.json())
      .then((json) => setHistory(json))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="card">
      <h2>📊 Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="steps" stroke="#8884d8" name="Steps" />
          <Line type="monotone" dataKey="heart_rate" stroke="#82ca9d" name="Heart Rate" />
          <Line type="monotone" dataKey="spo2" stroke="#ff7300" name="SpO₂" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoryChart;
