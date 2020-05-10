using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Controllers {
    public class FilterController : BaseController {

        [Route("ilanlar/knight-cyber-rings")]
        public IActionResult Filter(string server,string characterFeature, string charactertype,double mintl, double maxtl, string word) {
            var response = JsonConvert.DeserializeObject<List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>>>
            (UiRequestManager.Instance.Get(
                    string.Format(
                            "Addversiment/FilerKnightCyberRings?server={0}&characterFeature={1}&characterFeature={2}&characterFeature={3}&characterFeature={4}&characterFeature={5}",
                            server, characterFeature, charactertype, mintl, maxtl, word)));
                    
            return View(response);
        }
    }
}