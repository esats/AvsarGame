using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.ViewComponents
{
    public class HeaderCategoryViewComponent:ViewComponent
    {
        public IViewComponentResult Invoke() {
            List<CategoryModel>  categories = JsonConvert.DeserializeObject<List<CategoryModel>>(UiRequestManager.Instance.Get("Category", "UiCategoryList"));

            return View(categories);
        }
    }
}
