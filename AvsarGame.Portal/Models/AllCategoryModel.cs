using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace AvsarGame.Portal.Models {
    public class AllCategoryModel {
        public AllCategoryModel() {
            OrderBy = new List<SelectListItem>() {
                    new SelectListItem() { Value = "0", Text = "Artan Fiyat" },
                    new SelectListItem() { Value = "1", Text = "Azalan Fiyat" },
                    new SelectListItem() { Value = "2", Text = "Tarihe Göre En Yeni" },
                    new SelectListItem() { Value = "3", Text = "Tarihe Göre En Eski" }
            };
        }

        public List<CategoryModel> Categories { get; set; }
        public FilterDataModel Filter { get; set; }
        public List<SelectListItem> OrderBy { get; set; }
    }
}