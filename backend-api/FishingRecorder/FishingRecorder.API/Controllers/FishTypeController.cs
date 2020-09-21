using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FishingRecorder.API.Interfaces;
using FishingRecorder.API.Models.Database;
using FishingRecorder.API.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FishingRecorder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FishTypeController : ControllerBase
    {
        private readonly IFishRepository _fishRepository;

        public FishTypeController(IFishRepository fishRepository)
        {
            _fishRepository = fishRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<FishTypeResponse>>> GetFishTypes()
        {
            return await _fishRepository.GetFishTypes();
        }
    }
}
