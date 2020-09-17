using System.Threading.Tasks;
using FishingRecorder.API.Interfaces;
using FishingRecorder.API.Models.Request;
using FishingRecorder.API.Models.Response;

namespace FishingRecorder.API.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        public async Task<AuthResponse> Login(LoginRequest request)
        {
            var user = await _userRepository.getUserByEmail(request.Email);
        }

        public async Task<AuthResponse> Signup(SignupRequest request)
        {
            var user = await _userRepository.getUserByEmail(request.Email);
        }
    }
}