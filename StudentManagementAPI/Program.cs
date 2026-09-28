using Microsoft.EntityFrameworkCore;
using StudentManagementAPI.Data;
using StudentManagementAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// Add Database Context
// ==========================================

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));


// ==========================================
// Add Controllers
// ==========================================

builder.Services.AddControllers();


// ==========================================
// Dependency Injection
// ==========================================

builder.Services.AddScoped<IStudentService, StudentService>();


// ==========================================
// Add CORS
// ==========================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


// ==========================================
// Add OpenAPI
// ==========================================

builder.Services.AddOpenApi();


// ==========================================
// Build Application
// ==========================================

var app = builder.Build();


// ==========================================
// OpenAPI + Swagger UI
// ==========================================

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint(
            "/openapi/v1.json",
            "Student Management API"
        );
    });
}


// ==========================================
// HTTP Pipeline
// ==========================================

app.UseHttpsRedirection();


// ==========================================
// Enable CORS
// ==========================================

app.UseCors("AllowReactApp");


app.UseAuthorization();


// ==========================================
// Map Controllers
// ==========================================

app.MapControllers();


// ==========================================
// Run Application
// ==========================================

app.Run();