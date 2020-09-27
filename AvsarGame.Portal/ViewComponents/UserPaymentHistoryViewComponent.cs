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
    public class UserPaymentHistoryViewComponent : ViewComponent {

        public IViewComponentResult Invoke(string id) {
            List<UserPaymentHistoryModel> paymentsHistory = JsonConvert.DeserializeObject<List<UserPaymentHistoryModel>>(UiRequestManager.Instance.Get(String.Format("UserBalance/GetUserPaymentHistory/{0}", id)));

            return View(paymentsHistory);
        }
    }
}