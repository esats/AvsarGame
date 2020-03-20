using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Entities.Entities;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers
{
    public class UserManagementController : BaseAdminController
    {
        public IActionResult Index() {
            var response = JsonConvert.DeserializeObject<List<UserManagementModel>>(UiRequestManager.Instance.Get("UserManagement", "List"));
            return View(response);
        }
    }
}