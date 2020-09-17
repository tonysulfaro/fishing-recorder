using FishingRecorder.API.Interfaces;
using FishingRecorder.API.Models.Database;
using FishingRecorder.API.Models.Request;
using FishingRecorder.API.Utilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishingRecorder.API.Repositories
{
    public class UserRepository : IUserRepository
    {
        public async Task<Users> CreateNewUser(SignupRequest request)
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            var salt = Utils.GenerateSalt(50);

            var newUser = new Users() { 
                Email = request.Email,
                Hash = Utils.GenerateHash(request.Password+salt),
                Salt = salt,
                RefreshToken = Utils.GenerateSalt(50)
            };

            context.Users.Add(newUser);
            await context.SaveChangesAsync();

            return newUser;
        }

        public async Task<Users> GetUserByEmail(string email)
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            return await context.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
        }
    }
}
