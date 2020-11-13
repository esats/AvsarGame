using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Entities.Entities;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers {
    [Area("Admin")]
    public class AccountController : Controller {
        public IActionResult Index() {
            if (SessionManager.Instance.Get("bearer") != null) {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        [HttpPost]
        public JsonResult Login(LoginModel model) {
            var returnUrl = SessionManager.Instance.Get("returnUrl");
            try {
                Response<LoggedModel> responseSaving =
                        JsonConvert.DeserializeObject<Response<LoggedModel>>(UiRequestManager.Instance.Post("Account", "Login", JsonConvert.SerializeObject(model)));
                responseSaving.Value = responseSaving.Value;
                if (responseSaving.IsSuccess)
                {
                    SessionManager.Instance.set("bearer", responseSaving.Value.BearerToken);
                    SessionManager.Instance.set("UserId", responseSaving.Value.UserId.ToString());
                    SessionManager.Instance.set("FullName", responseSaving.Value.FullName.ToString());
                }
            } catch (Exception e) {
                return Json(new { Success = false });
            }

            return Json(new { Success = true, returnUrl = returnUrl });
        }
    }
}