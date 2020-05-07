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

        public IActionResult DetailOrkun() {
            return View();
        }

        public IActionResult ilanCsOrkun() {
            return View();
        }

        [Route("user/ilan/knightcyberring")]
        public IActionResult KnightCyberRing() {
            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer == null) {
                return RedirectToAction("giris", "User");
            }

            return View();
        }

        [Route("user/ilan/knightitem")]
        public IActionResult KnightItem() {
            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer == null) {
                return RedirectToAction("giris", "User");
            }

            return View();
        }

        public IActionResult filtreOrkun() {
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

                return Json(new { Success = true, data = responseSaving });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpGet]
        public ActionResult giris() {
            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer != null) {
                return RedirectToAction("Index", "Home");
            }

            return View();
        }

        [HttpPost]
        public JsonResult Giris(LoginModel model) {
            try {
                Response<LoggedModel> response =
                        JsonConvert.DeserializeObject<Response<LoggedModel>>(UiRequestManager.Instance.Post("Account", "Login", JsonConvert.SerializeObject(model)));
                if (response.IsSuccess) {
                    SessionManager.Instance.set("bearer", response.Value.BearerToken);
                    SessionManager.Instance.set("UserId", response.Value.UserId.ToString());
                    SessionManager.Instance.set("FullName", response.Value.FullName.ToString());
                    response.Value.ReturnUrl = SessionManager.Instance.Get("returnUrl");
                }

                return Json(new { Success = true, data = response });
            } catch (Exception e) {
                return Json(new { Success = false });
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
        public ActionResult Detail() {
            var id = SessionManager.Instance.GetUserId();
            if (string.IsNullOrEmpty(id)) {
                return null;
            }

            UserProfilDetailModel model = new UserProfilDetailModel();

            model.Balance =
                    JsonConvert.DeserializeObject<UserBalanceModel>(UiRequestManager.Instance.Get(String.Format("UserBalance/GetBalance/{0}", id)));
            model.NotificationCount =
                    JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Get(String.Format("UserNotification/GetNotificationUnRead/{0}", id)));

            model.Notifications =
                    JsonConvert.DeserializeObject<List<UserNotificationModel>>(UiRequestManager.Instance.Get(String.Format("UserNotification/GetAllNotificationDetail/{0}", id)));

            model.UserDetail =
                    JsonConvert.DeserializeObject<RegisterModel>(UiRequestManager.Instance.Get("User", "GetUserDetail"));

            return View(model);
        }

        [HttpGet]
        public ActionResult Logout() {
            UiRequestManager.Instance.Get(String.Format("Account/Logout"));
            SessionManager.Instance.Clear();
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public JsonResult RequestPayment(UserPaymentRequestModel model) {
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
                    return Json(new { Success = false, Message = "Lütfen giriş yapınız" });
                }

                model.UserId = SessionManager.Instance.Get("UserId");
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("Payment", "Save", JsonConvert.SerializeObject(model)));

                return Json(new { Success = false, data = response });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public JsonResult ReadAllNotification(string id) {
            try {
                UiRequestManager.Instance.Get(String.Format("UserNotification/ReadAllNotification/{0}", id));
                return Json(new { Success = true });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public async Task<JsonResult> UserOrderRequest([FromBody] List<UserOrderDetailModel> orders) {
            Response<UserOrderResponseModel> baseResponse = new Response<UserOrderResponseModel>();
            UserOrderResponseModel response = new UserOrderResponseModel();
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
                    response.RedirectUrl = "/User/login";
                    response.Message = "Lütfen Giriş Yapınız";
                    response.Error = (int) Errors.UNAUTHORIZED;
                    baseResponse.IsSuccess = false;
                    baseResponse.Value = response;
                    SessionManager.Instance.set("returnUrl", "/sepetim");
                    return Json(new { Success = true, data = baseResponse });
                }

                var totalGameAmount = orders.Sum(x => x.BillingAmount * x.BillingPrice);
                UserBalanceModel Balance =
                        JsonConvert.DeserializeObject<UserBalanceModel>(
                                UiRequestManager.Instance.Get(String.Format("UserBalance/GetBalance/{0}", SessionManager.Instance.GetUserId())));

                if (totalGameAmount > Balance.Balance) {
                    response.Message = "Hesabınızın bakiyesi bu işlem için yetersiz";
                    response.Error = (int) Errors.OUTOFBALANCE;
                    baseResponse.Value = response;
                    baseResponse.IsSuccess = false;
                    return Json(new { Success = true, data = baseResponse });
                }

                baseResponse =
                        JsonConvert.DeserializeObject<Response<UserOrderResponseModel>>(UiRequestManager.Instance.Post("UserOrder", "Save", JsonConvert.SerializeObject(orders)));

                await UiRequestManager.Instance.PostAsync("MailSender", "SendOrderMail", JsonConvert.SerializeObject(orders));

                SessionManager.Instance.Remove("chart");

                return Json(new { Success = true, data = baseResponse });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public JsonResult UserSellRequest([FromBody] List<UserOrderDetailModel> sells) {
            Response<UserOrderResponseModel> baseResponse = new Response<UserOrderResponseModel>();
            UserOrderResponseModel response = new UserOrderResponseModel();
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
                    response.RedirectUrl = "/User/login";
                    response.Message = "Lütfen Giriş Yapınız";
                    response.Error = (int) Errors.UNAUTHORIZED;
                    baseResponse.IsSuccess = false;
                    baseResponse.Value = response;
                    return Json(new { Success = true, data = baseResponse });
                }

                baseResponse =
                        JsonConvert.DeserializeObject<Response<UserOrderResponseModel>>(
                                UiRequestManager.Instance.Post("UserOrder", "SaveSell", JsonConvert.SerializeObject(sells)));

                return Json(new { Success = true, data = baseResponse });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public async Task<JsonResult> ForgotPassword(ForgotPasswordModel model) {
            model.RequestSchema = HttpContext.Request.Scheme + "://" + HttpContext.Request.Host.ToString();
            await UiRequestManager.Instance.PostAsync("Account", "ForgotPassword", JsonConvert.SerializeObject(model));
            return Json(true);
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult ResetPassword(string email, string token) {
            ResetPasswordModel resetPasswordModel = new ResetPasswordModel();
            resetPasswordModel.Email = email;
            resetPasswordModel.Token = token.Replace(" ", "+");
            return View(resetPasswordModel);
        }

        [HttpPost]
        public ActionResult ResetPassword([FromBody] ResetPasswordModel model) {
            var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("Account", "ResetPassword", JsonConvert.SerializeObject(model)));

            return Json(new { success = true, data = response });
        }

        [HttpPost]
        public JsonResult Update(RegisterModel model) {
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
                    return Json(new { Success = false, Message = "Birşeyler ters gitti" });
                }

                var responseSaving =
                        JsonConvert.DeserializeObject<Response<RegisterModel>>(UiRequestManager.Instance.Post("Account", "Update", JsonConvert.SerializeObject(model)));
                SessionManager.Instance.set("FullName", model.Name + " " + model.Surname);
                return Json(new { Success = true, data = responseSaving });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public async Task<JsonResult> AddKnightCyberRingAddversiment(KnightCyberRingAddversimentModel model) {
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
                    return Json(new { Success = false, Message = "Birşeyler ters gitti" });
                }


                var responseSaving =
                        JsonConvert.DeserializeObject<Response<RegisterModel>>(UiRequestManager.Instance.Post("Account", "Update", JsonConvert.SerializeObject(model)));

               await FileManager.Instance.SaveAll(model.Files,responseSaving.Value.Id);


                return Json(new { Success = true, data = responseSaving });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }

            return null;
        }
    }
}