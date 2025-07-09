# model.py — Smart, Simple, Powerful

import json
import pandas as pd
from sklearn.ensemble import IsolationForest
from datetime import datetime

# Step 1: Read scan logs from file
with open('scan_logs.txt', 'r') as f:
    logs = [json.loads(line.strip()) for line in f]

# Step 2: Convert to DataFrame
df = pd.DataFrame(logs)

# Step 3: Convert timestamp to hour feature
df['timestamp'] = pd.to_datetime(df['timestamp'])
df['hour'] = df['timestamp'].dt.hour

# Step 4: Count how many times each verifier scanned
df['scan_count'] = df.groupby('scannedBy')['scannedBy'].transform('count')

# Step 5: Select useful features for model
features = df[['hour', 'scan_count']]

# Step 6: Train Isolation Forest to detect outliers
model = IsolationForest(contamination=0.25, random_state=42)
df['anomaly'] = model.fit_predict(features)

# Step 7: Mark High/Low Risk based on anomaly
df['risk'] = df['anomaly'].apply(lambda x: 'High' if x == -1 else 'Low')

# Step 8: Show results
print("\n⚠️  Detected Risky Scans:\n")
print(df[['scannedBy', 'timestamp', 'scan_count', 'risk']])

# Step 9: Save updated logs
df.drop(columns=['anomaly']).to_json("scan_logs_with_risk.json", orient='records', indent=2)
print("\n✅ Risk-annotated logs saved to scan_logs_with_risk.json")
