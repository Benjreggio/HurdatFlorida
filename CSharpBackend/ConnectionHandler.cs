using System;
using System.IO;
using System.Data.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Microsoft.Data.Sqlite;

/// <summary>
/// Handles the configuration and management of MySQL database connections.
/// </summary>

namespace CSharpBackend
{
    public static class ConnectionHandler
    {
        private static string ConnectionString { get; }
        private static bool UsingSqlite { get; } = false;

        static ConnectionHandler()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            IConfigurationRoot configuration = builder.Build();

            configuration["UsingConnection"] = configuration["UsingConnection"]?.Trim();

            UsingSqlite = configuration["UsingConnection"] == "Sqlite";
            ConnectionString = UsingSqlite ? configuration.GetConnectionString("SqliteConnection") : configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrEmpty(ConnectionString))
            {
                throw new InvalidOperationException($"Connection string {ConnectionString} not found in appsettings.json.");
            }
        }

        public static T ExecuteDBEvent<T>(Func<DbConnection, T> action)
        {
            DbConnection connection = UsingSqlite ? (DbConnection)new SqliteConnection(ConnectionString) : new SqlConnection(ConnectionString);
            using (connection)
            {
                try
                {
                    // Open the connection
                    connection.Open();

                    // Execute the provided action, passing the open connection
                    return action(connection);
                }
                catch (SqlException ex)
                {
                    Console.WriteLine("A SQL error occurred while running a database action.");
                    Console.WriteLine($"Error message: {ex.Message}");
                    // The 'using' block handles the connection closure.
                    throw; // Re-throw the exception to let the caller handle it.
                }
                catch (Exception ex)
                {
                    Console.WriteLine("An unexpected error occurred while running a database action.");
                    Console.WriteLine($"Error message: {ex.Message}");
                    throw;
                }
            }
        }

        // Returns T (e.g., List<Storm>, int)
        public static T RunQuery<T>(Func<DbConnection, T> query)
        {
            return ExecuteDBEvent(query);
        }
        // Returns void (for INSERT, UPDATE, DELETE)
        public static void RunAction(Action<DbConnection> action)
        {
            ExecuteDBEvent((DbConnection connection) =>
            {
                action(connection);
                return true;
            });
        }
        /*
        /// <summary>
        /// Executes a given action with an open database connection.
        /// This method manages the connection lifecycle, ensuring it is opened
        /// and then properly closed, even if an exception occurs.
        /// </summary>
        /// <param name="action">A delegate that contains the database operations to perform.</param>
        public static T RunSqlAction<T>(Func<SqlConnection, T> action)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                try
                {
                    // Open the connection
                    connection.Open();

                    // Execute the provided action, passing the open connection
                    return action(connection);
                }
                catch (SqlException ex)
                {
                    Console.WriteLine("A SQL error occurred while running a database action.");
                    Console.WriteLine($"Error message: {ex.Message}");
                    // The 'using' block handles the connection closure.
                    throw; // Re-throw the exception to let the caller handle it.
                }
                catch (Exception ex)
                {
                    Console.WriteLine("An unexpected error occurred while running a database action.");
                    Console.WriteLine($"Error message: {ex.Message}");
                    throw;
                }
            }
        }*/
    }
}

