using Microsoft.Data.SqlClient;
using System.Text.Json;
using System.IO;
using System.Collections.Generic;

public class Storm
{
    public required string stormID { get; set; }
    public required string stormName { get; set; }
    public required int maxWindSpeed { get; set; }
    public required int windSpeedAtLandfall { get; set; }
    public required int strictWindSpeedAtLandfall { get; set; }
    public required string landfallDate { get; set; }
    public required string strictLandfallDate { get; set; }
    public required bool isHurricane { get; set; }
    public required bool hasLiberalLandfall { get; set; }
    public required bool hasStrictLandfall { get; set; }
}

namespace CSharpBackend
{
    public static class QueryHandler
    {
        public static string getAllStormInfo()
        {
            return ConnectionHandler.RunSqlAction(connection =>
            {
                using (var command = new SqlCommand("SELECT storm_id, storm_name, max_wind_speed, wind_speed_at_landfall, strict_wind_speed_at_landfall, landfall_date, strict_landfall_date,is_hurricane, has_liberal_landfall, has_strict_landfall FROM valid_storms ORDER BY storm_name;", connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        var storms = new List<Storm>();
                        while (reader.Read())
                        {
                            Storm nextStorm = new Storm
                            {
                                stormID = reader.GetString(reader.GetOrdinal("storm_id")),
                                stormName = reader.GetString(reader.GetOrdinal("storm_name")),
                                landfallDate = reader.GetString(reader.GetOrdinal("landfall_date")),
                                strictLandfallDate = reader.GetString(reader.GetOrdinal("strict_landfall_date")),
                                maxWindSpeed = reader.GetByte(reader.GetOrdinal("max_wind_speed")),
                                windSpeedAtLandfall = reader.GetByte(reader.GetOrdinal("wind_speed_at_landfall")),
                                strictWindSpeedAtLandfall = reader.GetByte(reader.GetOrdinal("strict_wind_speed_at_landfall")),
                                isHurricane = reader.GetBoolean(reader.GetOrdinal("is_hurricane")),
                                hasLiberalLandfall = reader.GetBoolean(reader.GetOrdinal("has_liberal_landfall")),
                                hasStrictLandfall = reader.GetBoolean(reader.GetOrdinal("has_strict_landfall"))
                            };
                            //string jsonString = JsonSerializer.Serialize(nextStorm);
                            storms.Add(nextStorm);
                        }
                        return JsonSerializer.Serialize(storms);
                    }
                }
            });
        }
    }
}