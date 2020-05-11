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
        public IActionResult Filter(string server, string characterFeature, string charactertype, double mintl, double maxtl, string word) {
            BaseFilterModel model = new BaseFilterModel();
            model.Data = JsonConvert.DeserializeObject<List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>>>
            (UiRequestManager.Instance.Get(
                    string.Format(
                            "Addversiment/FilerKnightCyberRings?server={0}&characterFeature={1}&charactertype={2}&mintl={3}&maxtl={4}&word={5}",
                            server, characterFeature, charactertype, mintl, maxtl, word)));

            FilterDataModel filter = new FilterDataModel();
            filter.MinPrice = mintl;
            filter.MaxPrice = maxtl;
            filter.Server = server;
            filter.CharacterFeature = characterFeature;
            filter.CharacterType = charactertype;
            filter.Word = word;

            return View(model);
        }
    }
}