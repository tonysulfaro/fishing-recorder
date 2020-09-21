using FishingRecorder.API.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishingRecorder.API.Models.Response
{
    public class FishTypeResponse
    {
        public FishTypeResponse(FishType f)
        {
            FishTypeId = f.FishTypeId;
            Type = f.Type;
        }

        public int FishTypeId { get; set; }
        public string Type { get; set; }
    }
}
