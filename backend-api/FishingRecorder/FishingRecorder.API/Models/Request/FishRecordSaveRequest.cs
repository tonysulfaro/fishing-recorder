using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishingRecorder.API.Models.Request
{
    public class FishRecordSaveRequest
    {
        public int UserId { get; set; }
        public string FishType { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public int? LengthInches { get; set; }
    }
}
