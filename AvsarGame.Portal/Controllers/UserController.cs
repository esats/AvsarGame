using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Core;
using AvsarGame.Core.ProcedureModels;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using AvsarGame.Portal.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Controllers {
    public class UserController : BaseController {
        public IActionResult Index() {
            return View();
        }

        public IActionResult detailOrkun() {
            return View();
        }

        [Route("/ilan-ver/knightcyberring")]
        public IActionResult KnightCyberRing() {
            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer == null) {
                return RedirectToAction("giris", "User");
            }

            return View();
        }

        [Route("/ilan-ver/knightitem")]
        public IActionResult KnightItem() {
            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer == null) {
                return RedirectToAction("giris", "User");
            }

            return View();
        }

        [Route("/ilan-ver/metin2item")]
        public IActionResult Metin2Item() {
            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer == null) {
                return RedirectToAction("giris", "User");
            }

            return View();
        }

        [Route("/ilan-ver/csgo")]
        public IActionResult Csgo() {
            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer == null) {
                return RedirectToAction("giris", "User");
            }

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
        [Route("{Name}")]
        public ActionResult Detail() {
            var id = SessionManager.Instance.GetUserId();
            if (string.IsNullOrEmpty(id)) {
                return null;
            }

            UserProfilDetailModel model = new UserProfilDetailModel();

            model.Balance =
                    JsonConvert.DeserializeObject<UserBalanceModel>(UiRequestManager.Instance.Get(String.Format("UserBalance/GetBalance/{0}", id)));
            //model.NotificationCount =
            //        JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Get(String.Format("UserNotification/GetNotificationUnRead/{0}", id)));

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

        [HttpGet]
        public JsonResult GetUnReadNotification() {
            var id = SessionManager.Instance.GetUserId();
            try {
                var unReadCount = JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Get(String.Format("UserNotification/GetUnReadNotification/{0}", id)));
                return Json(new { Success = true, Count = unReadCount });
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
                    response.Error = (int)Errors.UNAUTHORIZED;
                    baseResponse.IsSuccess = false;
                    baseResponse.Value = response;
                    SessionManager.Instance.set("returnUrl", "/sepetim");
                    return Json(new { Success = true, data = baseResponse });
                }

                var totalGameAmount = orders.Sum(x => x.BillingPrice);
                UserBalanceModel Balance =
                        JsonConvert.DeserializeObject<UserBalanceModel>(
                                UiRequestManager.Instance.Get(String.Format("UserBalance/GetBalance/{0}", SessionManager.Instance.GetUserId())));

                if (totalGameAmount > Balance.Balance) {
                    response.Message = "Hesabınızın bakiyesi bu işlem için yetersiz";
                    response.Error = (int)Errors.OUTOFBALANCE;
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
                    response.Error = (int)Errors.UNAUTHORIZED;
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

                var response =
                        JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Post("Addversiment", "AddKnightCyberRing", JsonConvert.SerializeObject(model)));

                await FileManager.Instance.SaveAll(model.Files, response, AddversimentType.KNIGHT_ONLINE_CYBERRING);

                return Json(new { Success = true, data = true });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public async Task<JsonResult> AddKnightItemAddversiment(KnightItemAddversimentModel model) {
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
                    return Json(new { Success = false, Message = "Lütfen tekrar giriş yapın" });
                }

                var response =
                        JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Post("Addversiment", "AddKnightItem", JsonConvert.SerializeObject(model)));

                await FileManager.Instance.SaveAll(model.Files, response, AddversimentType.KNIGHT_ONLINE_ITEM);

                return Json(new { Success = true, data = true });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        public async Task<JsonResult> AddMetin2Addversiment(AddversimentDetailModel model) {
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
                    return Json(new { Success = false, Message = "Lütfen tekrar giriş yapın" });
                }

                var response =
                        JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Post("Addversiment", "AddMetin2Item", JsonConvert.SerializeObject(model)));

                await FileManager.Instance.SaveAll(model.Files, response, AddversimentType.METIN2_ITEM);

                return Json(new { Success = true, data = true });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpGet]
        [Route("{name}/ilanlarim")]
        public ActionResult UserAddversiment() {
            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer == null) {
                return RedirectToAction("Index", "Home");
            }

            var Balance =
                    JsonConvert.DeserializeObject<List<AddversimentDetailModel>>(
                            UiRequestManager.Instance.Get(String.Format("Addversiment/GetUserAddversiment/{0}", SessionManager.Instance.GetUserId())));
            return View(Balance);
        }

        [HttpGet]
        [Route("{name}/knight-item/duzenle/{Id}")]
        public ActionResult UpdateKnightItem(int Id = 0) {
            if (Id == 0) {
                return null;
            }

            UpdateAddversimentModel baseModel = new UpdateAddversimentModel();
            AddversimentDetailModel model =
                    JsonConvert.DeserializeObject<AddversimentDetailModel>(UiRequestManager.Instance.Get(string.Format("Addversiment/KnightItemDetail/{0}", Id)));
            baseModel.Detail = model;

            return View(baseModel);
        }

        [HttpGet]
        [Route("{name}/knight-cyber-ring/duzenle/{Id}")]
        public ActionResult UpdateKnightCyber(int Id) {
            if (Id == 0) {
                return null;
            }

            UpdateAddversimentModel baseModel = new UpdateAddversimentModel();
            AddversimentDetailModel model =
                    JsonConvert.DeserializeObject<AddversimentDetailModel>(UiRequestManager.Instance.Get(string.Format("Addversiment/KnightCyberDetail/{0}", Id)));
            baseModel.Detail = model;

            return View(baseModel);
        }

        [HttpGet]
        [Route("{name}/metin2item/duzenle/{Id}")]
        public ActionResult UpdateMetin2Item(int Id = 0) {
            if (Id == 0) {
                return null;
            }

            UpdateAddversimentModel baseModel = new UpdateAddversimentModel();
            AddversimentDetailModel model =
                    JsonConvert.DeserializeObject<AddversimentDetailModel>(UiRequestManager.Instance.Get(string.Format("Addversiment/Metin2ItemDetail/{0}", Id)));
            baseModel.Detail = model;

            return View(baseModel);
        }

        [HttpPost]
        public async Task<JsonResult> UpdateKnightItemAddversiment(KnightItemAddversimentModel model) {
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
                    return Json(new { Success = false, Message = "Lütfen tekrar giriş yapın" });
                }

                var response =
                        JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Post("Addversiment", "AddKnightItem", JsonConvert.SerializeObject(model)));
                if (model.Files != null) {
                    await FileManager.Instance.SaveAll(model.Files, response, AddversimentType.KNIGHT_ONLINE_ITEM);
                }

                return Json(new { Success = true, data = true });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public async Task<JsonResult> UpdateKnightCyberAddversiment(KnightCyberRingAddversimentModel model) {
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
                    return Json(new { Success = false, Message = "Lütfen tekrar giriş yapın" });
                }

                var response =
                        JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Post("Addversiment", "AddKnightCyberRing", JsonConvert.SerializeObject(model)));
                if (model.Files != null) {
                    await FileManager.Instance.SaveAll(model.Files, response, AddversimentType.KNIGHT_ONLINE_CYBERRING);
                }

                return Json(new { Success = true, data = true });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
        public async Task<JsonResult> UpdateMetin2Item(AddversimentDetailModel model) {
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
                    return Json(new { Success = false, Message = "Lütfen tekrar giriş yapın" });
                }

                var response =
                        JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Post("Addversiment", "AddMetin2Item", JsonConvert.SerializeObject(model)));
                if (model.Files != null) {
                    await FileManager.Instance.SaveAll(model.Files, response, AddversimentType.METIN2_ITEM);
                }

                return Json(new { Success = true, data = true });
            } catch (Exception e) {
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }


        [HttpGet]
        [Route("/knight-cyber-ring/delete/{Id}")]
        public ActionResult DeleteKnightItem(int Id) {
            UiRequestManager.Instance.Get(string.Format("Addversiment/DeleteKnightCyber/{0}", Id));
            return Redirect("/" + UrlExtension.FriendlyUrl(SessionManager.Instance.GetFullName()) + "/ilanlarim");
        }

        [HttpGet]
        [Route("/knight-item/delete/{Id}")]
        public ActionResult DeleteKnightCyber(int Id) {
            UiRequestManager.Instance.Get(string.Format("Addversiment/DeleteKnightItem/{0}", Id));
            return Redirect("/" + UrlExtension.FriendlyUrl(SessionManager.Instance.GetFullName()) + "/ilanlarim");
        }

        public JsonResult MakeComment(CommentModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer == null) {
                response.Value = HttpStatusCode.Unauthorized;
                response.IsSuccess = false;
                response.Message = "Yetkisiz";
                return Json(response);
            }

            response =
                    JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("Addversiment", "AddComment", JsonConvert.SerializeObject(model)));

            return Json(response);
        }

        public JsonResult GiveAnswer(CommentModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer == null) {
                response.Value = HttpStatusCode.Unauthorized;
                response.IsSuccess = false;
                response.Message = "Yetkisiz";
                return Json(response);
            }

            response =
                    JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("Addversiment", "GiveAnswer", JsonConvert.SerializeObject(model)));

            return Json(response);
        }

        [HttpGet]
        public JsonResult GetNotification() {
            var id = SessionManager.Instance.GetUserId();
            try {
                var notifications =
                        JsonConvert.DeserializeObject<List<UserNotificationModel>>(
                                UiRequestManager.Instance.Get(String.Format("UserNotification/GetAllNotificationDetail/{0}", id)));
                return Json(new { success = true, data = notifications });
            } catch (Exception e) {
                return Json(new { success = false });
            }
        }

        [Route("odeme")]
        public ActionResult Payment() {
            return View();
        }

        [Route("odeme/kredikarti")]
        public ActionResult CreditCard() {
            if (SessionManager.Instance.GetUserId() == null) {
                return RedirectToAction("giris", "User");
            }

            var userData =
                 JsonConvert.DeserializeObject<RegisterModel>(UiRequestManager.Instance.Get("User", "GetUserDetail"));
            if (!userData.PhoneNumberConfirmed) {
                if (SessionManager.Instance.Get("sendedConfirmNumber") == null) {
                    SmsHelper.SendSmsForPhoneNumber(userData.PhoneNumber);
                }
                SessionManager.Instance.set("returnUrl", "/odeme/kredikarti");
                return RedirectToAction("ConfirmPhone", "User");
            }

            return View();
        }

        [HttpGet]
        [Route("telefon-onayi")]
        public ActionResult ConfirmPhone() {
            if (SessionManager.Instance.GetUserId() == null) {
                return RedirectToAction("giris", "User");
            }

            var userData = JsonConvert.DeserializeObject<RegisterModel>(UiRequestManager.Instance.Get("User", "GetUserDetail"));
            if (userData.PhoneNumberConfirmed) {
                return View("Index", "Home");
            }

            ViewBag.UserPhone = userData.PhoneNumber;
            return View();
        }

        [HttpPost]
        [Route("telefon-onayi")]
        public ActionResult ConfirmPhone(int sendedNumber) {
            var sendedConfirmNumber = Convert.ToInt32(SessionManager.Instance.Get("sendedConfirmNumber"));
            if (sendedConfirmNumber == sendedNumber) {
                try {
                    var userData = JsonConvert.DeserializeObject<RegisterModel>(UiRequestManager.Instance.Get("User", "GetUserDetail"));
                    userData.PhoneNumberConfirmed = true;
                    JsonConvert.DeserializeObject<Response<RegisterModel>>(UiRequestManager.Instance.Post("Account", "Update", JsonConvert.SerializeObject(userData)));
                } catch (Exception) {
                    return View();
                }
                SessionManager.Instance.Remove("sendedConfirmNumber");
                return Redirect("onay-sonuc");
            } else {
                ViewBag.confirmResult = "**Lütfen kodunuzu doğru giriniz.";
                return View();
            }
        }

        [HttpPost]
        public JsonResult SendSmsAgain() {
            SmsHelper.SendSmsForPhoneNumber(ViewBag.UserPhone);
            return Json(true);
        }

        [Route("onay-sonuc")]
        public ActionResult ConfirmResult() {
            ViewBag.returnUrl = SessionManager.Instance.Get("returnUrl");
            return View();
        }
    }
}