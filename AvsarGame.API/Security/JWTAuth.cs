﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.Entities.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AvsarGame.API.Security {
    public class JWTAuth {
        protected IConfiguration Configuration;

        public JWTAuth(IConfiguration configuration) {
            Configuration = configuration;
        }

        public string GenerateJwtToken(string email, ApplicationUser user, string role) {
            var claims = new List<Claim> {
                    new Claim(JwtRegisteredClaimNames.Sub, email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddHours(24);

            var token = new JwtSecurityToken(
                    Configuration["JwtIssuer"],
                    "",
                    claims,
                    expires: expires,
                    signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}