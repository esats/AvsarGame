using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers {
    public class GameController : BaseAdminController {
        public IActionResult Index() {
            return View();
        }

        [HttpPost]
        public JsonResult Save(GameModel model) {
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