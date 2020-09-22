using FishingRecorder.API.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishingRecorder.API.Models.Response
{
    public class FishRecordResponse
    {
        public FishRecordResponse(FishRecord r)
        {
            FishRecordId = r.FishRecordId;
            UserId = r.UserId;
            FishType = r.FishType;
            Lat = r.Lat;
            Lon = r.Lon;
            Date = r.Date;
            LengthInches = r.LengthInches;
        }
        public int FishRecordId { get; set; }
        public int UserId { get; set; }
        public string FishType { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public DateTime? Date { get; set; }
        public int? LengthInches { get; set; }
    }
}
