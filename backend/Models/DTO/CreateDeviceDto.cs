namespace backend.Models.DTO
{
    public record CreateDeviceDto(
        string ContractName,
        string ContractId,
        string Address,
        string IpAddress,
        string MacAddress
    );
}
