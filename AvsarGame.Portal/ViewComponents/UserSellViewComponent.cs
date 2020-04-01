using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.ViewComponents {
    public class UserSellViewComponent : ViewComponent {

        public IViewComponentResult Invoke(string id) {
            UserOrdersModel userSells = JsonConvert.DeserializeObject<UserOrdersModel>(UiRequestManager.Instance.Get(String.Format("UserOrder/GetUserSell/{0}", id)));

            return View(userSells);
        }
    }
}