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
            FishTypeId = r.FishTypeId;
            Lat = r.Lat;
            Lon = r.Lon;
            Date = r.Date;
            FishType = new FishTypeResponse(r.FishType);
        }
        public int FishRecordId { get; set; }
        public int UserId { get; set; }
        public int FishTypeId { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public DateTime? Date { get; set; }
        public FishTypeResponse FishType { get; set; }
    }
}
