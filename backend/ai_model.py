def analyze_health(steps, heart_rate, spo2):
    if heart_rate > 100 and steps < 2000:
        return "⚠ Possible stress or inactivity issue"
    elif spo2 < 94:
        return "⚠ Low blood oxygen detected"
    elif steps >= 8000:
        return "✅ Great activity today!"
    else:
        return "Keep moving and monitor vitals."
