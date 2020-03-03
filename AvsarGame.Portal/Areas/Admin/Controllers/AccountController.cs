using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Entities.Entities;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers {
    [Area("Admin")]
    public class AccountController : Controller {
        public IActionResult Index() {
            return View();
        }

        [HttpPost]
        public JsonResult Login(LoginModel model) {
            Response<LoggedModel> responseSaving =
                    JsonConvert.DeserializeObject<Response<LoggedModel>>(UiRequestManager.Instance.Post("Account", "Login", JsonConvert.SerializeObject(model)));
            responseSaving.Value = responseSaving.Value;
            HttpContext.Session.SetString("bearer", responseSaving.Value.BearerToken);

            return Json(new { data = responseSaving.Value });
        }
    }
}