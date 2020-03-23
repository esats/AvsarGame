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
    public class UserController : BaseController {
        public IActionResult Index() {
            return View();
        }

        [HttpPost]
        public JsonResult Register(RegisterModel model) {
            try {
                var responseSaving =
                        JsonConvert.DeserializeObject<Response<RegisterModel>>(UiRequestManager.Instance.Post("Account", "Register", JsonConvert.SerializeObject(model)));
                if (responseSaving.IsSuccess) {
                    SessionManager.Instance.set("bearer", responseSaving.Value.BearerToken);
                    SessionManager.Instance.set("UserId", responseSaving.Value.Id.ToString());
                    SessionManager.Instance.set("FullName", responseSaving.Value.FullName.ToString());
                }

                return Json(responseSaving);
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public JsonResult Login(LoginModel model) {
            try {
                Response<LoggedModel> response =
                        JsonConvert.DeserializeObject<Response<LoggedModel>>(UiRequestManager.Instance.Post("Account", "Login", JsonConvert.SerializeObject(model)));
                if (response.IsSuccess) {
                    SessionManager.Instance.set("bearer", response.Value.BearerToken);
                    SessionManager.Instance.set("UserId", response.Value.UserId.ToString());
                    SessionManager.Instance.set("FullName", response.Value.FullName.ToString());
                }

                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false });
            }
        }

        [HttpGet]
        public ActionResult Detail(string id) {
            UserProfilDetailModel model = new UserProfilDetailModel();
            model.Balance =
                    JsonConvert.DeserializeObject<UserBalanceModel>(UiRequestManager.Instance.Get(String.Format("UserBalance/GetBalance/{0}", id)));
            model.Notifications =
                    JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Get(String.Format("UserNotification/GetNotificationUnRead/{0}", id)));

            return View(model);
        }


        [HttpPost]
        public JsonResult RequestPayment(UserPaymentRequestModel model) {
            try {
                model.UserId = SessionManager.Instance.Get("UserId");
                var response = JsonConvert.DeserializeObject<Response<RegisterModel>>(UiRequestManager.Instance.Post("Payment", "Save", JsonConvert.SerializeObject(model)));
                return Json(response);
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }
    }
}