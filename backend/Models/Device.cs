namespace backend.Models
{
    public class Device(string contractName, string contractId, string address, string ipAddress, string macAddress)
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public DateTime CreateAt { get; init; } = DateTime.Now;
        public string ContractName { get; init; } = contractName;
        public string ContractId { get; init; } = contractId;
        public string Address { get; init; } = address;
        public string IpAddress { get; init; } = ipAddress;
        public string MacAddress { get; init; } = macAddress;
        public string Note { get; init; } = string.Empty;
        public string IsConnected { get; init; } = "offline";
        public int TimeOffline { get; init; } = 0;
        public List<string> Log { get; init; } = new List<string>();
    }
}
