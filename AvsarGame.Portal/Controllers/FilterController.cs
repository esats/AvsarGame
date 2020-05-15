using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using AvsarGame.Portal.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Controllers {
    public class FilterController : BaseController {
        [Route("ilanlar/knight-cyber-rings")]
        public IActionResult FilterCyber(string server, string characterFeature, string charactertype, double mintl, double maxtl, string word, int orderby = 0) {
            BaseFilterModel model = new BaseFilterModel();
            model.Data = JsonConvert.DeserializeObject<List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>>>
            (UiRequestManager.Instance.Get(
                    string.Format(
                            "Addversiment/FilterKnightCyberRings?server={0}&characterFeature={1}&charactertype={2}&mintl={3}&maxtl={4}&word={5}&orderby={6}",
                            server, characterFeature, charactertype, mintl, maxtl, word, orderby)));

            FilterDataModel filter = new FilterDataModel();
            filter.MinPrice = mintl;
            filter.MaxPrice = maxtl;
            filter.Server = server;
            filter.CharacterFeature = characterFeature;
            filter.CharacterType = charactertype;
            filter.Word = word;
            filter.OrderBy = orderby;
            model.Filter = filter;
            return View(model);
        }

        [Route("ilanlar/knight-items")]
        public IActionResult FilterItem(string server, string arti, double mintl, double maxtl, string word, int orderby = 0) {
            BaseFilterModel model = new BaseFilterModel();
            model.DataKnightItem = JsonConvert.DeserializeObject<List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>>>
            (UiRequestManager.Instance.Get(
                    string.Format(
                            "Addversiment/FilterKnightItems?server={0}&arti={1}&mintl={2}&maxtl={3}&word={4}&orderby={5}",
                            server, arti, mintl, maxtl, word, orderby)));

            FilterDataModel filter = new FilterDataModel();
            filter.MinPrice = mintl;
            filter.MaxPrice = maxtl;
            filter.Server = server;
            filter.Plus = arti;
            filter.Word = word;
            filter.OrderBy = orderby;
            model.Filter = filter;

            return View(model);
        }

        [Route("oyunlar")]
        public IActionResult AllGame(int orderby = 0) {
            AllCategoryModel model = new AllCategoryModel();
            model.Categories = JsonConvert.DeserializeObject<List<CategoryModel>>
            (UiRequestManager.Instance.Get(
                    string.Format(
                            "Category/AllCategories?orderBy={0}",
                             orderby)));

            FilterDataModel filter = new FilterDataModel();
            filter.OrderBy = orderby;
            model.Filter = filter;

            return View(model);
        }
    }
}