using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.Portal.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Helpers {
    public class UiRequestManager {
        protected string BaseApiUrl { get; set; }
        public static UiRequestManager Instance { get; set; }
        public static IConfiguration Configuration { get; set; }
        public string BearerToken => SessionManager.Instance.Get("bearer");

        protected UiRequestManager(IConfiguration configuration) {
            Configuration = configuration;
        }

        static UiRequestManager() {
            Instance = new UiRequestManager();
        }

        protected UiRequestManager() {
        #if DEBUG
            this.BaseApiUrl = "http://localhost:30667/api";
            //this.BaseApiUrl = "http://api.anatoliagame.com/api";
        #else
            this.BaseApiUrl = "http://api.anatoliagame.com/api";
        #endif
        }

        public string Get(string ControllerName, string actionName, Guid? Id = null) {
            string url = this.BaseApiUrl + "/" + ControllerName + "/" + actionName;
            

            if (Id.HasValue) {
                url += "/" + Id.ToString();
            }

            string response = HttpRequestManager.Instance.Get(url, BearerToken);
            return response;
        }

        public string Get(string ControlerName, string actionName, string QueryString) {
            string url = this.BaseApiUrl + "/" + ControlerName + "/" + actionName + QueryString;
            string response = HttpRequestManager.Instance.Get(url, BearerToken);
            return response;
        }

        public string Get(string ControllerName, string actionName, params string[] Parameters) {
            string url = this.BaseApiUrl + "/" + ControllerName + "/" + actionName;

            if (Parameters != null && Parameters.Length != 0) {
                foreach (string parameter in Parameters) {
                    url += "/" + parameter;
                }
            }

            string response = HttpRequestManager.Instance.Get(url, BearerToken);
            return response;
        }
        public string Get(string ControllerName, int? Id = null)
        {
            string url = this.BaseApiUrl + "/" + ControllerName;

            if (Id.HasValue)
            {
                url += "/" + Id.ToString();
            }

            string response = HttpRequestManager.Instance.Get(url,BearerToken);
            return response;
        }

        public T Get<T>(string ControllerName, string actionName, Guid Id) {
            string response = this.Get(ControllerName, actionName, Id);
            try {
                T obj = JsonConvert.DeserializeObject<T>(response);
                return obj;
            } catch (Exception ex) {
                throw new Exception(response, ex);
            }
        }

        public T Get<T>(string ControlerName, string actionName, string QueryString) {
            string url = this.BaseApiUrl + "/" + ControlerName + QueryString;
            string response = HttpRequestManager.Instance.Get(url, BearerToken);

            try {
                T obj = JsonConvert.DeserializeObject<T>(response);
                return obj;
            } catch (Exception ex) {
                throw new Exception(response, ex);
            }
        }

        public T Get<T>(string ControllerName, string actionName, params string[] Parameters) {
            string response = this.Get(ControllerName, actionName, Parameters);
            try {
                T obj = JsonConvert.DeserializeObject<T>(response);
                return obj;
            } catch (Exception ex) {
                throw new Exception(response, ex);
            }
        }

        public List<T> Get<T>(string ControllerName, string actionName) {
            string response = this.Get(ControllerName, actionName);
            try {
                List<T> obj = JsonConvert.DeserializeObject<List<T>>(response);
                return obj;
            } catch (Exception ex) {
                throw new Exception(response, ex);
            }
        }

        public string Post(string ControllerName, string actionName, string Data) {
            string url = this.BaseApiUrl + "/" + ControllerName + "/" + actionName;
            string response = HttpRequestManager.Instance.Post(url, actionName, Data,BearerToken);
            return response;
        }

        public async Task PostAsync(string ControllerName, string actionName, string Data) {
            string url = this.BaseApiUrl + "/" + ControllerName + "/" + actionName;
            await HttpRequestManager.Instance.PostAsync(url, actionName, Data,BearerToken);
        }

        public T Post<T>(string ControllerName, string actionName, string Data) {
            string response = this.Post(ControllerName, actionName, Data);

            try {
                T obj = JsonConvert.DeserializeObject<T>(response);
                return obj;
            } catch (Exception ex) {
                throw new Exception(response, ex);
            }
        }

        public List<T> PostList<T>(string ControllerName, string actionName, string Data) {
            string response = this.Post(ControllerName, actionName, Data);

            try {
                List<T> obj = JsonConvert.DeserializeObject<List<T>>(response);
                return obj;
            } catch (Exception ex) {
                throw new Exception(response, ex);
            }
        }

        public T Post<T>(string ControllerName, string actionName, IModelBase Data) {
            string json = JsonConvert.SerializeObject(Data);
            T obj = this.Post<T>(ControllerName, actionName, json);
            return obj;
        }

        public List<T> PostList<T>(string ControllerName, string actionName, IModelBase Data) {
            string json = JsonConvert.SerializeObject(Data);
            List<T> obj = this.PostList<T>(ControllerName, actionName, json);
            return obj;
        }
    }
}