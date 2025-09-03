import DailyStats from "./components/DailyStats";
import HistoryTable from "./components/HistoryTable";
import HistoryChart from "./components/HistoryChart";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>⌚ Wearable AI Monitor</h1>
      <DailyStats />
      <HistoryChart />
      <HistoryTable />
    </div>
  );
}

export default App;
