import random
import datetime

def get_daily_vitals():
    # Simulate wearable data
    steps = random.randint(2000, 12000)
    hr = random.randint(60, 110)
    spo2 = round(random.uniform(92, 99), 1)
    date = datetime.datetime.utcnow().strftime("%Y-%m-%d")
    return date, steps, hr, spo2
