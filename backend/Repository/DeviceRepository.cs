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

        }

        public async Task<string> Delete(string ipAddress, CancellationToken ct)
        {

        }

        public async Task<List<DeviceDto>> Get(CancellationToken ct)
        {
            var devices = await _dbContext.Devices
            .Select(d => new DeviceDto(d.Id, d.CreateAt, d.LastUpdatedConnected, d.ContractId, d.Address, d.IpAddress, d.MacAddress, d.Note, d.IsConnected, d.IsConnectedOld, d.PercentageOffline, d.Log)).ToListAsync(ct);

            return devices;
        }

        public async Task<string> Update(string ipAddress, string ContractId, string address, string macAddress, string note, CancellationToken ct)
        {

        }

        public async Task<Guid> AddLogEntry(Guid id, string text, CancellationToken ct)
        {

        }

        public async Task<Guid> UpdateConected(Guid id, CancellationToken ct)
        {

        }
    }
}
