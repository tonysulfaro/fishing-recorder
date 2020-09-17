using System;
using System.Collections.Generic;

namespace FishingRecorder.API.Models.Database
{
    public partial class Users
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Hash { get; set; }
        public string Salt { get; set; }
        public string RefreshToken { get; set; }
    }
}
