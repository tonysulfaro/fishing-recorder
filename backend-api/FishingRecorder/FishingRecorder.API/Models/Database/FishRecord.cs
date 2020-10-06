﻿using System;
using System.Collections.Generic;

namespace FishingRecorder.API.Models.Database
{
    public partial class FishRecord
    {
        public int FishRecordId { get; set; }
        public int UserId { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public DateTime? Date { get; set; }
        public int? LengthInches { get; set; }
        public string FishType { get; set; }
        public int? WaterTemp { get; set; }

        public virtual User User { get; set; }
    }
}
