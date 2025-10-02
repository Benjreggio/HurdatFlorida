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


app.MapGet("/all+storm+info", () => QueryHandler.getAllStormInfo());
app.MapGet("/storm+info/{pageNumber}+{pageSize}+{type}+{sortBy}+{ascending}", (int pageNumber, int pageSize, string type, string sortBy, bool ascending) => QueryHandler.getStormInfo(pageNumber, pageSize, type, sortBy, ascending));
app.MapGet("/test", () => "Hello World!");
app.MapGet("/storm+info/{pageNumber}+{pageSize}+{type}+{sortBy}+{ascending}/{searchterm}", (int pageNumber, int pageSize, string type, string sortBy, bool ascending, string searchterm) => QueryHandler.getStormInfoSearch(pageNumber, pageSize, type, sortBy, ascending,searchterm));
app.MapPost("/upload", (List<Storm> storms) =>
{
    NewDataUploader.UploadNewData(storms);
    return Results.Ok();
});
app.Run();