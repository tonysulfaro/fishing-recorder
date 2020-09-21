using FishingRecorder.API.Interfaces;
using FishingRecorder.API.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishingRecorder.API.Repositories
{
    public class UserRepository : IUserRepository
    {
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            return await context.User.ToListAsync();
        }
    }
}
