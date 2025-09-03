from flask import Flask, jsonify
from wearable_api import get_daily_vitals
from ai_model import analyze_health
from database import insert_vitals, get_all_vitals

app = Flask(__name__)

@app.route("/daily", methods=["GET"])
def daily_stats():
    date, steps, hr, spo2 = get_daily_vitals()
    insert_vitals(date, steps, hr, spo2)
    analysis = analyze_health(steps, hr, spo2)

    return jsonify({
        "date": date,
        "steps": steps,
        "heart_rate": hr,
        "spo2": spo2,
        "analysis": analysis
    })

@app.route("/history", methods=["GET"])
def history():
    return jsonify(get_all_vitals())


@app.route("/report", methods=["GET"])
def report():
    # Example: Pull latest data from DB
    latest_data = health_collection.find().sort("date", -1).limit(1)[0]
    
    # Dummy AI logic for now
    report = f"""
    On {latest_data['date']}:
    - Steps: {latest_data['steps']}
    - Heart Rate: {latest_data['heart_rate']} bpm
    - SpO₂: {latest_data['spo2']}%
    
    Analysis: You're maintaining a healthy activity level. Keep heart rate between 60–100 bpm and aim for 8,000+ steps daily.
    """

    return jsonify({"report": report})


if __name__ == "__main__":
    app.run(debug=True)
