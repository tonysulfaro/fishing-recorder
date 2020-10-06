using FishingRecorder.API.Interfaces;
using FishingRecorder.API.Models.Database;
using FishingRecorder.API.Models.Request;
using FishingRecorder.API.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace FishingRecorder.API.Repositories
{
    public class FishRepository : IFishRepository
    {
        public async Task<ActionResult<List<FishRecordResponse>>> GetAllRecords()
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            return await context.FishRecord
                .Select(r => new FishRecordResponse(r))
                .ToListAsync();
        }

        public async Task<ActionResult<int>> SaveFishRecord(FishRecordSaveRequest request)
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            var user = await GetUserFromToken(request.Token);

            if (user == null)
            {
                user = await SaveNewUserFromToken(request.Token);
            }

            var newRecord = new FishRecord()
            {
                UserId = user.UserId,
                FishType = request.FishType,
                Lat = request.Lat,
                Lon = request.Lon,
                LengthInches = request.LengthInches,
                WaterTemp = request.WaterTemp,
                Date = DateTime.UtcNow
            };

            await context.FishRecord.AddAsync(newRecord);
            await context.SaveChangesAsync();

            return newRecord.FishRecordId;
        }

        public async Task<ActionResult<List<FishRecordResponse>>> GetUserRecords(string token)
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            var user = await GetUserFromToken(token);

            if (user == null)
            {
                user = await SaveNewUserFromToken(token);
            }

            return await context.FishRecord
                .Where(u => u.UserId == user.UserId)
                .Select(r => new FishRecordResponse(r))
                .ToListAsync();
        }

        // helper methods
        public async Task<User> GetUserFromToken(string requestToken)
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(requestToken);
            var subject = token.Subject;

            var user = await context.User
                .Where(u => u.Auth0Id == subject)
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task<User> SaveNewUserFromToken(string requestToken)
        {
            await using FishingRecorderContext context = new FishingRecorderContext();

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(requestToken);
            var subject = token.Subject;

            var newUser = await context.User
                .AddAsync(new User { Auth0Id = subject });

            await context.SaveChangesAsync();

            return await GetUserFromToken(requestToken);
        }

       
    }
}
