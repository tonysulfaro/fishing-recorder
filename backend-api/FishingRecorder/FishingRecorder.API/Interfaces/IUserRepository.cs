using FishingRecorder.API.Models.Database;
using FishingRecorder.API.Models.Request;
using System.Threading.Tasks;

namespace FishingRecorder.API.Interfaces
{
    public interface IUserRepository
    {
        Task<Users> GetUserByEmail(string email);
        Task<Users> CreateNewUser(SignupRequest request);
    }
}