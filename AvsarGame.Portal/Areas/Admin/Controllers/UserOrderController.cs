﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers {
    public class UserOrderController : BaseAdminController {
        public IActionResult Index() {
            List<UserOrdersModel> model = JsonConvert.DeserializeObject<List<UserOrdersModel>>(UiRequestManager.Instance.Get("UserOrder", "List"));
            return View(model);
        }
    }
}