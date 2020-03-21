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

namespace AvsarGame.Portal.Controllers {
    public class UserController : Controller {
        public IActionResult Index() {
            return View();
        }

        [HttpPost]
        public JsonResult Register(RegisterModel model) {
            try {
                var response = JsonConvert.DeserializeObject<Response<RegisterModel>>(UiRequestManager.Instance.Post("Account", "Register", JsonConvert.SerializeObject(model)));

                return Json(response);
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public JsonResult Login(LoginModel model) {
            try {
                Response<LoggedModel> responseSaving =
                        JsonConvert.DeserializeObject<Response<LoggedModel>>(UiRequestManager.Instance.Post("Account", "Login", JsonConvert.SerializeObject(model)));
                SessionManager.Instance.set("bearer", responseSaving.Value.BearerToken);
                return Json(new { Success = true, data = responseSaving });
            } catch (Exception e) {
                return Json(new { Success = false });
            }
        }

        [HttpGet]
        public ActionResult Detail(Guid id) {
            return View();
        }

        [HttpPost]
        public JsonResult RequestPayment(UserPaymentRequestModel model) 
        {
            try {
                var response = JsonConvert.DeserializeObject<Response<RegisterModel>>(UiRequestManager.Instance.Post("Account", "Register", JsonConvert.SerializeObject(model)));
                return Json(response);
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

    }
}