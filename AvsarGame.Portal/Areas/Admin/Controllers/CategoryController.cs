using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.Portal.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class CategoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public ActionResult Save(Guid? Id) {
            return View();
        }

        [HttpPost]
        public ActionResult Save(CategoryModel model) {
            return View();
        }
    }
}