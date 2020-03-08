using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.Portal.Controllers
{
    public class PaymentController : Controller
    {
        public IActionResult Methods()
        {
            return View();
        }
    }
}