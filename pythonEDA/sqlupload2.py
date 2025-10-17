import pandas as pd
import requests
import json

df = pd.read_csv('combined_storm_data.csv')

storm_ids = df['storm_id']

for storm_id in storm_ids[0:10]:
    print(storm_id)

    with open(f"figs/storm{storm_id}.png", "r") as f:
        image_data = f.read()
        


try:
    response = requests.post('http://18.219.101.188:5253/upload', json=data_payload)
    response.raise_for_status()
    print("Data successfully uploaded.")
except requests.exceptions.RequestException as e:
    print(f"Failed to upload data. {e}")