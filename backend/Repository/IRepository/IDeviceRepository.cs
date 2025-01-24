using backend.Models.DTO;

namespace backend.Repository.IRepository
{
    public interface IDeviceRepository
    {
        Task<string> Create(CreateDeviceDto createDeviceDto, CancellationToken ct);
        Task<string> Delete(string ipAddress, CancellationToken ct);
        Task<List<DeviceDto>> Get(CancellationToken ct);
        Task<List<DeviceMonthLogDto>> GetMonthlyLogData(CancellationToken ct);
        Task<List<DeviceNetworkDto>> GetNetStatusDevices(CancellationToken ct);
        Task<string> ResetDataOffline(CancellationToken ct);
        Task<string> UpdateDevice(string ipAddress, string contractName, string contractId, string address, string macAddress, string note, CancellationToken ct);
        Task<string> UpdateNetStatus(string ipAddress, string currentNetStatus, int timeOffline, List<string> log, CancellationToken ct);
    }
}