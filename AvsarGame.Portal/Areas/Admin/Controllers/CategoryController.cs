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
        public JsonResult Save(CategoryModel model) {
            try {
                if (model.Image != null) {
                    model.ImageUrl = FileManager.Instance.Save(model.Image);
                }
                var response = UiRequestManager.Instance.Post("Category", "Save", JsonConvert.SerializeObject(model));
            } catch (Exception e) {
                return Json(new{Success = false, Message = "Birşeyler ters gitti"});
            }

            return Json(new{Success = true, Message = "oldu işte "});
        }

        [HttpPost]
        public JsonResult Delete(Guid id) {
            try {
                var responseSaving = UiRequestManager.Instance.Post("Category", "Delete", JsonConvert.SerializeObject(id));
            } catch (Exception e) {
                return Json(new { Success = false });
            }

            return Json(new { Success = true });
        }
    }
}