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
            _month = -1;
            _timeOut = TimeSpan.FromMinutes(_waitDay);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                Console.WriteLine(" сервис Архивирование");
                if (_month != DateTime.Now.Month)
                {
                    Console.WriteLine("Архивирование");
                    _month = DateTime.Now.Month;
                    string path = @"C:\\ArhMonDevices\\actors.txt\";
                    _devices = await _deviceRepository.GetMonthlyLogData(stoppingToken);
                    string[] data = new string[_devices.Count];

                    for (int i = 0; i < data.Length; i++)
                    {
                        data[i] = _devices[i].ContractName 
                            + ", " + _devices[i].ContractId 
                            + ", " + _devices[i].IpAddress 
                            + ", не в сети: " + _devices[i].TimeOffline.ToString() + ", минут.";
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
                await System.IO.File.WriteAllLinesAsync(path, data);

                return "Архив создан успешно";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
