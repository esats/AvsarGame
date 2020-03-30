using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using AvsarGame.Portal.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers {
    public class GameController : BaseAdminController {
        public IActionResult Index() {
            GamePageModel model =  new GamePageModel();
            model.Categories = JsonConvert.DeserializeObject<List<CategoryModel>>(UiRequestManager.Instance.Get("Category", "List"));
            model.Games = JsonConvert.DeserializeObject<List<GameModel>>(UiRequestManager.Instance.Get("Game", "List"));
            return View(model);
        }

        [HttpPost]
        public JsonResult Save(GameModel model) {
            try {
                if (model.Image != null) {
                    model.ImageUrl = FileManager.Instance.Save(model.Image);
                }
                var response = JsonConvert.DeserializeObject<Response<GameModel>>(UiRequestManager.Instance.Post("Game", "Save", JsonConvert.SerializeObject(model)));
            } catch (Exception e) {
                return Json(new{Success = false, Message = "Birşeyler ters gitti"});
            }

            return Json(new{Success = true, Message = "oldu işte "});
        }

        [HttpPost]
        public JsonResult Delete(Guid id) {
            try {
                var responseSaving = UiRequestManager.Instance.Post("Game", "Delete", JsonConvert.SerializeObject(id));
            } catch (Exception e) {
                return Json(new { Success = false });
            }

            return Json(new { Success = true });
        }

        [HttpGet]
        public ActionResult Update(Guid id)
        {
          GameModel model =
                    JsonConvert.DeserializeObject<GameModel>(UiRequestManager.Instance.Get(String.Format("Game/GetOne/{0}", id)));
            return View(model);
        }
    }
}