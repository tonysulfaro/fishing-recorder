using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishingRecorder.API.Models.Request
{
    public class FishRecordSaveRequest
    {
        public int UserId { get; set; }
        public int FishTypeId { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
    }
}
