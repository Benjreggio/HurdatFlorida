using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;

/// <summary>
/// Handles the configuration and management of MySQL database connections.
/// </summary>

namespace CSharpBackend
{
    public static class ConnectionHandler
    {
        private static string ConnectionString { get; }

        static ConnectionHandler()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            IConfigurationRoot configuration = builder.Build();

            ConnectionString = configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrEmpty(ConnectionString))
            {
                throw new InvalidOperationException("Connection string 'DefaultConnection' not found in appsettings.json.");
            }
        }

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
        }
    }
}

