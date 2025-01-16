using backend.Contracts;
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
        public async Task<ActionResult<List<GetDevicesResponse>>> Get(CancellationToken ct)
        {
            GetDevicesResponse response = new(await _devicesRepository.Get(ct));

            return Ok(response);
        }
    }
}
