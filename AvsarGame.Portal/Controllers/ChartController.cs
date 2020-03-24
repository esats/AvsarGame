using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Controllers {
    [Route("Sepetim")]
    public class ChartController : Controller {
        public IActionResult Index() {
            var chart = SessionManager.Instance.GetObject<List<GameModel>>("chart");
            if (chart == null) {
                return RedirectToAction("Index", "Home");
            }

            return View(chart);
        }

        [HttpPost]
        [Route("AddChart")]
        public JsonResult AddChart(GameModel model) {
            List<GameModel> products = new List<GameModel>();
            try {
                var chart = SessionManager.Instance.GetObject<List<GameModel>>("chart");
                if (chart?.Count(x => x.Id == model.Id) > 0) {
                    return Json(new { Success = true, chart.Count });
                } else {
                    products = chart ?? products;
                    products.Add(model);
                    SessionManager.Instance.SetObject("chart", products);
                    return Json(new { Success = true, Count = products.Count });
                }
            } catch (Exception e) {
                return Json(new { Success = false });
            }
        }

        [HttpGet]
        [Route("GetChartDetail")]
        public JsonResult GetChartDetail() {
            List<GameModel> list = SessionManager.Instance.GetObject<List<GameModel>>("chart");
            return Json(new { Success = true, data = list });
        }

        public string ConvertToString<T>(List<T> Items) {
            string result = string.Empty;

            foreach (T item in Items) {
                result += item.ToString() + ",";
            }

            return result.TrimEnd(',');
        }

    }
}