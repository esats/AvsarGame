using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.ViewComponents {
    [ViewComponent]
    public class UserOrderViewComponent : ViewComponent {

        public IViewComponentResult Invoke(string id) {
            UserOrdersModel UserOrders =   JsonConvert.DeserializeObject<UserOrdersModel>(UiRequestManager.Instance.Get(String.Format("UserOrder/GetOne/{0}", id)));

            return View(UserOrders);
        }
    }
}