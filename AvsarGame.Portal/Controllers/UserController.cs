using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Core;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

<<<<<<< HEAD
namespace AvsarGame.Portal.Controllers
{
    public class UserController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult DetailOrkun()
        {
            return View();
        }
        public IActionResult ilanCsOrkun()
        {
            return View();
        }
        public IActionResult ilanKnightOrkun()
        {
            return View();
        }
        public IActionResult filtreOrkun()
        {
=======
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
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
            return View();
        }

        public IActionResult oyunlarOrkun()
        {
            return View();
        }
        [HttpPost]
<<<<<<< HEAD
        public JsonResult Register(RegisterModel model)
        {
            try
            {
                var responseSaving =
                    JsonConvert.DeserializeObject<Response<RegisterModel>>(UiRequestManager.Instance.Post("Account", "Register", JsonConvert.SerializeObject(model)));
                if (responseSaving.IsSuccess)
                {
=======
        public JsonResult Register(RegisterModel model) {
            try {
                var responseSaving =
                        JsonConvert.DeserializeObject<Response<RegisterModel>>(UiRequestManager.Instance.Post("Account", "Register", JsonConvert.SerializeObject(model)));
                if (responseSaving.IsSuccess) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                    SessionManager.Instance.set("bearer", responseSaving.Value.BearerToken);
                    SessionManager.Instance.set("UserId", responseSaving.Value.Id.ToString());
                    SessionManager.Instance.set("FullName", responseSaving.Value.FullName.ToString());
                }

                return Json(new { Success = true, data = responseSaving });
<<<<<<< HEAD
            }
            catch (Exception e)
            {
=======
            } catch (Exception e) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpGet]
<<<<<<< HEAD
        public ActionResult giris()
        {
            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer != null)
            {
=======
        public ActionResult giris() {
            var bearer = SessionManager.Instance.Get("bearer");
            if (bearer != null) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                return RedirectToAction("Index", "Home");
            }

            return View();
        }

        [HttpPost]
<<<<<<< HEAD
        public JsonResult Giris(LoginModel model)
        {
            try
            {
                Response<LoggedModel> response =
                    JsonConvert.DeserializeObject<Response<LoggedModel>>(UiRequestManager.Instance.Post("Account", "Login", JsonConvert.SerializeObject(model)));
                if (response.IsSuccess)
                {
=======
        public JsonResult Giris(LoginModel model) {
            try {
                Response<LoggedModel> response =
                        JsonConvert.DeserializeObject<Response<LoggedModel>>(UiRequestManager.Instance.Post("Account", "Login", JsonConvert.SerializeObject(model)));
                if (response.IsSuccess) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                    SessionManager.Instance.set("bearer", response.Value.BearerToken);
                    SessionManager.Instance.set("UserId", response.Value.UserId.ToString());
                    SessionManager.Instance.set("FullName", response.Value.FullName.ToString());
                    response.Value.ReturnUrl = SessionManager.Instance.Get("returnUrl");
                }

                return Json(new { Success = true, data = response });
<<<<<<< HEAD
            }
            catch (Exception e)
            {
=======
            } catch (Exception e) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                return Json(new { Success = false });
            }
        }

        [HttpPost]
<<<<<<< HEAD
        public JsonResult Login(LoginModel model)
        {
            try
            {
                Response<LoggedModel> response =
                    JsonConvert.DeserializeObject<Response<LoggedModel>>(UiRequestManager.Instance.Post("Account", "Login", JsonConvert.SerializeObject(model)));
                if (response.IsSuccess)
                {
=======
        public JsonResult Login(LoginModel model) {
            try {
                Response<LoggedModel> response =
                        JsonConvert.DeserializeObject<Response<LoggedModel>>(UiRequestManager.Instance.Post("Account", "Login", JsonConvert.SerializeObject(model)));
                if (response.IsSuccess) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                    SessionManager.Instance.set("bearer", response.Value.BearerToken);
                    SessionManager.Instance.set("UserId", response.Value.UserId.ToString());
                    SessionManager.Instance.set("FullName", response.Value.FullName.ToString());
                }

                return Json(new { Success = true, data = response });
<<<<<<< HEAD
            }
            catch (Exception e)
            {
=======
            } catch (Exception e) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                return Json(new { Success = false });
            }
        }

        [HttpGet]
<<<<<<< HEAD
        public ActionResult Detail()
        {
            var id = SessionManager.Instance.GetUserId();
            if (string.IsNullOrEmpty(id))
            {
=======
        public ActionResult Detail() {
            var id = SessionManager.Instance.GetUserId();
            if (string.IsNullOrEmpty(id)) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                return null;
            }

            UserProfilDetailModel model = new UserProfilDetailModel();

            model.Balance =
<<<<<<< HEAD
                JsonConvert.DeserializeObject<UserBalanceModel>(UiRequestManager.Instance.Get(String.Format("UserBalance/GetBalance/{0}", id)));
            model.NotificationCount =
                JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Get(String.Format("UserNotification/GetNotificationUnRead/{0}", id)));

            model.Notifications =
                JsonConvert.DeserializeObject<List<UserNotificationModel>>(UiRequestManager.Instance.Get(String.Format("UserNotification/GetAllNotificationDetail/{0}", id)));

            model.UserDetail =
                JsonConvert.DeserializeObject<RegisterModel>(UiRequestManager.Instance.Get("User", "GetUserDetail"));
=======
                    JsonConvert.DeserializeObject<UserBalanceModel>(UiRequestManager.Instance.Get(String.Format("UserBalance/GetBalance/{0}", id)));
            model.NotificationCount =
                    JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Get(String.Format("UserNotification/GetNotificationUnRead/{0}", id)));

            model.Notifications =
                    JsonConvert.DeserializeObject<List<UserNotificationModel>>(UiRequestManager.Instance.Get(String.Format("UserNotification/GetAllNotificationDetail/{0}", id)));

            model.UserDetail =
                    JsonConvert.DeserializeObject<RegisterModel>(UiRequestManager.Instance.Get("User", "GetUserDetail"));
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377

            return View(model);
        }

        [HttpGet]
<<<<<<< HEAD
        public ActionResult Logout()
        {
=======
        public ActionResult Logout() {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
            UiRequestManager.Instance.Get(String.Format("Account/Logout"));
            SessionManager.Instance.Clear();
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
<<<<<<< HEAD
        public JsonResult RequestPayment(UserPaymentRequestModel model)
        {
            try
            {
                if (!SessionManager.Instance.IsAuthenticate())
                {
=======
        public JsonResult RequestPayment(UserPaymentRequestModel model) {
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                    return Json(new { Success = false, Message = "Lütfen giriş yapınız" });
                }

                model.UserId = SessionManager.Instance.Get("UserId");
                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("Payment", "Save", JsonConvert.SerializeObject(model)));

                return Json(new { Success = false, data = response });
<<<<<<< HEAD
            }
            catch (Exception e)
            {
=======
            } catch (Exception e) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
<<<<<<< HEAD
        public JsonResult ReadAllNotification(string id)
        {
            try
            {
                UiRequestManager.Instance.Get(String.Format("UserNotification/ReadAllNotification/{0}", id));
                return Json(new { Success = true });
            }
            catch (Exception e)
            {
=======
        public JsonResult ReadAllNotification(string id) {
            try {
                UiRequestManager.Instance.Get(String.Format("UserNotification/ReadAllNotification/{0}", id));
                return Json(new { Success = true });
            } catch (Exception e) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
<<<<<<< HEAD
        public async Task<JsonResult> UserOrderRequest([FromBody] List<UserOrderDetailModel> orders)
        {
            Response<UserOrderResponseModel> baseResponse = new Response<UserOrderResponseModel>();
            UserOrderResponseModel response = new UserOrderResponseModel();
            try
            {
                if (!SessionManager.Instance.IsAuthenticate())
                {
=======
        public async Task<JsonResult> UserOrderRequest([FromBody] List<UserOrderDetailModel> orders) {
            Response<UserOrderResponseModel> baseResponse = new Response<UserOrderResponseModel>();
            UserOrderResponseModel response = new UserOrderResponseModel();
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                    response.RedirectUrl = "/User/login";
                    response.Message = "Lütfen Giriş Yapınız";
                    response.Error = (int)Errors.UNAUTHORIZED;
                    baseResponse.IsSuccess = false;
                    baseResponse.Value = response;
                    SessionManager.Instance.set("returnUrl", "/sepetim");
                    return Json(new { Success = true, data = baseResponse });
                }

                var totalGameAmount = orders.Sum(x => x.BillingAmount * x.BillingPrice);
                UserBalanceModel Balance =
<<<<<<< HEAD
                    JsonConvert.DeserializeObject<UserBalanceModel>(
                        UiRequestManager.Instance.Get(String.Format("UserBalance/GetBalance/{0}", SessionManager.Instance.GetUserId())));
=======
                        JsonConvert.DeserializeObject<UserBalanceModel>(
                                UiRequestManager.Instance.Get(String.Format("UserBalance/GetBalance/{0}", SessionManager.Instance.GetUserId())));
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377

                if (totalGameAmount > Balance.Balance)
                {
                    response.Message = "Hesabınızın bakiyesi bu işlem için yetersiz";
                    response.Error = (int)Errors.OUTOFBALANCE;
                    baseResponse.Value = response;
                    baseResponse.IsSuccess = false;
                    return Json(new { Success = true, data = baseResponse });
                }

                baseResponse =
<<<<<<< HEAD
                    JsonConvert.DeserializeObject<Response<UserOrderResponseModel>>(UiRequestManager.Instance.Post("UserOrder", "Save", JsonConvert.SerializeObject(orders)));
=======
                        JsonConvert.DeserializeObject<Response<UserOrderResponseModel>>(UiRequestManager.Instance.Post("UserOrder", "Save", JsonConvert.SerializeObject(orders)));
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377

                await UiRequestManager.Instance.PostAsync("MailSender", "SendOrderMail", JsonConvert.SerializeObject(orders));

                SessionManager.Instance.Remove("chart");

                return Json(new { Success = true, data = baseResponse });
<<<<<<< HEAD
            }
            catch (Exception e)
            {
=======
            } catch (Exception e) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
<<<<<<< HEAD
        public JsonResult UserSellRequest([FromBody] List<UserOrderDetailModel> sells)
        {
            Response<UserOrderResponseModel> baseResponse = new Response<UserOrderResponseModel>();
            UserOrderResponseModel response = new UserOrderResponseModel();
            try
            {
                if (!SessionManager.Instance.IsAuthenticate())
                {
=======
        public JsonResult UserSellRequest([FromBody] List<UserOrderDetailModel> sells) {
            Response<UserOrderResponseModel> baseResponse = new Response<UserOrderResponseModel>();
            UserOrderResponseModel response = new UserOrderResponseModel();
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                    response.RedirectUrl = "/User/login";
                    response.Message = "Lütfen Giriş Yapınız";
                    response.Error = (int)Errors.UNAUTHORIZED;
                    baseResponse.IsSuccess = false;
                    baseResponse.Value = response;
                    return Json(new { Success = true, data = baseResponse });
                }

                baseResponse =
<<<<<<< HEAD
                    JsonConvert.DeserializeObject<Response<UserOrderResponseModel>>(
                        UiRequestManager.Instance.Post("UserOrder", "SaveSell", JsonConvert.SerializeObject(sells)));

                return Json(new { Success = true, data = baseResponse });
            }
            catch (Exception e)
            {
=======
                        JsonConvert.DeserializeObject<Response<UserOrderResponseModel>>(
                                UiRequestManager.Instance.Post("UserOrder", "SaveSell", JsonConvert.SerializeObject(sells)));

                return Json(new { Success = true, data = baseResponse });
            } catch (Exception e) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }

        [HttpPost]
<<<<<<< HEAD
        public async Task<JsonResult> ForgotPassword(ForgotPasswordModel model)
        {
=======
        public async Task<JsonResult> ForgotPassword(ForgotPasswordModel model) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
            model.RequestSchema = HttpContext.Request.Scheme + "://" + HttpContext.Request.Host.ToString();
            await UiRequestManager.Instance.PostAsync("Account", "ForgotPassword", JsonConvert.SerializeObject(model));
            return Json(true);
        }

        [HttpGet]
        [Produces("application/json")]
<<<<<<< HEAD
        public ActionResult ResetPassword(string email, string token)
        {
=======
        public ActionResult ResetPassword(string email, string token) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
            ResetPasswordModel resetPasswordModel = new ResetPasswordModel();
            resetPasswordModel.Email = email;
            resetPasswordModel.Token = token.Replace(" ", "+");
            return View(resetPasswordModel);
        }

        [HttpPost]
<<<<<<< HEAD
        public ActionResult ResetPassword([FromBody] ResetPasswordModel model)
        {
=======
        public ActionResult ResetPassword([FromBody] ResetPasswordModel model) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
            var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("Account", "ResetPassword", JsonConvert.SerializeObject(model)));

            return Json(new { success = true, data = response });
        }

        [HttpPost]
<<<<<<< HEAD
        public JsonResult Update(RegisterModel model)
        {
            try
            {
                if (!SessionManager.Instance.IsAuthenticate())
                {
=======
        public JsonResult Update(RegisterModel model) {
            try {
                if (!SessionManager.Instance.IsAuthenticate()) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                    return Json(new { Success = false, Message = "Birşeyler ters gitti" });
                }

                var responseSaving =
<<<<<<< HEAD
                    JsonConvert.DeserializeObject<Response<RegisterModel>>(UiRequestManager.Instance.Post("Account", "Update", JsonConvert.SerializeObject(model)));
                SessionManager.Instance.set("FullName", model.Name + " " + model.Surname);
                return Json(new { Success = true, data = responseSaving });
            }
            catch (Exception e)
            {
=======
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
                        JsonConvert.DeserializeObject<int>(UiRequestManager.Instance.Post("Adversiment", "AddKnightCyberRing", JsonConvert.SerializeObject(model)));

                await FileManager.Instance.SaveAll(model.Files, response,ImageType.KNIGHT_ONLINE_CYBERRING);

                return Json(new { Success = true, data = true });
            } catch (Exception e) {
>>>>>>> 5c3835b0d162818d417a814ab5a24f819426d377
                return Json(new { Success = false, Message = "Birşeyler ters gitti" });
            }
        }
    }
}