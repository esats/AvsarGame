using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.ViewComponents
{
    public class HeaderViewComponent:ViewComponent
    {
        public IViewComponentResult Invoke() {
            List<GameModel> games = JsonConvert.DeserializeObject<List<GameModel>>(UiRequestManager.Instance.Get("Game", "HeaderList"));

            return View(games);
        }
    }
}
