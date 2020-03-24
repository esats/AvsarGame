using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Identity;

namespace AvsarGame.API.Base {
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class APIControllerBase : ControllerBase {
        [HttpGet]
        [ApiExplorerSettings(IgnoreApi = true)]
        public string GetUser() {
            var userId = HttpContext.User.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier).ToList()[1]?.Value;
            userId = userId == null ? "ebf4e0f2-4734-4ca0-be7b-0a5b5a1e2cbc" : userId;
            return userId;
        }
    }
}