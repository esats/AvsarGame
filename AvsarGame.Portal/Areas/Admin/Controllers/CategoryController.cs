﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Portal.Core;
using AvsarGame.Portal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Areas.Admin.Controllers {
   
    public class CategoryController : BaseAdminController {
        public IActionResult Index() {
            var response = JsonConvert.DeserializeObject<List<CategoryModel>>(UiRequestManager.Instance.Get("Category", "List"));
            return View(response);
        }

        [HttpPost]
        public async Task<JsonResult> Save(CategoryModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try {
                if (model.Image != null) {
                    model.ImageUrl =await FileManager.Instance.Save(model.Image);
                }
                response =
                      JsonConvert.DeserializeObject<Response<HttpStatusCode>>(
                              UiRequestManager.Instance.Post("Category", "Save", JsonConvert.SerializeObject(model)));
            } catch (Exception e) {
                return Json(new{Success = false, data=response });
            }

            return Json(new{Success = true, data =response});
        }

        [HttpPost]
        public JsonResult Delete(Guid id) {
            try
            {
                var responseSaving = UiRequestManager.Instance.Post("Category", "Delete", JsonConvert.SerializeObject(id));
            }
            catch (Exception e)
            {
                return Json(new { Success = false, Message = e.Message });
            }

            return Json(new { Success = true });
        }
    }
}