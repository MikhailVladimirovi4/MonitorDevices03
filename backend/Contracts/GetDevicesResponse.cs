using backend.Models.DTO;

namespace backend.Contracts
{
    public record GetDevicesResponse(List<DeviceDto> Devices);
}
