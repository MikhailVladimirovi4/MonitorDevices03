using backend.Models.DTO;
using backend.Repository.IRepository;

namespace backend.Background
{
    public class Archiving : BackgroundService
    {
        private readonly int _waitDay = 1;
        private readonly TimeSpan _timeOut;
        private readonly IDeviceRepository _deviceRepository;
        private List<DeviceMonthLogDto> _devices;
        private int _month;
        public Archiving(IDeviceRepository deviceRepository)
        {
            _deviceRepository = deviceRepository;
            _devices = new List<DeviceMonthLogDto>();
            _month = DateTime.Now.Month;
            _timeOut = TimeSpan.FromDays(_waitDay);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                if (_month != DateTime.Now.Month)
                {
                    _month = DateTime.Now.Month;
                    string path = @"C:\ArhMonDevices\arhiveOffline_" + _month + "." + DateTime.Now.Year + ".txt";
                    _devices = await _deviceRepository.GetMonthlyLogData(stoppingToken);
                    string[] data = new string[_devices.Count];

                    for (int i = 0; i < data.Length; i++)
                    {
                        data[i] = _devices[i].ContractName
                            + ", идентификатор: " + _devices[i].ContractId
                            + ", размещение: " + _devices[i].IpAddress
                            + ", не в сети: " + _devices[i].TimeOffline.ToString() + " минут.";
                    }

                    await CreateArchiveFile(path, data);
                    Console.WriteLine(_deviceRepository.ResetDataOffline(stoppingToken));
                }
                await Task.Delay(_timeOut, stoppingToken);
            }
        }

        private static async Task<string> CreateArchiveFile(string path, string[] data)
        {
            try
            {
                Console.WriteLine("Создали успешно");
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
