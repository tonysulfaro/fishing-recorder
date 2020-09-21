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
                .Include(r => r.FishType)
                .Select(r => new FishRecordResponse(r))
                .ToListAsync();
        }

        public async Task<ActionResult<List<FishTypeResponse>>> GetFishTypes()
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            return await context.FishType
                .Select(f => new FishTypeResponse(f))
                .ToListAsync();
        }

        public async Task<ActionResult<int>> SaveFishRecord(FishRecordSaveRequest request)
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            var newRecord = new FishRecord()
            {
                UserId = request.UserId,
                FishTypeId = request.FishTypeId,
                Lat = request.Lat,
                Lon = request.Lon
            };

            await context.FishRecord.AddAsync(newRecord);
            await context.SaveChangesAsync();

            return newRecord.FishRecordId;
        }
    }
}
