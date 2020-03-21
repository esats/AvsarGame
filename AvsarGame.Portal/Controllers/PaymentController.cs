using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.Portal.Core;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.Portal.Controllers
{
    public class PaymentController : BaseController
    {
        public IActionResult Methods()
        {
            return View();
        }
    }
}