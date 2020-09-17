namespace FishingRecorder.API.Models.Response
{
    public class AuthResponse
    {
        public string Email { get; set; }
        public string AccessToken { get; set; }
        public string RefeshToken { get; set; }
    }
}