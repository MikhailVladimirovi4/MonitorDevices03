using backend.Models.DTO;
using backend.Repository.IRepository;
using System.Net.NetworkInformation;

namespace backend.Background
{
    public class NetStatus : BackgroundService
    {
        private readonly int _waitMinutes = 1;
        private readonly TimeSpan _timeOut;
        private readonly IDeviceRepository _deviceRepository;
        private List<DeviceNetworkDto> _devices;
        private bool _isWrite;

        public NetStatus(IDeviceRepository deviceRepository)
        {
            _deviceRepository = deviceRepository;
            _devices = new List<DeviceNetworkDto>();
            _timeOut = TimeSpan.FromMinutes(_waitMinutes);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            while (!stoppingToken.IsCancellationRequested)
            {
                _devices = await _deviceRepository.GetNetStatusAllDevices(stoppingToken);

                await RunCheck(stoppingToken);
                await Task.Delay(_timeOut, stoppingToken);
            }
        }

        private async Task RunCheck(CancellationToken stoppingToken)
        {
            foreach (var device in _devices)
            {
                int newTimeOffline = device.TimeOffline;
                List<string> newLog = device.Log;
                _isWrite = false;

                string currentNetStatus = await GetNetStatusAsync(device.IpAddress);

                if (currentNetStatus == "offline")
                {
                    newTimeOffline += _waitMinutes;
                    _isWrite = true;
                }

                if (device.IsConnected != currentNetStatus)
                {
                    newLog.Add(DateTime.Now.ToString() + ": устройтство " + currentNetStatus + ".");
                    _isWrite = true;
                }

                if (_isWrite)
                {
                    await _deviceRepository.UpdateNetStatus(device.IpAddress, currentNetStatus, newTimeOffline, newLog, stoppingToken);
                }
            }
        }
        private static async Task<string> GetNetStatusAsync(string host)
        {
            int responseTime = 2000;

            try
            {
                Console.WriteLine("PING ip-address: " + host);

                Ping ping = new();
                PingReply ResultPing = await ping.SendPingAsync(host, responseTime);
                if (ResultPing.Status == IPStatus.Success)
                    return "online";
                else
                    return "offline";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                Console.WriteLine("Ошибка проверки статуса сети ip-address: " + host);
            }

            return "offline";
        }
    }
}
