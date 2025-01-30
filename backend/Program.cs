using backend.Background;
using backend.DataAccess;
using backend.Repository;
using backend.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MonitorDbContext>(
    options =>
    {
    options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(MonitorDbContext)));
    }, ServiceLifetime.Singleton);

builder.Services.AddSingleton<IDeviceRepository, DeviceRepository>();
builder.Services.AddHostedService<NetStatus>();
builder.Services.AddHostedService<Archiving>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173");
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
