namespace backend.Models.DTO
{
    public record DeviceNetworkDto(
        string IpAddress,
        string IsConnected,
        int TimeOffline,
        List<string> Log
        );
}
