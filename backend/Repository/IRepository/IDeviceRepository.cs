using backend.Models.DTO;

namespace backend.Repository.IRepository
{
    public interface IDeviceRepository
    {
        Task<string> CreateAsync(CreateDeviceDto createDeviceDto, CancellationToken ct);
        Task<string> DeleteAsync(string ipAddress, CancellationToken ct);
        Task<List<DeviceDto>> GetAsync(CancellationToken ct);
        Task<DeviceLogDto> GetLogAsync(string ipAddress, CancellationToken ct);
        Task<List<DeviceMonthLogDto>> GetMonthlyLogDataAsync(CancellationToken ct);
        Task<List<DeviceNetworkDto>> GetNetStatusAllDevicesAsync(CancellationToken ct);
        Task<string> ResetDataOfflineAsync(CancellationToken ct);
        Task<string> UpdateAsync(string ipAddress, string contractName, string contractId, string address, string macAddress, string note, CancellationToken ct);
        Task<string> UpdateNetStatusAsync(string ipAddress, string currentNetStatus, int timeOffline, List<string> log, CancellationToken ct);
        Task<string> ResetLogAsync(string ipAddress, CancellationToken ct);
    }
}