using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.Portal.ViewComponents {
    [ViewComponent]
    public class ChartCountViewComponent : ViewComponent {

        public string Invoke() {
            var chart = SessionManager.Instance.GetObject<List<GameModel>>("chart");
            var count = String.Format("({0})", chart?.Count ?? 0);
            return count;
        }
    }
}