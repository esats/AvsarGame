using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace AvsarGame.Portal.Core {
    public static class SmsHelper {

        public static void SendSms(string no, string msg, string msgheader) {
            //string url = @"https://api.netgsm.com.tr/sms/send/otp/?usercode=8503076248&password=KRVSRVCR" + "&no=" + no + "&msg=" + msg + "&msgheader=" + 8503076248;

            //HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            //request.AutomaticDecompression = DecompressionMethods.GZip;

            //using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            //using (Stream stream = response.GetResponseStream())
            //using (StreamReader reader = new StreamReader(stream)) {
            //    var res = reader.ReadToEnd().ToString().Split(" ")[0];
            //    SessionManager.Instance.set("smsSendResult", res);
            //}
        }

        public static void SendSmsForPhoneNumber(string phoneNumber) {
            SendSms(phoneNumber, "AnatoliaGame Onay Kodunuz: " + GeneraterNumber(), "");
        }

        public static int GeneraterNumber() {
            Random generator = new Random();
            var random = generator.Next(0, 999999);
            SessionManager.Instance.set("sendedConfirmNumber", random.ToString());
            return random;
        }
    }
}
