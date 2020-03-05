using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AvsarGame.API.Base {
    public class HttpRequestManager {
        public static HttpRequestManager Instance { get; set; }
        public HttpContext httpContext { get; set; }
        static HttpRequestManager() {
            Instance = new HttpRequestManager();
        }

        public string Get(string Url,string bearer) {
            return this.SendHttpRequest(Url, null, HttpRequestTypesEnum.Get, null,bearer);
        }

        //custom method with action paramters
        public string Post(string Url, string actionName, string Data) {
            return this.SendHttpRequest(Url, actionName, HttpRequestTypesEnum.Post, Data,null);
        }

        public async Task<string> PostAsync(string Url, string actionName, string Data) {
            return await this.SendHttpRequestAsync(Url, actionName, HttpRequestTypesEnum.Post, Data);
        }

        protected string SendHttpRequest(string Url, string actionName, HttpRequestTypesEnum Type, string Data,string token) {
            string response = null;
          
            HttpWebRequest request = (HttpWebRequest) WebRequest.Create(Url);
            request.Method = Type.ToString().ToUpper();
            request.ContentType = "application/json; ";
            request.Timeout = Int32.MaxValue;
            request.Headers.Add(HttpRequestHeader.Authorization,"Bearer " + token);

            if (Type == HttpRequestTypesEnum.Post) {
                Stream requestStream = request.GetRequestStream();
                StreamWriter writer = new StreamWriter(requestStream);
                writer.Write(Data);
                writer.Close();
            }

            try {
                WebResponse httpResponse = request.GetResponse();

                using (var reader = new StreamReader(httpResponse.GetResponseStream())) {
                    var jsonResult = reader.ReadToEnd();
                    response = jsonResult.ToString();
                }
            } catch (WebException ex) {
                string errMessage = ex.Message;
                response = errMessage;

                if (ex.Response != null) {
                    Stream resStr = ex.Response.GetResponseStream();
                    StreamReader sr = new StreamReader(resStr);
                    string soapResponse = sr.ReadToEnd();
                    sr.Close();
                    resStr.Close();
                    errMessage += Environment.NewLine + soapResponse;
                    response = errMessage;
                    ex.Response.Close();
                }
            }

            return response;
        }

        public async Task<string> SendHttpRequestAsync(string Url, string actionName, HttpRequestTypesEnum Type, string Data) {
            string response = null;
            HttpWebRequest request = (HttpWebRequest) WebRequest.Create(Url);
            request.Method = Type.ToString().ToUpper();
            request.ContentType = "application/json";
            request.Timeout = Int32.MaxValue;

            if (Type == HttpRequestTypesEnum.Post) {
                Stream requestStream = await request.GetRequestStreamAsync();
                StreamWriter writer = new StreamWriter(requestStream);
                await writer.WriteAsync(Data);
                writer.Close();
            }

            try {
                WebResponse httpResponse = await request.GetResponseAsync();

                using (var reader = new StreamReader(httpResponse.GetResponseStream())) {
                    var jsonResult = await reader.ReadToEndAsync();
                    response = jsonResult.ToString();
                }
            } catch (WebException ex) {
                string errMessage = ex.Message;
                response = errMessage;

                if (ex.Response != null) {
                    Stream resStr = ex.Response.GetResponseStream();
                    StreamReader sr = new StreamReader(resStr);
                    string soapResponse = await sr.ReadToEndAsync();
                    sr.Close();
                    resStr.Close();
                    errMessage += Environment.NewLine + soapResponse;
                    response = errMessage;
                    ex.Response.Close();
                }
            }

            return response;
        }
    }

    public enum HttpRequestTypesEnum {
        Get = 0,
        Post
    }
}