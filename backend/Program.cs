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
    options.UseNpgsql("Host=database;Database=MonitorDevices;Username=postgres;Password=47QUv7J6bR31");
    }, ServiceLifetime.Scoped);

builder.Services.AddSingleton<IDeviceRepository, DeviceRepository>();
builder.Services.AddHostedService<NetStatus>();
builder.Services.AddHostedService<Archiving>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

var app = builder.Build();

//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
