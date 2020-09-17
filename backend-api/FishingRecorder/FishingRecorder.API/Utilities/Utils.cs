using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using FishingRecorder.API.Models.Database;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace FishingRecorder.API.Utilities {
    public class Utils {

        public static string GenerateSalt(int SaltByteLength) {
            RNGCryptoServiceProvider rncCsp = new RNGCryptoServiceProvider();
            byte[] salt = new byte[SaltByteLength];
            rncCsp.GetBytes(salt);

            // Convert byte array to a string   
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < salt.Length; i++) {
                builder.Append(salt[i].ToString("x2"));
            }
            return builder.ToString();
        }

        public static string GenerateHash(string ThingToHash) {
            using SHA256 mySHA256 = SHA256.Create();
            byte[] bytes = mySHA256.ComputeHash(Encoding.UTF8.GetBytes(ThingToHash));

            // Convert byte array to a string   
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++) {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString();
        }

        public static string GenerateAccessToken(Users employee)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret_sauce_subject_to_change"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, employee.Email)
            };

            var token = new JwtSecurityToken(
                issuer: "some_entity",
                audience: "some_entity",
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedToken;
        }
    }
}
