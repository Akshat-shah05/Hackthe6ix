import pandas as pd
import json

# Load the CSV file
df = pd.read_csv('skincare_products.csv')

# Convert to JSON format
data = df.to_dict(orient='records')

# Save JSON to file
with open('your_dataset.json', 'w') as f:
    json.dump(data, f, indent=4)