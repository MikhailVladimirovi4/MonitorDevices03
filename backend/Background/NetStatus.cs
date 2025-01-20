using backend.DataAccess;
using backend.Models;
using backend.Models.DTO;
using backend.Repository;
using System.Net.NetworkInformation;

namespace backend.Background
{
    public class NetStatus : BackgroundService
    {
        private readonly int _waitMinutes = 1;
        private readonly TimeSpan _timeOut;
        private readonly DeviceRepository _deviceRepository;
        private List<DeviceNetworkDto> _devices;

        public NetStatus(DeviceRepository deviceRepository)
        {
            _deviceRepository = deviceRepository;
            _devices = new List<DeviceNetworkDto>();
            _timeOut = TimeSpan.FromMinutes(_waitMinutes);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            while (!stoppingToken.IsCancellationRequested)
            {
                //if (_deviceRepository.IsUpdateAccessDiveces)
                //{
                //    _devices.Clear();
                //    _devices = await UpdateNetAccessDevices(stoppingToken);
                //}

                //await RunCheck(stoppingToken);
                //await Task.Delay(_timeOut, stoppingToken);

                Console.WriteLine("Ping");
                await Task.Delay(1000);
            }
        }
        //private async Task<List<DeviceNetworkDto>> UpdateNetAccessDevices(CancellationToken stoppingToken)
        //{
        //    return await _deviceRepository.GetAccessDevices(stoppingToken);
        //}

        //private async Task RunCheck(CancellationToken stoppingToken)
        //{
        //    foreach (var device in _devices)
        //    {
        //        string currentNetStatus = GetNetStatus(device.IpAddress);
        //        int newTimeOffline = device.TimeOffline;
        //        List<string> newLog = device.Log;

        //        if (currentNetStatus == "offline")
        //            newTimeOffline += _waitMinutes;

        //        if (device.IsConnected != currentNetStatus)
        //            newLog.Add(DateTime.UtcNow.ToString() + ": устройтство " + currentNetStatus + ".");

        //        var a = await _deviceRepository.UpdateNetStatus(device.IpAddress, currentNetStatus, newTimeOffline, newLog, stoppingToken);
        //    }
        //}
        //private static string GetNetStatus(string host)
        //{
        //    int responseTime = 2000;

        //    try
        //    {
        //        Ping ping = new();
        //        PingReply ResultPing = ping.Send(host, responseTime);
        //        if (ResultPing.Status == IPStatus.Success)
        //            return "online";
        //        else
        //            return "offline";
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex);
        //    }

        //    return "offline";
        //}
    }
}
