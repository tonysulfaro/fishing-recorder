using System.Collections.Generic;

namespace FishingRecorder.API.Models.Database
{
    public partial class FishType
    {
        public FishType()
        {
            FishRecord = new HashSet<FishRecord>();
        }

        public int FishTypeId { get; set; }
        public string Type { get; set; }

        public virtual ICollection<FishRecord> FishRecord { get; set; }
    }
}
