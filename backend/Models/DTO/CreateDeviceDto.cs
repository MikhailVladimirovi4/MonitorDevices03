namespace backend.Models.DTO
{
    public record CreateDeviceDto(
        string ContractId,
        string Address,
        string IpAddress,
        string MacAddress
    );
}
