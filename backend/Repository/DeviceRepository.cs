using backend.Models;
using backend.Models.DTO;
using backend.DataAccess;
using backend.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class DeviceRepository : IDeviceRepository
    {
        private readonly MonitorDbContext _dbContext;

        public DeviceRepository(MonitorDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> CreateAsync(CreateDeviceDto createDeviceDto, CancellationToken ct)
        {
            if (createDeviceDto.IpAddress == string.Empty)
                return "Для внесения устройства на мониторинг необходимо ввести ip-адрес";

            string result;
            bool isIpAddressUse = false;

            foreach (Device d in _dbContext.Devices)
            {
                if (d.IpAddress == createDeviceDto.IpAddress)
                {
                    isIpAddressUse = true;
                    break;
                }
            };

            if (!isIpAddressUse)
            {
                Device device = new(createDeviceDto.ContractName, createDeviceDto.ContractId, createDeviceDto.Address, createDeviceDto.IpAddress, createDeviceDto.MacAddress);

                await _dbContext.Devices.AddAsync(device, ct);
                await _dbContext.SaveChangesAsync(ct);

                result = "Устройство с ip адресом: " + createDeviceDto.IpAddress + " создано.";
            }
            else
            {
                result = "Error: в таблице имеется устройство с ip-адресом: " + createDeviceDto.IpAddress + ".";
            }

            return result;
        }

        public async Task<string> DeleteAsync(string ipAddress, CancellationToken ct)
        {
            await _dbContext.Devices
                .Where(d => d.IpAddress == ipAddress)
                .ExecuteDeleteAsync(ct);

            await _dbContext.SaveChangesAsync(ct);

            return "Запись " + ipAddress + " удалена.";
        }

        public async Task<List<DeviceDto>> GetAsync(CancellationToken ct)
        {
            var devices = await _dbContext.Devices
            .Select(d => new DeviceDto(d.Id, d.CreateAt, d.ContractName, d.ContractId, d.Address, d.IpAddress, d.MacAddress, d.Note, d.IsConnected, d.TimeOffline.ToString()))
            .AsNoTracking()
            .ToListAsync(ct);

            return devices;
        }

        public async Task<string> UpdateAsync(string ipAddress, string contractName, string contractId, string address, string macAddress, string note, CancellationToken ct)
        {
            await _dbContext.Devices
                .Where(d => d.IpAddress == ipAddress).ExecuteUpdateAsync(s => s
                .SetProperty(d => d.ContractName, d => contractName)
                .SetProperty(d => d.ContractId, d => contractId)
                .SetProperty(d => d.Address, d => address)
                .SetProperty(d => d.MacAddress, d => macAddress)
                .SetProperty(d => d.Note, note), ct);

            await _dbContext.SaveChangesAsync(ct);

            return "Данные устройтсва с ip-адресом: " + ipAddress + " изменены.";
        }

        public async Task<List<DeviceNetworkDto>> GetNetStatusAllDevicesAsync(CancellationToken ct)
        {
            var devices = await _dbContext.Devices
                .Select(d => new DeviceNetworkDto(d.IpAddress, d.IsConnected, d.TimeOffline, d.Log))
                .AsNoTracking()
                .ToListAsync(ct);

            return devices;
        }

        public async Task<string> UpdateNetStatusAsync(string ipAddress, string currentNetStatus, int timeOffline, List<string> log, CancellationToken ct)
        {
            await _dbContext.Devices
                .Where(d => d.IpAddress == ipAddress).ExecuteUpdateAsync(s => s
                .SetProperty(d => d.IsConnected, d => currentNetStatus)
                .SetProperty(d => d.TimeOffline, d => timeOffline)
                .SetProperty(d => d.Log, d => log), ct);

            await _dbContext.SaveChangesAsync(ct);

            return ipAddress;
        }

        public async Task<List<DeviceMonthLogDto>> GetMonthlyLogDataAsync(CancellationToken ct)
        {
            var devices = await _dbContext.Devices
                .Select(d => new DeviceMonthLogDto(d.ContractName, d.ContractId, d.IpAddress, d.TimeOffline))
                .AsNoTracking()
                .ToListAsync(ct);
         
            return devices;
        }

        public async Task<DeviceLogDto> GetLogAsync(string ipAddress, CancellationToken ct)
        {
            List<DeviceLogDto> log = await _dbContext.Devices
                .Where(d => d.IpAddress == ipAddress).Select(l => new DeviceLogDto(l.Log)).ToListAsync(ct);

            return log[0];
        }

        public async Task<string> ResetDataOfflineAsync(CancellationToken ct)
        {
            await _dbContext.Devices.ExecuteUpdateAsync(s => s
                .SetProperty(d => d.TimeOffline, d => 0));

            await _dbContext.SaveChangesAsync(ct);

            return "Счетчик минут недоступности сброшен";
        }

        public async Task<string> ResetLogAsync(string ipAddress, CancellationToken ct)
        {
            string result;

            try
            {
                await _dbContext.Devices
                .Where(d => d.IpAddress == ipAddress).ExecuteUpdateAsync(s => s
                .SetProperty(d => d.Log, d => new List<string>()), ct);

                await _dbContext.SaveChangesAsync(ct);

                result = "История изменений состояния сети для ip-адреса: " + ipAddress + " удалена.";
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            return result;
        }
    }
}
