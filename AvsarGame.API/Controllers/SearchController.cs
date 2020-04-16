using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Dal.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/Search")]
    public class SearchController : ControllerBase {
        private readonly IGame _game;
        private readonly ICategory _category;

        public SearchController(IGame game, ICategory category) {
            _game = game;
            _category = category;
        }


        [HttpGet]
        [AllowAnonymous]
        [Route("GetItems")]
        public SearchModel GetItems(string term) {
            SearchModel model= new SearchModel();
            model.Games = (from g in _game.GetList(x => x.Name.Contains(term) && x.IsActive)
                     join c in _category.GetList()
                             on g.CategoryId equals c.Id
                     select new SearchBasicModel() {
                             Name = g.Name,
                             ImgUrl = g.ImageUrl,
                             SeoName = g.SeoName,
                             CategorySeoName = c.SeoName,
                             CategoryName = c.Name,
                     }).ToList();

            model.Categories =  _category.GetList(x => x.Name.Contains(term) && x.IsActive)
                                         .Select(x=> new SearchBasicModel() {
                                             Name=x.Name,
                                             SeoName = x.SeoName,
                                             ImgUrl = x.ImageUrl}).ToList();
            return model;
        }
    }
}