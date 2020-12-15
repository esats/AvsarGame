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
        public JsonResult Approve(UserPaymentRequestModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserManagement", "Approve", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public JsonResult Reject(UserPaymentRequestModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserManagement", "Reject", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        public IActionResult UserDrawableMoneyRequests()
        {
            var response = JsonConvert.DeserializeObject<List<MoneyWithDrawModel>>(UiRequestManager.Instance.Get("UserManagement", "UserDrawableMoneyRequests"));
            return View(response);
        }


        [HttpPost]
        public JsonResult ApproveMoneyDraw([FromBody] MoneyWithDrawModel model)
        {
            try
            {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserManagement", "ApproveMoneyDraw", JsonConvert.SerializeObject(model)));

                return Json(new { Success = true, data = response });
            }
            catch (Exception e)
            {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }


        [HttpPost]
        public JsonResult RejectMoneyDraw([FromBody] MoneyWithDrawModel model)
        {
            try
            {
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserManagement", "RejectMoneyDraw", JsonConvert.SerializeObject(model)));
                return Json(new { Success = true, data = response });
            }
            catch (Exception e)
            {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }
    }
}