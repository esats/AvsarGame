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
    [Route("Sepetim")]
    public class ChartController : Controller {

        public IActionResult Index() {
            var chart = SessionManager.Instance.GetObject<List<Guid>>("chart");
            if (chart == null) {
                return null;
            }
            var ids = ConvertToString(chart);
            List<GameModel> games  = JsonConvert.DeserializeObject<List<GameModel>>(UiRequestManager.Instance.Get(string.Format("Game/GetGames?gamesId={0}",ids)));

            return View(games);
        }

        [HttpPost]
        [Route("AddChart")]
        public JsonResult AddChart(Guid id) {
            List<Guid> products = new List<Guid>();
            try {
                var chart = SessionManager.Instance.GetObject<List<Guid>>("chart");
                if (chart?.Count(x => x == id) > 0) {
                    return Json(new { Success = true, chart.Count});
                } else {
                    products = chart ?? products;
                    products.Add(id);
                    SessionManager.Instance.SetObject("chart", products);
                    return Json(new { Success = true, Count = products.Count });

                }
            } catch (Exception e) {
                return Json(new { Success = false });
            }

        }

        public string ConvertToString<T>(List<T> Items)
        {
            string result = string.Empty;

            foreach (T item in Items)
            {
                result += item.ToString() + ",";
            }

            return result.TrimEnd(',');
        }
    }
}