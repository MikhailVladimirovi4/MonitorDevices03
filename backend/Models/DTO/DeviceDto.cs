namespace backend.Models.DTO
{
    public record DeviceDto(
        Guid Id,
        DateTime CreateAt,
        DateTime LastUpdatedConnected,
        string ContractName,
        string ContractId,
        string Address,
        string IpAddress,
        string MacAddress,
        string Note,
        string IsConnected,
        string IsConnectedOld,
        string PercentageOffline,
        List<string> Log
        );
}
