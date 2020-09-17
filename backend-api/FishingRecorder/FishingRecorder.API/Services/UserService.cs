using System.Threading.Tasks;
using FishingRecorder.API.Interfaces;
using FishingRecorder.API.Models.Request;
using FishingRecorder.API.Models.Response;
using FishingRecorder.API.Utilities;

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
            var user = await _userRepository.GetUserByEmail(request.Email);

            if (user != null)
                return new AuthResponse() { 
                    Email = user.Email,
                    AccessToken = Utils.GenerateAccessToken(user),
                    RefeshToken = user.RefreshToken
                };
            return null;
        }

        public async Task<AuthResponse> Signup(SignupRequest request)
        {
            var user = await _userRepository.GetUserByEmail(request.Email);

            if (user == null)
            {
                var newUser = await _userRepository.CreateNewUser(request);
                return new AuthResponse()
                {
                    Email = user.Email,
                    AccessToken = Utils.GenerateAccessToken(newUser),
                    RefeshToken = user.RefreshToken
                };
            }

            return null;
        }
    }
}