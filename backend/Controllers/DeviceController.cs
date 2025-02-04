using backend.Contracts;
using backend.Models.DTO;
using backend.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly IDeviceRepository _devicesRepository;

        public DeviceController(IDeviceRepository devicesRepository)
        {
            _devicesRepository = devicesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetDevicesResponse>>> Get(CancellationToken ct)
        {
            GetDevicesResponse response = new(await _devicesRepository.Get(ct));

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDeviceRequest request, CancellationToken ct)
        {
            return Ok(await _devicesRepository.Create(new CreateDeviceDto(request.ContractName, request.ContractId, request.Address, request.IpAddress, request.MacAddress), ct));
        }

        [HttpPut]
        public async Task<ActionResult<string>> Update(string ipAddress, string contractName, string contractId, string address, string macAddress, string note, CancellationToken ct)
        {
            string result = await _devicesRepository.UpdateDevice(GetStringResult(ipAddress), GetStringResult(contractName), GetStringResult(contractId), GetStringResult(address), GetStringResult(macAddress), GetStringResult(note), ct);

            return Ok(result);
        }

        [HttpDelete]
        public async Task<ActionResult<string>> Delete(string ipAddress, CancellationToken ct)
        {
            string result = await _devicesRepository.Delete(ipAddress, ct);

            return Ok(result);
        }

        [HttpGet("device_log")]
        public async Task<ActionResult<GetDeviceLogResponse>> GetDeviceLog(string ipAddress, CancellationToken ct)
        {
            GetDeviceLogResponse response = new(await _devicesRepository.GetDeviceLog(ipAddress, ct));

            return Ok(response);
        }

        private string GetStringResult(string text)
        {
            if (text != "-")
                return text;

            return string.Empty;
        }
    }
}
