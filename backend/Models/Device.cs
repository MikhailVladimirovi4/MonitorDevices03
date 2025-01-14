using static System.Net.Mime.MediaTypeNames;

namespace backend.Models
{
    public class Device(string contractName, string contractId, string address, string ipAddress, string macAddress)
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public DateTime CreateAt { get; init; } = DateTime.UtcNow;
        public DateTime LastUpdatedConnected { get; init; } = DateTime.UtcNow;
        public string ContractName { get; init; } = contractName;
        public string ContractId { get; init; } = contractId;
        public string Address { get; init; } = address;
        public string IpAddress { get; init; } = ipAddress;
        public string MacAddress { get; init; } = macAddress;
        public string Note { get; init; } = string.Empty;
        public string IsConnected { get; init; } = string.Empty;
        public string IsConnectedOld { get; init; } = string.Empty;
        public string PercentageOffline { get; init; } = string.Empty;
        public List<string> Log { get; private set; } = new List<string>();

        public string AddLog(string text)
        {
            try
            {
                Log.Add(text);
                return "recording successful";
            }
            catch
            {
                return "recording failed";
            }
        }

        public string RemoveLog()
        {
            try
            {
                Log.Clear();
                return "deleting records successfully";
            }
            catch
            {
                return "deleting records failed";
            }
        }
    }
}
