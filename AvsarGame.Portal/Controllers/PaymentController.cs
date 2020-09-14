﻿using System;
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
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebApplication1.Controllers {
    public class PaymentController : Controller {
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
        public ActionResult Pay(string s) {
            NameValueCollection data = System.Web.HttpUtility.ParseQueryString(string.Empty);
            var orderId = Base64Encode(Guid.NewGuid().ToString());
            data["username"] = "anatoliagame";
            data["key"] = "h912yNSj9";
            data["currency"] = "949";
            data["order_id"] = orderId;
            data["amount"] = "1";
            data["return_url"] = "http://localhost:30672/esat-avsar";
            data["phone"] = "54335547779"; //ödemeyi yapacak müşterinin telefon numarası.
            data["selected_payment"] = "krediKarti";
            data["selected_bank_id"] = "9991"; //qnb

            string result = this.Post2(data.ToString());
            var json_data = JsonConvert.DeserializeObject<Dictionary<string, string>>(result);

            if (json_data["state"] == "1") {
                TempData["link"] = json_data["link"];

                var remoteIpAddress = HttpContext.Connection.RemoteIpAddress;
                PaymentLogModel logModel = new PaymentLogModel();
                logModel.UserId = SessionManager.Instance.Get("UserId");
                //logModel.Amount = Convert.ToDouble(tutar);
                logModel.OrderId = orderId;
                //logModel.Result = Convert.ToInt32(islem_sonucu);
                //logModel.Hash = hash;
                logModel.IpAddress = remoteIpAddress.ToString();
                //logModel.M5val = md5Val;
                logModel.Date = DateTime.Now;
                logModel.SystemMessage = "";
                logModel.PaymentMethod = 1;
                logModel.IsIncoming = true;

                var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("PaymentLog", "Save", JsonConvert.SerializeObject(logModel)));
                return RedirectToAction("PayRedirect");
            } else {
                TempData["ErrorMsg"] = string.Format("{0} - {1}", json_data["error_code"], json_data["message"]);
                return RedirectToAction("PayLinkFailed");
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
        public ActionResult PayCallBack(string siparis_id, string tutar, string islem_sonucu, string islem_mesaji, string hash) {
            string bayiiKey = "h912yNSj9";
            string md5Val =
                md5(this.Base64Encode(bayiiKey.Substring(0, 7) + siparis_id.Substring(0, 5) + tutar + islem_sonucu));

            var remoteIpAddress = HttpContext.Connection.RemoteIpAddress;
   
            PaymentLogModel logModel = new PaymentLogModel();
            logModel.UserId = SessionManager.Instance.Get("UserId");
            logModel.Amount = Convert.ToDouble(tutar);
            logModel.OrderId = siparis_id;
            logModel.Result = Convert.ToInt32(islem_sonucu);
            logModel.Hash = hash;
            logModel.IpAddress = remoteIpAddress.ToString();
            logModel.M5val = md5Val;
            logModel.Date = DateTime.Now;
            logModel.SystemMessage = islem_mesaji;
            logModel.PaymentMethod = 1;
            logModel.IsIncoming = true;

            var response = JsonConvert.DeserializeObject<Response<HttpStatusCode>>(UiRequestManager.Instance.Post("PaymentLog", "Save", JsonConvert.SerializeObject(logModel)));

            string ip = null;
            bool hasIP = false;

            foreach (string item in CALLBACK_IP) {
                if (ip == item) {
                    hasIP = true;
                    break;
                }
            }

            if (hasIP == false || hash != md5Val) {
                //Response.Write('4');
                return View();
            }


            // burada örnek bir row yapıyorum burasını yukarıdaki gibi değiştirebilirsiniz
            Dictionary<string, string> res = new Dictionary<string, string>();
            res.Add("tutar", "3.50");
            res.Add("siparis_id", "b3JkZXJfNTVkNDRhZDFlOTkzNA==");
            //if(!$res){
            //    die('2'); 
            //NOT: MYSQL kontrolünün csharp karşılığı yazılacak.
            //}
            if (tutar != res["tutar"]) {
                //Response.Write('5');
                return View();
            }
            // burada kendinize özel bir kontrol yapıp eğer hatalı sonuç döndürürse ekrana 3 yazabilirsiniz. örn: die('3') gibi...
            // ...

            // eğer tüm kontroller tamamsa

            //Response.Write('1');
            return View();
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
    }
}
