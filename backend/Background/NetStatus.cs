using backend.DataAccess;
using backend.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;
using System.Threading;

namespace backend.Background
{
    public class NetStatus : BackgroundService
    {
        private readonly MonitorDbContext _dbContext;
        private readonly TimeSpan _timeOut = TimeSpan.FromMinutes(15);

        public NetStatus(MonitorDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var devices = _dbContext.Devices
                    .Select(d => new DeviceDto(d.Id, d.CreateAt, d.LastUpdatedConnected, d.ContractName, d.ContractId, d.Address, d.IpAddress, d.MacAddress, d.Note, d.IsConnected, d.IsConnectedOld, d.Log))
                    .ToList();

                foreach (var device in devices)
                {
                    await _dbContext.Devices
                        .Where(d => d.IpAddress == device.IpAddress)
                        .ExecuteUpdateAsync(s => s
                        .SetProperty(d => d.IsConnected, d => GetNetStatus(device.IpAddress)));

                    await _dbContext.SaveChangesAsync(stoppingToken);
                }

                await Task.Delay(_timeOut, stoppingToken);
            }
        }
        private static string GetNetStatus(string host)
        {
            int responseTime = 2000;

            try
            {
                Ping ping = new();
                PingReply ResultPing = ping.Send(host, responseTime);
                if (ResultPing.Status == IPStatus.Success)
                    return "online";
                else
                    return "offline";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return "offline";
        }
    }
}
