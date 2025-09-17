// This C# file creates a simple, information-serving API server
// using .NET's Minimal APIs.
// The server will run on http://localhost:5000 by default.
// It exposes a single GET endpoint that returns a JSON object.

// The `WebApplication.CreateBuilder` method sets up the host and
// configures the necessary services for a web server.
using MySql.Data.MySqlClient;
using System.Text.Json;
using System.IO;
using CSharpBackend;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin() // For development; restrict in production!
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// The builder is used to create the application instance.
var app = builder.Build();

app.UseCors();

app.UseHttpsRedirection();
app.UseStaticFiles(); // Enable serving static files
app.UseRouting();

/*app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);*/

// Defines the main API endpoint at "/api/data".
// This endpoint returns a new anonymous object, and .NET automatically
// serializes this object into a JSON response.
app.MapGet("/all+storm+info", () => QueryHandler.getAllStormInfo());

// Starts the web server and listens for incoming HTTP requests.
app.Run();


