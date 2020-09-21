﻿using FishingRecorder.API.Models.Database;
using FishingRecorder.API.Models.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishingRecorder.API.Interfaces
{
    public interface IFishRepository
    {
        Task<ActionResult<List<FishTypeResponse>>> GetFishTypes();
    }
}
