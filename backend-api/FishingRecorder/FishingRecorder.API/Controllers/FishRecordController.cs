using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FishingRecorder.API.Interfaces;
using FishingRecorder.API.Models.Database;
using FishingRecorder.API.Models.Request;
using FishingRecorder.API.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FishingRecorder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FishRecordController : ControllerBase
    {
        private readonly IFishRepository _fishRepository;

        public FishRecordController(IFishRepository fishRepository)
        {
            _fishRepository = fishRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<FishRecordResponse>>> GetAllRecords()
        {
            return await _fishRepository.GetAllRecords();
        }

        [HttpPost("save")]
        public async Task<ActionResult<int>> SaveFishRecord(FishRecordSaveRequest request)
        {
            return await _fishRepository.SaveFishRecord(request);
        }

    }
}
