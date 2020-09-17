using System.ComponentModel.DataAnnotations;

namespace FishingRecorder.API.Models.Request
{
    public class LoginRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}