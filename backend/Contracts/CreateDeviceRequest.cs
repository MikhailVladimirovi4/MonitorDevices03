namespace backend.Contracts
{
    public record CreateDeviceRequest(
        string ContractName, 
        string ContractId, 
        string Address, 
        string IpAddress, 
        string MacAddress);
}
