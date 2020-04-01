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

namespace AvsarGame.Portal.Areas.Admin.Controllers {
    public class UserOrderController : BaseAdminController {
        public IActionResult Index() {
            List<UserOrdersModel> model = JsonConvert.DeserializeObject<List<UserOrdersModel>>(UiRequestManager.Instance.Get("UserOrder", "List"));
            return View(model);
        }

        [HttpPost]
        public JsonResult Approve(UserOrderRequestModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserOrder", "Approve", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public JsonResult Reject(UserOrderRequestModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserOrder", "Reject", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        public IActionResult Sells() {
            List<UserOrdersModel> model = JsonConvert.DeserializeObject<List<UserOrdersModel>>(UiRequestManager.Instance.Get("UserOrder", "Sells"));
            return View(model);
        }

        
        [HttpPost]
        public JsonResult ApproveSell(UserOrderRequestModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserOrder", "ApproveSell", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public JsonResult RejectSell(UserOrderRequestModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserOrder", "RejectSell", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }
    }
}