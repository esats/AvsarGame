using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.Portal.ViewComponents {
    [ViewComponent]
    public class UserOrderViewComponent : ViewComponent {

        public IViewComponentResult Invoke(string id) {
            return View();
        }
    }
}