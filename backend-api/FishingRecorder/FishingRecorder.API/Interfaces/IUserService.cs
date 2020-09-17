using System.Threading.Tasks;
using FishingRecorder.API.Models.Request;
using FishingRecorder.API.Models.Response;

namespace FishingRecorder.API.Interfaces
{
    public interface IUserService
    {
        Task<AuthResponse> Login(LoginRequest request);
        Task<AuthResponse> Signup(SignupRequest request);
    }
}