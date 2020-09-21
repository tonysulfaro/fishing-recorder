using FishingRecorder.API.Interfaces;
using FishingRecorder.API.Models.Database;
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
        public async Task<ActionResult<List<FishType>>> GetFishTypes()
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            return await context.FishType.ToListAsync();
        }
    }
}
