﻿using backend.Models.DTO;
using backend.Repository.IRepository;

namespace backend.Background
{
    public class Archiving : BackgroundService
    {
        private readonly int _waitHour = 3;
        private readonly TimeSpan _timeOut;
        private readonly IDeviceRepository _deviceRepository;
        private List<DeviceMonthLogDto> _devices = new();
        private int _month;
        public Archiving(IDeviceRepository deviceRepository)
        {
            _deviceRepository = deviceRepository;
            _month = DateTime.Now.Month;
            _timeOut = TimeSpan.FromHours(_waitHour);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                if (_month != DateTime.Now.Month)
                {
                    _month = DateTime.Now.Month;
                    string path = @"C:\LogMonitor\MonitorDevices_arhiveOffline_" + _month + "." + DateTime.Now.Year + ".txt";
                    _devices = await _deviceRepository.GetMonthlyLogDataAsync(stoppingToken);
                    string[] data = new string[_devices.Count];

                    for (int i = 0; i < data.Length; i++)
                    {
                        data[i] = _devices[i].ContractName
                            + ", идентификатор: " + _devices[i].ContractId
                            + ", ip-адрес: " + _devices[i].IpAddress
                            + ", было не в сети: " + _devices[i].TimeOffline.ToString() + " минут.";
                    }

                    Console.WriteLine(await CreateArchiveFileAsync(path, data));
                    Console.WriteLine(await _deviceRepository.ResetDataOfflineAsync(stoppingToken));
                }
                await Task.Delay(_timeOut, stoppingToken);
            }
        }

        private static async Task<string> CreateArchiveFileAsync(string path, string[] data)
        {
            try
            {
                await File.WriteAllLinesAsync(path, data);

                return "Архив создан успешно";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
