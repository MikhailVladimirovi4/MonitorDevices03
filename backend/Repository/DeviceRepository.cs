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

        public async Task<string> Create(CreateDeviceDto createDeviceDto, CancellationToken ct)
        {
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
                result = "Error: в таблице имеется устройство с ip адресом: " + createDeviceDto.IpAddress + ".";
            }

            return result;
        }

        public async Task<string> Delete(string ipAddress, CancellationToken ct)
        {
            await _dbContext.Devices
                .Where(d => d.IpAddress == ipAddress)
                .ExecuteDeleteAsync(ct);

            await _dbContext.SaveChangesAsync(ct);

            return "Запись " + ipAddress + " удалена.";
        }

        public async Task<List<DeviceDto>> Get(CancellationToken ct)
        {
            var devices = await _dbContext.Devices
            .Select(d => new DeviceDto(d.Id, d.CreateAt, d.LastUpdatedConnected, d.ContractName, d.ContractId, d.Address, d.IpAddress, d.MacAddress, d.Note, d.IsConnected, d.IsConnectedOld, d.Log))
            .AsNoTracking()
            .ToListAsync(ct);

            return devices;
        }

        public async Task<string> Update(string ipAddress, string contractName, string contractId, string address, string macAddress, string note, CancellationToken ct)
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

        public async Task<Guid> AddLogEntry(Guid id, string text, CancellationToken ct)
        {
            await _dbContext.Devices
               .Where(d => d.Id == id).ExecuteUpdateAsync(s => s
               .SetProperty(d => d.AddLog(text), d => text), ct);

            await _dbContext.SaveChangesAsync(ct);

            return id;
        }
    }
}
