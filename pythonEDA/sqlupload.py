import pandas as pd
import requests
import json

df = pd.read_csv('combined_storm_data.csv')

for col in ['max_wind_speed', 'wind_speed_at_landfall', 'strict_wind_speed_at_landfall']:
    df[col] = df[col].astype(int)

for col in ['landfall_date', 'strict_landfall_date']:
    df[col] = df[col].str.slice(0,10)

for col in ['is_hurricane', 'has_strict_landfall','has_any_landfall','has_liberal_landfall']:
    df[col] = df[col].astype(int)

prev_columns = [
    'storm_id', 'storm_name','year','max_wind_speed','wind_speed_at_landfall','strict_wind_speed_at_landfall',
    'landfall_date','strict_landfall_date', 'is_hurricane','has_strict_landfall', 'has_liberal_landfall','has_any_landfall'
]

new_columns = [
    'StormID', 'StormName', 'Year','MaxWindSpeed', 'WindSpeedAtLandfall', 'StrictWindSpeedAtLandfall',
    'LandfallDate', 'StrictLandfallDate', 'IsHurricane', 'HasLiberalLandfall', 'HasStrictLandfall','HasAnyLandfall'
]
column_map = dict(zip(prev_columns, new_columns))

df=df[prev_columns]
df.rename(columns=column_map, inplace=True)

json_string = df.to_json(orient='records')
data_payload = json.loads(json_string)
#print(data_payload)

#response = requests.get('http://localhost:5253/test')


try:
    response = requests.post('http://localhost:5253/upload', json=data_payload)
    response.raise_for_status()
    print("Data successfully uploaded.")
except:
    print("Failed to upload data.")