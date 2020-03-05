using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers
{
    [Route("api/Home")]
    [ApiController]
    [Authorize]
    public class HomeController : APIControllerBase
    {
        [HttpGet]
        public string Get() {
            return "geldim ben";
        }
    }
}