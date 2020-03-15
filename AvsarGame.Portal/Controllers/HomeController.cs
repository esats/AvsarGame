using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Portal.Helpers;
using AvsarGame.Portal.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Controllers {
    public class HomeController : Controller {
        public IActionResult Index() {
            HomeModel model = new HomeModel();
            model.Announcements = JsonConvert.DeserializeObject<List<AnnouncementModel>>(UiRequestManager.Instance.Get("Announcement", "UiAnnouncementList"));
            model.Games = JsonConvert.DeserializeObject<List<GameModel>>(UiRequestManager.Instance.Get("Game", "UiGameList"));
            model.NewGames = JsonConvert.DeserializeObject<List<GameModel>>(UiRequestManager.Instance.Get("Game", "NewGames"));
            model.Categories = JsonConvert.DeserializeObject<List<CategoryModel>>(UiRequestManager.Instance.Get("Category", "UiCategoryList"));

            return View(model);
        }

        [Route("oyun/{Name}")]
        public IActionResult CategoryDetail(string Name) {
            CategoryGameModel categoryWithGames  = JsonConvert.DeserializeObject<CategoryGameModel>(UiRequestManager.Instance.Get(string.Format("Category/GetCategoryWithGames?SeoName={0}",Name)));

            return View(categoryWithGames);
        }
    }
}