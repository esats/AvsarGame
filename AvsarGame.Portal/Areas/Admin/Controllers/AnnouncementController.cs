using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers
{
    public class AnnouncementController : BaseAdminController
    {
        public IActionResult Index() {
            var response = JsonConvert.DeserializeObject<List<AnnouncementModel>>(UiRequestManager.Instance.Get("Announcement", "List"));
            return View(response);
        }

        [HttpPost]
        public JsonResult Save(AnnouncementModel model) {
            try {
                if (model.Image != null) {
                    model.ImageUrl = FileManager.Instance.Save(model.Image);
                }
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("Announcement", "Save", JsonConvert.SerializeObject(model)));
                return Json(response);
            } catch (Exception e) {
                return Json(new{Success = false, Message = "Birşeyler ters gitti"});
            }

        }

        [HttpPost]
        public JsonResult Delete(Guid id) {
            try {
                var responseSaving = UiRequestManager.Instance.Post("Announcement", "Delete", JsonConvert.SerializeObject(id));
            } catch (Exception e) {
                return Json(new { Success = false });
            }

            return Json(new { Success = true });
        }
    }
}