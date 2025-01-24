namespace backend.Models.DTO
{
    public record DeviceMonthLogDto(
        string ContractName,
        string ContractId,
        string IpAddress,
        int TimeOffline
        );
}
