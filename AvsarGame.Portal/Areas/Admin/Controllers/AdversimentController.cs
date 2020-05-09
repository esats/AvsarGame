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
    public class AdversimentController : BaseAdminController
    {
        public IActionResult KnightCyberRingsRequest() {
            var response = JsonConvert.DeserializeObject<List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>>>(UiRequestManager.Instance.Get("Addversiment", "KnightCyberRingsRequests"));
            return View(response);
        }

        public IActionResult KnightItemRequest() {
            var response = JsonConvert.DeserializeObject<List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>>>(UiRequestManager.Instance.Get("Addversiment", "KnightItemRequests"));
            return View(response);
        }

        
        [HttpPost]
        public JsonResult ApproveCyberRing(AdminAddversimentModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("Addversiment", "ApproveCyberRing", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]

        public JsonResult RejectCyberRing(AdminAddversimentModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("Addversiment", "RejectCyberRing", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }
    }
}