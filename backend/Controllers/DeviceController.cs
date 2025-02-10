using backend.Contracts;
using backend.Models;
using backend.Models.DTO;
using backend.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<List<GetDevicesResponse>>> GetAsync(CancellationToken ct)
        {
            GetDevicesResponse response = new(await _devicesRepository.GetAsync(ct));

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateDeviceRequest request, CancellationToken ct)
        {
            return Ok(await _devicesRepository.CreateAsync(new CreateDeviceDto(
                GetStringResult(request.ContractName),
                GetStringResult(request.ContractId),
                GetStringResult(request.Address),
                GetStringResult(request.IpAddress),
                GetStringResult(request.MacAddress)), ct));
        }

        [HttpPost("several")]
        public async Task<IActionResult> CreateDevicesAsync([FromBody] CreateDevicesRequest request, CancellationToken ct)
        {
            bool isResultOk = true;
            string resultErr = "Ошибки заполнения исходника устройств .txt в строках: ";

            for (int i = 0; i < request.DataDevices.Length; i++)
            {
                string[] dataDevice = request.DataDevices[i].Split(";");

                if (dataDevice.Length != 5)
                {
                    resultErr = resultErr + " " + (i + 1);
                    isResultOk = false;
                }
                else
                {
                    for (int j = 0; j < dataDevice.Length; j++)
                    {
                        await _devicesRepository.CreateAsync(new CreateDeviceDto(
                            dataDevice[0],
                            dataDevice[1],
                            dataDevice[2],
                            dataDevice[3],
                            dataDevice[4]), ct);
                    }
                }
            }

            if (isResultOk)
                return Ok("Устройства из файла добавлены ПОЛНОСТЬЮ");
            else
                return Ok(resultErr);
        }

        [HttpPut]
        public async Task<ActionResult<string>> UpdateAsync(string ipAddress, string contractName, string contractId, string address, string macAddress, string note, CancellationToken ct)
        {
            return Ok(await _devicesRepository.UpdateAsync(
                GetStringResult(ipAddress),
                GetStringResult(contractName),
                GetStringResult(contractId),
                GetStringResult(address),
                GetStringResult(macAddress),
                GetStringResult(note), ct));
        }

        [HttpDelete]
        public async Task<ActionResult<string>> DeleteAsync(string ipAddress, CancellationToken ct)
        {
            string result = await _devicesRepository.DeleteAsync(ipAddress, ct);

            return Ok(result);
        }

        [HttpGet("device_log")]
        public async Task<ActionResult<GetDeviceLogResponse>> GetDeviceLogAsync(string ipAddress, CancellationToken ct)
        {
            GetDeviceLogResponse response = new(await _devicesRepository.GetLogAsync(ipAddress, ct));

            return Ok(response);
        }

        [HttpPut("device_log")]
        public async Task<ActionResult<string>> ResetLogAsync(string ipAddress, CancellationToken ct)
        {
            string result = await _devicesRepository.ResetLogAsync(ipAddress, ct);

            return Ok(result);
        }

        private static string GetStringResult(string text)
        {
            if (text != "-")
                return text;

            return string.Empty;
        }
    }
}
