using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.Portal.Core
{
    [Area("Admin")]
    //[ServiceFilter(typeof(LoginFilter))]
    public class BaseAdminController : Controller {
        //protected string UserName => HttpContext.Request.Headers.ContentLength;
    }
}