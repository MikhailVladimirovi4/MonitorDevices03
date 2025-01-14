using backend.Models.DTO;

namespace backend.Repository.IRepository
{
    public interface IDeviceRepository
    {
        Task<string> Create(CreateDeviceDto createDeviceDto, CancellationToken ct);
        Task<string> Delete(string ipAddress, CancellationToken ct);
        Task<List<DeviceDto>> Get(CancellationToken ct);
        Task<string> Update(string ipAddress, string ContractName, string ContractId, string address, string macAddress, string note, CancellationToken ct);
        Task<Guid> AddLogEntry(Guid id, string text, CancellationToken ct);
    }
}
