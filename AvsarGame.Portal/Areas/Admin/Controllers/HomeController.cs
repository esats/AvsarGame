using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.Portal.Core;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.Portal.Areas.Admin.Controllers
{   
    [Area("Admin")]
    public class HomeController : BaseAdminController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}