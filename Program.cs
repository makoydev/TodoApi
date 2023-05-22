using Microsoft.AspNetCore.SpaServices.Extensions;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<TodoContext>(opt => opt.UseInMemoryDatabase("TodoList"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyAllowSpecificOrigins",
        builder => builder.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("MyAllowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();

app.MapWhen(
    context => !context.Request.Path.StartsWithSegments("/api"),
    spa =>
    {
        spa.Run(async context =>
        {
            context.Response.Redirect("/app/index.html");
            await Task.FromResult(0);
        });
    });

app.MapWhen(
    context => !context.Request.Path.StartsWithSegments("/api"),
    spa =>
    {
        spa.UseSpa(spaBuilder =>
        {
            if (app.Environment.IsDevelopment())
            {
                spaBuilder.UseProxyToSpaDevelopmentServer("https://localhost:6363");
            }
        });
    });

app.Run();

