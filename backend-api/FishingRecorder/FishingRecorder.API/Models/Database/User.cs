﻿using System;
using System.Collections.Generic;

namespace FishingRecorder.API.Models.Database
{
    public partial class User
    {
        public User()
        {
            FishRecord = new HashSet<FishRecord>();
        }

        public int UserId { get; set; }
        public string Auth0Id { get; set; }

        public virtual ICollection<FishRecord> FishRecord { get; set; }
    }
}
