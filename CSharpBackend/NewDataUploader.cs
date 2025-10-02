using Microsoft.Data.Sqlite;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

namespace CSharpBackend
{
    public static class NewDataUploader
    {
        public static void UploadNewData(List<Storm> storms)
        {

            string[] columns = new string[]
            {
                "StormID", "StormName", "MaxWindSpeed", "WindSpeedAtLandfall",
                "StrictWindSpeedAtLandfall", "LandfallDate", "StrictLandfallDate",
                "IsHurricane", "HasLiberalLandfall", "HasStrictLandfall",
                "HasAnyLandfall", "Duration", "Year"
            };

            /*SqliteType[] columnTypes = new SqliteType[]
            {
                SqliteType.Text, SqliteType.Text, SqliteType.Integer, SqliteType.Integer,
                SqliteType.Integer, SqliteType.Text, SqliteType.Text,
                SqliteType.Integer, SqliteType.Integer, SqliteType.Integer,
                SqliteType.Integer, SqliteType.Integer, SqliteType.Integer
            };*/

            string sql = "INSERT INTO valid_storms (" + string.Join(", ", columns) + $@") 
            VALUES (" + string.Join(", ", columns.Select(c => "@" + c)) + ");";

            ConnectionHandler.RunAction(connection =>
            {
                using (var transaction = connection.BeginTransaction())
                {
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = sql;
                        command.Transaction = transaction;
                        foreach(string c in columns)
                        {
                            var param = command.CreateParameter();
                            param.ParameterName = "@" + c;
                            command.Parameters.Add(param);
                        }
                        //columns.Select((c, i) => new connection.CreateParameter("@" + c, columnTypes[i])).ToArray());

                        foreach (var storm in storms)
                        {
                            ((IDbDataParameter)command.Parameters["@StormID"]).Value = storm.StormID;
                            ((IDbDataParameter)command.Parameters["@StormName"]).Value = storm.StormName;
                            ((IDbDataParameter)command.Parameters["@MaxWindSpeed"]).Value = storm.MaxWindSpeed;
                            ((IDbDataParameter)command.Parameters["@WindSpeedAtLandfall"]).Value = storm.WindSpeedAtLandfall;
                            ((IDbDataParameter)command.Parameters["@StrictWindSpeedAtLandfall"]).Value = storm.StrictWindSpeedAtLandfall;
                            ((IDbDataParameter)command.Parameters["@LandfallDate"]).Value = storm.LandfallDate;
                            ((IDbDataParameter)command.Parameters["@StrictLandfallDate"]).Value = storm.StrictLandfallDate;
                            ((IDbDataParameter)command.Parameters["@IsHurricane"]).Value = storm.IsHurricane;
                            ((IDbDataParameter)command.Parameters["@HasLiberalLandfall"]).Value = storm.HasLiberalLandfall;
                            ((IDbDataParameter)command.Parameters["@HasStrictLandfall"]).Value = storm.HasStrictLandfall;
                            ((IDbDataParameter)command.Parameters["@HasAnyLandfall"]).Value = storm.HasAnyLandfall;
                            ((IDbDataParameter)command.Parameters["@Duration"]).Value = storm.Duration;
                            ((IDbDataParameter)command.Parameters["@Year"]).Value = storm.Year;

                            command.ExecuteNonQueryAsync();
                        }
                    }
                    transaction.Commit();
                }
            });
        }
    }
}