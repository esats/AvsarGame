using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AvsarGame.Portal.Core {
    public class LoginFilter : IAuthorizationFilter {
        public void OnAuthorization(AuthorizationFilterContext context) {
            //Check Session is Empty Then set as Result is HttpUnauthorizedResult 
            var isAuthenticate = SessionManager.Instance.Get("bearer");
            if (String.IsNullOrEmpty(isAuthenticate)) {
                context.Result = new RedirectToActionResult("Index", "admin/Account", null);
            }
        }
    }
}