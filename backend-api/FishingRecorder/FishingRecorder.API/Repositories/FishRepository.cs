using FishingRecorder.API.Interfaces;
using FishingRecorder.API.Models.Database;
using FishingRecorder.API.Models.Request;
using FishingRecorder.API.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishingRecorder.API.Repositories
{
    public class FishRepository : IFishRepository
    {
        public async Task<ActionResult<List<FishRecordResponse>>> GetAllRecords()
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            return await context.FishRecord
                .Select(r => new FishRecordResponse(r))
                .ToListAsync();
        }

        public async Task<ActionResult<int>> SaveFishRecord(FishRecordSaveRequest request)
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            var newRecord = new FishRecord()
            {
                UserId = request.UserId,
                FishType = request.FishType,
                Lat = request.Lat,
                Lon = request.Lon,
                LengthInches = request.LengthInches,
                Date = DateTime.UtcNow
            };

            await context.FishRecord.AddAsync(newRecord);
            await context.SaveChangesAsync();

            return newRecord.FishRecordId;
        }
    }
}
