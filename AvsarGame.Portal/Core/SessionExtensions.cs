using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Core {
    public class SessionManager : SingletonBase<SessionManager> {
        internal HttpContextAccessor _ctx;

        public HttpContextAccessor Context {
            get {
                if (_ctx == null) {
                    _ctx = new HttpContextAccessor();
                }

                return _ctx;
            }
        }

        public string Get(string key) {
            return Context.HttpContext.Session.GetString(key);
        }

        public void set(string key, string value) {
            Context.HttpContext.Session.SetString(key, value);
        }

        public void SetObject(string key, object value) {
            Context.HttpContext.Session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public T GetObject<T>(string key) {
            var value = Context.HttpContext.Session.GetString(key);
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }

        public void Remove(string key) {
            Context.HttpContext.Session.Remove(key);
        }

        public bool IsAuthenticate() {
            return Get("bearer") != null;
        }

        public string GetUserId() {
            return Get("UserId");
        }

        public string GetFullName() {
            return Get("FullName");
        }

        public void Clear()
        {
            Context.HttpContext.Session.Clear();
        }
    }
}