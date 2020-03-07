using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using Microsoft.AspNetCore.Http;

namespace AvsarGame.Portal.Core {
    public class SessionManager : SingletonBase<SessionManager> {
        internal  HttpContextAccessor _ctx;

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

        public void set(string key,string value) {
            Context.HttpContext.Session.SetString(key,value);
        }
    }
}