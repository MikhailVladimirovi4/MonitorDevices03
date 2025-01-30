namespace backend.Models.DTO
{
    public record DeviceDto(
        Guid Id,
        DateTime CreateAt,
        string ContractName,
        string ContractId,
        string Address,
        string IpAddress,
        string MacAddress,
        string Note,
        string IsConnected,
        string TimeOffline
        );
}
