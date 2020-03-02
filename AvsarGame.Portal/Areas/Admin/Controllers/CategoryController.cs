using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers {
    [Area("Admin")]
    public class CategoryController : Controller {
        public IActionResult Index() {
            return View();
        }

        [HttpPost]
        public ActionResult Save(CategoryModel model) {
            try {
                Guid id = Guid.NewGuid();
                var path = Path.Combine(
                        "wwwroot", "Uploads"
                );

                Response<CategoryModel> responseSaving =
                        JsonConvert.DeserializeObject<Response<CategoryModel>>(UiRequestManager.Instance.Post("Category", "Save", JsonConvert.SerializeObject(model)));

                var pathToData = Path.GetFullPath(Path.Combine(path, id + "-" + model.Image.FileName));
                using (var stream = new FileStream(pathToData, FileMode.Create)) {
                    model.Image.CopyToAsync(stream).Wait();
                }
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }

            return RedirectToAction("Index");
        }
    }
}