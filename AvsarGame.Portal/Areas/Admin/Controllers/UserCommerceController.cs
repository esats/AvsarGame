using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers {
    public class UserCommerceController : BaseAdminController {
        public IActionResult Index() {
            return View();
        }

        public IActionResult KnightCommerce() {
            var response = JsonConvert.DeserializeObject<List<GetCommerceRequestDetailModel>>(UiRequestManager.Instance.Get("Addversiment", "KnightCommerceRequest"));
            return View(response);
        }

    }
}
