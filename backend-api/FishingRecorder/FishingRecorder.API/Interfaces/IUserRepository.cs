using FishingRecorder.API.Models.Database;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FishingRecorder.API.Interfaces
{
    public interface IUserRepository
    {
        Task<ActionResult<List<User>>> GetAllUsers();
    }
}