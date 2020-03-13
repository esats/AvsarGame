using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/Category")]
    [Produces("application/json")]
    public class CategoryController : APIControllerBase {
        private readonly ICategory _category;

        public CategoryController(ICategory category) {
            _category = category;
        }

        [HttpGet]
        [Route("List")]
        public List<CategoryModel> List() {
            List<CategoryModel> list = new List<CategoryModel>();
            var entities = _category.GetList(x => x.IsActive == true);
            foreach (var entity in entities) {
                CategoryModel model = new CategoryModel() {
                        ImageUrl = entity.ImageUrl,
                        Description = entity.Description,
                        Name = entity.Name,
                        Id = entity.Id
                };
                list.Add(model);
            }

            return list;
        }

        [HttpGet]
        [Route("UiCategoryList")]
        [AllowAnonymous]
        public List<CategoryModel> UiCategoryList() {
            List<CategoryModel> list = new List<CategoryModel>();
            var entities = _category.GetList(x => x.IsActive == true);
            foreach (var entity in entities) {
                CategoryModel model = new CategoryModel() {
                        ImageUrl = entity.ImageUrl,
                        Description = entity.Description,
                        Name = entity.Name,
                        SeoName = entity.SeoName,
                        Id = entity.Id
                };
                list.Add(model);
            }

            return list;
        }

        [HttpPost]
        [Route("Save")]
        public ActionResult Save([FromBody] CategoryModel model) {
            try {
                if (model.Id != Guid.Empty) {
                    Category entity = new Category() {
                            Id = model.Id,
                            ImageUrl = model.ImageUrl,
                            Description = model.Description,
                            Name = model.Name,
                            SeoName = UrlExtension.FriendlyUrl(model.Name),
                            ModifiedBy = base.GetUser(),
                            ModifiedDate = DateTime.Now
                    };
                    _category.Update(entity);
                } else {
                    Category entity = new Category() {
                            ImageUrl = model.ImageUrl,
                            Description = model.Description,
                            Name = model.Name,
                            SeoName = UrlExtension.FriendlyUrl(model.Name),
                            CreatedDate =DateTime.Now,
                            CreatedBy = base.GetUser()
                    };
                    _category.Add(entity);
                }
            } catch (Exception e) {
                return StatusCode(404);
            }

            return StatusCode(200);
        }
       
        [HttpGet]
        [Route("GetCategoryWithGames?SeoName={SeoName}")]
        [AllowAnonymous]
        public async Task<Response<CategoryModel>> GetCategoryWithGames(string SeoName) {
            Response<GameModel> bookResponse = new Response<GameModel>();
            //Games entity = await _category.GetTAsync(x => .SeoName == SeoName && x.IsActive == true);

            return null;
        }

        [HttpPost]
        [Route("Delete")]
        public ActionResult Delete([FromBody] Guid id) {
            try {
                Category entity = _category.GetT(x => x.Id == id && x.IsActive == true);
                entity.IsActive = false;
                _category.Update(entity);
            } catch (Exception e) {
                return StatusCode(404);
            }

            return StatusCode(200);
        }
    }
}