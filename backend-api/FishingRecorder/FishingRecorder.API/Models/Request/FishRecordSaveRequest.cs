using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FishingRecorder.API.Models.Request
{
    public class FishRecordSaveRequest
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public string FishType { get; set; }
        [Required]
        public double Lat { get; set; }
        [Required]
        public double Lon { get; set; }
        [Required]
        public int? LengthInches { get; set; }
    }
}
