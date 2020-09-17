using System.Threading.Tasks;
using FishingRecorder.API.Interfaces;
using FishingRecorder.API.Models.Request;
using FishingRecorder.API.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace FishingRecorder.API.Controllers
{
    public class UsersController:ControllerBase
    {
        private readonly IUserService _userService;
        
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signup")]
        public async Task<ActionResult<AuthResponse>> Signup(SignupRequest request)
        {
            var result = await _userService.Signup(request);

            if (result == null)
                return BadRequest("Signup Failed.");
            return Ok(result);
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
        {
            var result = await _userService.Login(request);

            if (result == null)
                return BadRequest("Login Failed.");
            return Ok(result);
        }
    }
}