using Microsoft.Data.SqlClient;
using System.Text.Json;
using System.IO;
using System.Collections.Generic;
using System.Data;



namespace CSharpBackend
{   
    public static class QueryHandler
    {

        public static List<Storm> getStormListFromCommand(IDbCommand command)
        {
            using (var reader = command.ExecuteReader())
            {
                var storms = new List<Storm>();
                while (reader.Read())
                {
                    Storm nextStorm = new Storm
                    {
                        StormID = reader.GetString(reader.GetOrdinal("StormID")),
                        StormName = reader.GetString(reader.GetOrdinal("StormName")),
                        LandfallDate = reader.GetString(reader.GetOrdinal("LandfallDate")),
                        StrictLandfallDate = reader.GetString(reader.GetOrdinal("StrictLandfallDate")),
                        MaxWindSpeed = reader.GetByte(reader.GetOrdinal("MaxWindSpeed")),
                        WindSpeedAtLandfall = reader.GetByte(reader.GetOrdinal("WindSpeedAtLandfall")),
                        StrictWindSpeedAtLandfall = reader.GetByte(reader.GetOrdinal("StrictWindSpeedAtLandfall")),
                        IsHurricane = reader.GetByte(reader.GetOrdinal("IsHurricane")),
                        HasLiberalLandfall = reader.GetByte(reader.GetOrdinal("HasLiberalLandfall")),
                        HasStrictLandfall = reader.GetByte(reader.GetOrdinal("HasStrictLandfall"))
                    };
                    storms.Add(nextStorm);
                }
                return storms;
            }
        }

        public static string getAllStormInfo()
        {
            return ConnectionHandler.RunQuery(connection =>
            {
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = $@"SELECT StormID, StormName, 
                    MaxWindSpeed, WindSpeedAtLandfall, StrictWindSpeedAtLandfall, 
                    LandfallDate, StrictLandfallDate,IsHurricane, HasLiberalLandfall, 
                    HasStrictLandfall FROM valid_storms ORDER BY StormName;";
                    return JsonSerializer.Serialize(getStormListFromCommand(command));
                }
            });
        }
        public static string getStormInfoSearch(int pageNumber, int pageSize, string type, string sortBy, bool ascending, string searchterm)
        {
            var validSortColumns = new List<string> { "StormID", "StormName", "MaxWindSpeed", "LandfallDate", "WindSpeedAtLandfall" };
            if (!validSortColumns.Contains(sortBy))
            {
                throw new ArgumentException($"Invalid sort column {sortBy} specified.");
            }


            var validTypes = new List<string> { "Strict", "Liberal", "Any" };
            if (!validTypes.Contains(type))
            {
                throw new ArgumentException($"Invalid storm type {type} specified.");
            }

            bool isnumeric = int.TryParse(searchterm, out int numericSearchTerm);

            string searchString = isnumeric ? $@"AND (Duration = {numericSearchTerm} OR
                                    WindSpeedAtLandfall = {numericSearchTerm} OR
                                    Year = {numericSearchTerm} OR
                                    LandfallDate like '%{searchterm}%' OR
                                    StrictLandfallDate like '%{searchterm}%' OR
                                    StormID like '%{searchterm}%')"
                                    : $@"AND (StormName like '%{searchterm}%' OR
                                    StormID like '%{searchterm}%' OR
                                    LandfallDate like '%{searchterm}%' OR
                                    StrictLandfallDate like '%{searchterm}%')";

            string commandstring = $@"SELECT StormID, StormName, 
                MaxWindSpeed, WindSpeedAtLandfall, StrictWindSpeedAtLandfall, 
                LandfallDate, StrictLandfallDate,IsHurricane, HasLiberalLandfall, 
                HasStrictLandfall FROM valid_storms 
                WHERE Has{type}Landfall = 1
                {searchString}
                ORDER BY {sortBy} {(ascending ? "ASC" : "DESC")}
                LIMIT {pageSize} OFFSET {pageNumber * pageSize};";

            
            var totalRows = ConnectionHandler.RunQuery(connection =>
                {
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "Select COUNT(*) FROM valid_storms " + $@"WHERE 
                        Has{type}Landfall = 1 {searchString};";
                        using (var reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                return reader.GetInt32(0);
                            }
                            else
                            {
                                throw new Exception("Failed to retrieve total row count.");
                            }
                        }
                    }
                }
            );

            return ConnectionHandler.RunQuery(connection =>
                {
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = commandstring;

                        APIResponse response = new APIResponse
                        {
                            data = getStormListFromCommand(command),
                            metaData = new MetaData
                            {
                                currentPage = pageNumber,
                                pageSize = pageSize,
                                totalPages = (int)Math.Ceiling((double)totalRows / pageSize),
                                totalRecords = totalRows
                            }
                        };

                        return JsonSerializer.Serialize(response);
                    }
                }
            );
        }
        public static string getStormInfo(int pageNumber, int pageSize, string type, string sortBy, bool ascending)
        {
            return getStormInfoSearch(pageNumber, pageSize, type, sortBy, ascending, "");
        }
    }
}