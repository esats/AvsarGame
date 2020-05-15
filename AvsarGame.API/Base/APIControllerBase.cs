using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Identity;

namespace AvsarGame.API.Base {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class APIControllerBase : ControllerBase {
        [HttpGet]
        [ApiExplorerSettings(IgnoreApi = true)]
        public string GetUser() {
            var userId = HttpContext.User.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier).ToList()[1]?.Value;
            return userId;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public static string GetDescription<T>(T enumValue) 
                where T : struct, IConvertible
        {
            if (!typeof(T).IsEnum)
                return null;

            var description = enumValue.ToString();
            var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

            if (fieldInfo != null)
            {
                var attrs = fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), true);
                if (attrs != null && attrs.Length > 0)
                {
                    description = ((DescriptionAttribute)attrs[0]).Description;
                }
            }

            return description;
        }
    }
}