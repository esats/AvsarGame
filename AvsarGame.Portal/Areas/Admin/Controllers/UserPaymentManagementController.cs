using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Entities.Entities;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers {
    public class UserPaymentManagementController : BaseAdminController {
        public IActionResult Index() {
            var response = JsonConvert.DeserializeObject<List<UserPaymentManagementModel>>(UiRequestManager.Instance.Get("UserManagement", "List"));
            return View(response);
        }

        [HttpPost]
        public JsonResult Approve(UserPaymentRequestControlModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserManagement", "Approve", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public JsonResult Reject(UserPaymentRequestControlModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserManagement", "Reject", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }
    }
}