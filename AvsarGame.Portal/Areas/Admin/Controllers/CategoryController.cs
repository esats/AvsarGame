using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers {
    [Area("Admin")]
    [ServiceFilter(typeof(LoginFilter))]
    public class CategoryController : BaseController {
        public IActionResult Index() {
            var response = JsonConvert.DeserializeObject<List<CategoryModel>>(UiRequestManager.Instance.Get("Category", "List"));
            return View(response);
        }

        [HttpPost]
        public ActionResult Save(CategoryModel model) {
            try {
                model.ImageUrl = FileManager.Instance.Save(model.Image);
                var response = UiRequestManager.Instance.Post("Category", "Save", JsonConvert.SerializeObject(model));
            } catch (Exception e) {
                return StatusCode(500);
            }

            return RedirectToAction("Index");
        }

        //[HttpPost]
        //public async Task<JsonResult> Delete(Guid id) {

        //    return Json(new { Message = responseSaving.Message, Success = responseSaving.IsSuccess });
        //}
    }
}