using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Identity;

namespace AvsarGame.API.Base
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class APIControllerBase : ControllerBase
    {
        public Guid GetUser() {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "jti")?.Value;
            return new Guid(userId);
        }
    }
}