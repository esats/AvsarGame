using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Core;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebApplication1.Controllers {
    public class PaymentController : BaseController {
        public ActionResult Index() {
            return View();
        }

        public string Base64Encode(string plainText) {
            var plainTextBytes = System.Text.Encoding.ASCII.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public ActionResult Pay() {
            return View();
        }

        [HttpPost]
        public ActionResult Pay(string paymentMethod, decimal amount, decimal amountWithCommission) {
            if (SessionManager.Instance.GetUserId() == null) {
                return RedirectToAction("giris", "User");
            }

            if (amount == decimal.Zero) {
                return RedirectToAction("CreditCard", "User");
            }

            var userData =
                 JsonConvert.DeserializeObject<RegisterModel>(UiRequestManager.Instance.Get("User", "GetUserDetail"));
            if (!userData.PhoneNumberConfirmed) {
                SmsHelper.SendSmsForPhoneNumber(userData.PhoneNumber);
                return RedirectToAction("ConfirmPhone", "User");
            }

            NameValueCollection data = System.Web.HttpUtility.ParseQueryString(string.Empty);
            var orderId = Base64Encode(Guid.NewGuid().ToString());
            data["username"] = "anatoliagame";
            data["key"] = "h912yNSj9";
            data["currency"] = "949";
            data["order_id"] = orderId;
            data["amount"] = (amount + amount / 100 * 2).ToString();
            //data["return_url"] = "https://www.anatoliagame.com/" + SessionManager.Instance.GetSeoName();
            data["phone"] = userData.PhoneNumber;
            data["selected_payment"] = paymentMethod;

            string result = this.Post2(data.ToString());
            var json_data = JsonConvert.DeserializeObject<Dictionary<string, string>>(result);
            var remoteIpAddress = HttpContext.Connection.RemoteIpAddress;

            if (json_data["state"] == "1") {
                var paymentLink = json_data["link"];

                PaymentLogModel logModel = new PaymentLogModel();
                logModel.UserId = SessionManager.Instance.Get("UserId");
                logModel.Amount = amount;
                logModel.AmountWithComission = (amount + amount / 100 * 2);
                logModel.OrderId = orderId;
                logModel.IpAddress = remoteIpAddress.ToString();
                logModel.CreatedDate = DateTime.Now;
                logModel.CreatedBy = SessionManager.Instance.Get("UserId");
                logModel.SystemMessage = "";
                logModel.PaymentMethod = paymentMethod;
                logModel.PaymentDistributor = (int)Banks.GPAY;
                logModel.IsIncoming = false;
                logModel.Result = Convert.ToInt32(json_data["state"]);
                logModel.CreatedDate = DateTime.Now;
                logModel.CreatedBy = SessionManager.Instance.Get("UserId");
                JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("PaymentLog", "Save", JsonConvert.SerializeObject(logModel)));
                return Redirect(paymentLink);

            } else {
                PaymentLogModel logModel = new PaymentLogModel();
                logModel.UserId = SessionManager.Instance.Get("UserId");
                logModel.Amount = amount;
                logModel.AmountWithComission = (amount + amount / 100 * 2);
                logModel.OrderId = orderId;
                logModel.IpAddress = remoteIpAddress.ToString();
                logModel.CreatedDate = DateTime.Now;
                logModel.CreatedBy = SessionManager.Instance.Get("UserId");
                logModel.SystemMessage = json_data["message"];
                logModel.PaymentMethod = paymentMethod;
                logModel.IsIncoming = false;
                logModel.PaymentDistributor = (int)Banks.GPAY;
                logModel.Result = Convert.ToInt32(json_data["state"]);
                TempData["ErrorMsg"] = string.Format("{0}", json_data["error_code"]);
                JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("PaymentLog", "Save", JsonConvert.SerializeObject(logModel)));
             
                return Redirect("odeme-sonuc?payment_status=2");
            }
        }

        public ActionResult PayLinkFailed() {
            return View();
        }

        public ActionResult PayRedirect() {
            return View();
        }

        public ActionResult PayCallBack() {
            return View();
        }

        static string[] CALLBACK_IP = new string[] { "185.197.196.99" };

        [HttpPost]
        public void PayCallBack(string siparis_id, string tutar, string islem_sonucu, string islem_mesaji, string hash) {
            string bayiiKey = "h912yNSj9";
            var paymentLog = JsonConvert.DeserializeObject<PaymentLogModel>(UiRequestManager.Instance.Get(string.Format("PaymentLog/GetLogByOrderId?OrderId={0}", siparis_id)));

            string md5Val =
                md5(this.Base64Encode(bayiiKey.Substring(0, 7) + siparis_id.Substring(0, 5) + tutar + islem_sonucu));

            var remoteIpAddress = HttpContext.Connection.RemoteIpAddress;
            PaymentLogModel logModel = new PaymentLogModel();
            logModel.UserId = paymentLog.UserId;
            logModel.Amount = paymentLog.Amount;
            logModel.AmountWithComission = paymentLog.AmountWithComission;
            logModel.ComingAmount = Convert.ToDecimal(tutar);
            logModel.OrderId = siparis_id;
            logModel.Result = Convert.ToInt32(islem_sonucu);
            logModel.Hash = hash;
            logModel.IpAddress = remoteIpAddress.ToString();
            logModel.M5val = md5Val;
            logModel.CreatedDate = DateTime.Now;
            logModel.CreatedBy = SessionManager.Instance.Get("UserId");
            logModel.SystemMessage = islem_mesaji;
            logModel.PaymentMethod = paymentLog.PaymentMethod;
            logModel.IsIncoming = true;
            logModel.PaymentDistributor = (int)Banks.GPAY;

            bool hasIP = false;

            foreach (string item in CALLBACK_IP) {
                if (remoteIpAddress.ToString() == item) {
                    hasIP = true;
                    break;
                }
            }

            if (hasIP == false || hash != md5Val) {
                logModel.ErrorMessage = "Ip veya hash hatalı";
            }

            var amountWithCommission = paymentLog.AmountWithComission;
            if (Convert.ToDecimal(tutar) != amountWithCommission) {
                logModel.ErrorMessage = "Miktarlar uyuşmamakta.";
            }

            JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("paymentlog", "Save", JsonConvert.SerializeObject(logModel)));

            if (Convert.ToInt32(islem_sonucu) == 2) {
                UserPaymentRequestModel paymentModel = new UserPaymentRequestModel();
                paymentModel.Amount = paymentLog.Amount;
                paymentModel.Bank = Banks.GPAY;
                paymentModel.CreatedDate = DateTime.Now;
                paymentModel.PrimitivePaymentType = paymentLog.PaymentMethod;
                paymentModel.UserId = paymentLog.UserId;
                paymentModel.OrderId = siparis_id;
                paymentModel.IpAddress = remoteIpAddress.ToString();
                try {
                    JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("UserManagement", "SaveBalance", JsonConvert.SerializeObject(paymentModel)));
                } catch (Exception e) {
                    logModel.TransferedUsersBalanceStatus = 2;//bu statü ödeme alınıp sistemsel sorunlarda yardımcı olacak.
                    logModel.ErrorMessage = e.Message;
                    JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("paymentlog", "Save", JsonConvert.SerializeObject(logModel)));
                }
            }
        }

        public string md5(string content) {
            MD5 md5 = new MD5CryptoServiceProvider();
            Byte[] originalBytes = ASCIIEncoding.Default.GetBytes(content);
            Byte[] encodedBytes = md5.ComputeHash(originalBytes);

            return BitConverter.ToString(encodedBytes).Replace("-", "").ToLower();
        }

        public string Post(string postData) {
            //string url = "https://gpay.com.tr/ApiRequest";
            string url = "https://demo.gpay.com.tr/ApiRequest";

            Byte[] bytes = Encoding.ASCII.GetBytes(postData);

            var http = (HttpWebRequest)WebRequest.Create(new Uri(url));
            //http.Accept = "application/json";
            //http.ContentType = "application/json";
            http.ContentType = "application/x-www-form-urlencoded";
            http.ContentLength = bytes.Length;
            http.Method = "POST";



            using (Stream stream = http.GetRequestStream()) {
                stream.Write(bytes, 0, bytes.Length);
            }

            var response = (HttpWebResponse)http.GetResponse();

            var responseStream = response.GetResponseStream();
            var content = new StreamReader(responseStream).ReadToEnd();

            return content;
        }

        public string Post2(string postData) {
            string url = "https://gpay.com.tr/ApiRequest";
            //string url = "https://demo.gpay.com.tr/ApiRequest";

            var cli = new WebClient();
            cli.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
            string response = cli.UploadString(url, postData);
            return response;
        }

        [HttpGet]
        [Route("odeme-sonuc")]
        public ActionResult PaymentResult(int payment_status) {
            if (payment_status == 0) {
                ViewBag.Result = "Ödeme Gerçekleştirilemedi. Lütfen daha tekrar deneyiniz.";
            } 

            if (payment_status == 1) {
                ViewBag.Result = "Ödeme Gerçekleştirildi. Bakiyeniz güncellendi";
            }

            if (payment_status == 2) {
                ViewBag.Result = "Ödeme Gerçekleştirilemedi. Lütfen daha tekrar deneyiniz.";
            }

            return View();
        }
    }
}
