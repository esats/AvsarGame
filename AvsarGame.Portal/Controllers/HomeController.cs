using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using AvsarGame.Portal.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Controllers {
    public class HomeController : BaseController {
        public IActionResult Index() {
            HomeModel model = new HomeModel();
            model.Announcements = JsonConvert.DeserializeObject<List<AnnouncementModel>>(UiRequestManager.Instance.Get("Announcement", "UiAnnouncementList"));
            model.NewGames = JsonConvert.DeserializeObject<List<GameModel>>(UiRequestManager.Instance.Get("Game", "NewGames"));
            model.Categories = JsonConvert.DeserializeObject<List<CategoryModel>>(UiRequestManager.Instance.Get("Category", "UiCategoryList"));
            model.KnightCyberItems = JsonConvert.DeserializeObject<List<KnightCyberRingAddversimentModel>>(UiRequestManager.Instance.Get("Addversiment", "UiKnightCyberList"));
            model.KnightItems = JsonConvert.DeserializeObject<List<KnightItemAddversimentModel>>(UiRequestManager.Instance.Get("Addversiment", "UiKnightItemList"));

            return View(model);
        }

        [Route("oyun/{Name}")]
        public IActionResult CategoryDetail(string Name) {
            CategoryGameModel categoryWithGames =
                    JsonConvert.DeserializeObject<CategoryGameModel>(UiRequestManager.Instance.Get(string.Format("Category/GetCategoryWithGames?SeoName={0}", Name)));

            return View(categoryWithGames);
        }

        [Route("oyun/{category}/{name}")]
        public IActionResult GameDetail(string category, string Name) {
            GameModel model =
                    JsonConvert.DeserializeObject<GameModel>(UiRequestManager.Instance.Get(string.Format("Game/GameDetail?category={0}&name={1}", category, Name)));

            return View(model);
        }

        public ActionResult Test() {
            return View();
        }

        [Route("yardim")]
        public IActionResult Support() {
            return View();
        }

        [Route("odeme-yontemleri")]
        public IActionResult Methods() {
            return View();
        }

        [Route("satis-yap/{Name}")]
        public IActionResult Sell(string Name) {
            SessionManager.Instance.set("returnUrl", "/satis-yap/" + Name);
            SessionManager.Instance.Remove("chart");
            GameModel model =
                    JsonConvert.DeserializeObject<GameModel>(UiRequestManager.Instance.Get(string.Format("Game/GetGameWithGames?SeoName={0}", Name)));

            return View(model);
        }

        [HttpGet]
        public JsonResult Search(string term) {
            SearchModel model =
                    JsonConvert.DeserializeObject<SearchModel>(UiRequestManager.Instance.Get(string.Format("Search/GetItems?term={0}", term)));

            return Json(model);
        }

        [Route("ilan/knight-item/detay/{Id}")]
        public ActionResult KnightItemDetail(int Id) {
            AddversimentDetailModel model =
                    JsonConvert.DeserializeObject<AddversimentDetailModel>(UiRequestManager.Instance.Get(string.Format("Addversiment/KnightItemDetail/{0}", Id)));

            return View("AddversimentDetail",model);
        }

        [Route("ilan/knight-cyber-ring/detay/{Id}")]
        public ActionResult KnightCyberDetail(int Id) {
            AddversimentDetailModel model =
                    JsonConvert.DeserializeObject<AddversimentDetailModel>(UiRequestManager.Instance.Get(string.Format("Addversiment/KnightCyberDetail/{0}", Id)));

            return View("AddversimentDetail",model);
        }
    }
}