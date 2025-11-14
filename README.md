# Wearable AI Monitor

A comprehensive real-time health tracking and analysis system that monitors vital signs from wearable devices and provides AI-powered health insights.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-Time Health Monitoring**: Track steps, heart rate, and blood oxygen levels (SpO₂)
- **Daily Health Summary**: View comprehensive daily health statistics with status indicators
- **Health Trends Visualization**: Interactive charts to visualize health metrics over time
- **AI Health Analysis**: Get intelligent health insights and recommendations
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Data Persistence**: MongoDB integration for long-term health data storage
- **Interactive Dashboard**: Tab-based navigation between Overview and Analytics views

### Health Metrics Tracked
- ** Steps**: Daily step count with activity status assessment
- ** Heart Rate**: Continuous heart rate monitoring with normal range detection
- ** SpO₂ (Oxygen Level)**: Blood oxygen saturation monitoring

## Project Structure

```
WATCH TRACKING SYSTEM/
├── backend/
│   ├── app.py                 # Flask backend server
│   ├── wearable_api.py        # Wearable device API integration
│   ├── ai_model.py            # AI health analysis engine
│   ├── database.py            # MongoDB database operations
│   └── __pycache__/
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main application component
│   │   ├── App.css            # Global styling
│   │   ├── main.jsx           # Entry point
│   │   ├── index.css          # Base styles
│   │   ├── assets/            # Static assets
│   │   └── components/
│   │       ├── DailyStats.jsx # Daily health statistics
│   │       ├── HistoryChart.jsx # Trend visualization
│   │       └── HistoryTable.jsx # Health history data table
│   ├── public/
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── eslint.config.js       # ESLint configuration
│   └── README.md              # Frontend documentation
├── requirements.txt           # Python dependencies
├── README.md                  # This file
└── LICENSE                    # Project license
```

## Tech Stack

### Frontend
- **React 19**: Modern UI library for building interactive interfaces
- **Vite**: Lightning-fast build tool and development server
- **Recharts**: Composable charting library for React
- **CSS3**: Modern styling with gradients and animations

### Backend
- **Flask**: Lightweight Python web framework
- **Python**: Server-side logic and AI processing
- **MongoDB**: NoSQL database for health data storage
- **DNSPython**: DNS support for MongoDB connections

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/premwizard/Wearable-AI-Monitor-System.git
cd WATCH\ TRACKING\ SYSTEM
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r ../requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install Node.js dependencies
npm install
```

## 💻 Usage

### Starting the Backend Server

```bash
# From the backend directory
python app.py
```

The backend server will start at `http://127.0.0.1:5000`

### Starting the Frontend Development Server

```bash
# From the frontend directory
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Running Linting

```bash
cd frontend
npm run lint
```

## 🔌 API Endpoints

### Get Daily Health Stats
```
GET /daily
```
Returns today's health metrics and AI analysis.

**Response:**
```json
{
  "date": "2025-11-15",
  "steps": 8500,
  "heart_rate": 72,
  "spo2": 98,
  "analysis": "Excellent health status"
}
```

### Get Health History
```
GET /history
```
Returns all recorded health metrics over time.

**Response:**
```json
[
  {
    "date": "2025-11-15",
    "steps": 8500,
    "heart_rate": 72,
    "spo2": 98
  },
  ...
]
```

### Get AI Health Report
```
GET /report
```
Returns detailed AI-powered health analysis and recommendations.

**Response:**
```json
{
  "report": "Detailed health analysis report..."
}
```

## 🧩 Components

### App.jsx
Main application component with header, navigation, and tab-based content switching.

### DailyStats.jsx
Displays today's health metrics in an attractive grid layout with:
- Status indicators for each metric
- AI health report generation
- Error handling and loading states

### HistoryChart.jsx
Interactive line chart showing health trends using Recharts library:
- Steps trend
- Heart rate trend
- SpO₂ trend
- Tooltip and legend for data clarity

### HistoryTable.jsx
Sortable data table displaying complete health history with:
- Sortable columns
- Responsive design
- Record count display
- Professional styling

## ⚙️ Configuration

### Backend Configuration (app.py)
- Modify database connection settings in `database.py`
- Adjust API endpoints as needed
- Update CORS settings if accessing from different domains

### Frontend Configuration (vite.config.js)
- Backend API URL: Update in components if using a different backend URL
- Build output: Configure in vite.config.js

## 📝 File Descriptions

| File | Purpose |
|------|---------|
| `app.py` | Flask application and route handlers |
| `wearable_api.py` | Integration with wearable device APIs |
| `ai_model.py` | AI/ML model for health analysis |
| `database.py` | MongoDB operations and data management |
| `App.jsx` | Main React application component |
| `DailyStats.jsx` | Daily statistics display component |
| `HistoryChart.jsx` | Chart visualization component |
| `HistoryTable.jsx` | Data table component |

## 🌐 API Integration

The system integrates with wearable devices through the `wearable_api.py` module. Currently supported:
- Generic fitness tracking APIs
- Heart rate monitoring devices
- SpO₂ measurement devices

To add support for additional devices, modify the `wearable_api.py` file.

## 🔐 Security Considerations

- Ensure MongoDB credentials are stored securely (use environment variables)
- Use HTTPS in production environments
- Validate all API inputs
- Implement authentication for sensitive endpoints
- Protect user health data with appropriate access controls

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check if port 5000 is available
- Verify all dependencies are installed: `pip install -r requirements.txt`

### Frontend won't connect to backend
- Verify backend is running on `http://127.0.0.1:5000`
- Check CORS settings in Flask app
- Ensure firewall isn't blocking connections

### Charts not displaying
- Check browser console for errors
- Verify health data is available in MongoDB
- Ensure Recharts is properly installed

## 📊 Development Workflow

1. **Create a feature branch**: `git checkout -b feature/your-feature`
2. **Make your changes**: Implement your feature or fix
3. **Test thoroughly**: Run tests and verify in browser
4. **Commit changes**: `git commit -m "Add your feature"`
5. **Push to branch**: `git push origin feature/your-feature`
6. **Create Pull Request**: Submit your changes for review

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work and project creator

## 🙏 Acknowledgments

- Flask documentation and community
- React and Vite teams
- Recharts library for beautiful charts
- MongoDB for reliable data storage
- All contributors and users

## 📞 Support

For support, email support@wearablemonitor.com or open an issue on GitHub.

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Real-time health monitoring
- AI-powered health analysis
- Interactive dashboard with trends and history
- Responsive modern UI

## 🎯 Future Enhancements

- [ ] User authentication and profiles
- [ ] Multi-device support
- [ ] Export health data as PDF/CSV
- [ ] Advanced AI recommendations
- [ ] Mobile app version
- [ ] Integration with popular fitness platforms
- [ ] Real-time alerts for abnormal metrics
- [ ] Social sharing features
- [ ] Dark mode UI
- [ ] Multi-language support

---

**Happy Health Tracking! 💚**

For more information, visit our [website](https://wearablemonitor.example.com)
