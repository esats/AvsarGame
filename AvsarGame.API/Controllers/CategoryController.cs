using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Core;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace AvsarGame.API.Controllers {
    [Route("api/Category")]
    [Produces("application/json")]
    [Authorize(Roles = "Admin")]
    public class CategoryController : APIControllerBase {
        private readonly ICategory _category;
        private readonly IGame _game;
        private readonly IMapper _mapper;
        private IMemoryCache _cache;

        public CategoryController(ICategory category, IGame game, IMapper mapper, IMemoryCache cache) {
            _category = category;
            _game = game;
            _mapper = mapper;
            _cache = cache;
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
                        Id = entity.Id,
                        Type = entity.Type
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
            if (_cache.Get("uicategorylist") == null) {
                var entities = _category.GetList(x => x.IsActive == true).Take(12);
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

                _cache.Set("uicategorylist", list);
            } else {
                list = _cache.Get<List<CategoryModel>>("uicategorylist");
            }

            return list;
        }

        [HttpPost]
        [Route("Save")]
        public Response<HttpStatusCode> Save([FromBody] CategoryModel model) {
            Response<HttpStatusCode> baseResponse = new Response<HttpStatusCode>();
            try
            {
                var isAnyKnight = _category.GetT(x => x.IsActive && x.Type == (int)GameType.KNIGHTONLINE);
                
                if (isAnyKnight != null && model.Type == (int)GameType.KNIGHTONLINE)
                {
                    baseResponse.IsSuccess = false;
                    baseResponse.Message = "Knight Online Kategorisinden 1 Adet Seçebilirsiniz!";
                    baseResponse.Value = HttpStatusCode.BadRequest;
                    return baseResponse;
                }
                if (model.Id != Guid.Empty) {
                    var oldCategory = _category.GetT(x => x.Id == model.Id);
                    Category entity = new Category() {
                            Id = model.Id,
                            ImageUrl = model.ImageUrl ?? oldCategory.ImageUrl,
                            Description = model.Description,
                            Name = model.Name,
                            SeoName = UrlExtension.FriendlyUrl(model.Name),
                            ModifiedBy = base.GetUser(),
                            ModifiedDate = DateTime.Now,
                            Type = model.Type
                    };
                    _category.Update(entity);
                } else {
                    Category entity = new Category() {
                            ImageUrl = model.ImageUrl,
                            Description = model.Description,
                            Name = model.Name,
                            SeoName = UrlExtension.FriendlyUrl(model.Name),
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser(),
                            Type = model.Type
                    };
                    _category.Add(entity);
                }
            } catch (Exception e) {
                baseResponse.IsSuccess = false;
                baseResponse.Message = "Beklenmedik Bir Hata Oluştu! Lütfen Daha Sonra Tekrar Deneyiniz.";
                baseResponse.Value = HttpStatusCode.BadRequest;
                return baseResponse;
            }
            _cache.Remove("uicategorylist");
            baseResponse.IsSuccess = true;
            baseResponse.Message = "İşlem Başarılı!";
            baseResponse.Value = HttpStatusCode.OK;
            return baseResponse;
        }

        [HttpGet]
        [Route("GetCategoryWithGames")]
        [AllowAnonymous]
        public CategoryGameModel GetCategoryWithGames(string SeoName) {
            CategoryGameModel categoryGameModel = new CategoryGameModel();
            try {
                var category = _category.GetT(x => x.SeoName == SeoName && x.IsActive == true);
                var games = _game.GetList(x => x.CategoryId == category.Id && x.IsActive == true);

                categoryGameModel.Games = _mapper.Map<List<GameModel>>(games);
                categoryGameModel.Category = _mapper.Map<CategoryModel>(category);
            } catch (Exception e) {
                throw new Exception(e.Message);
            }

            return categoryGameModel;
        }

        [HttpPost]
        [Route("Delete")]
        public ActionResult Delete([FromBody] Guid id) {
            try {
                Category entity = _category.GetT(x => x.Id == id && x.IsActive == true);
                entity.IsActive = false;
                _category.Update(entity);
                var Games = _game.GetList(x => x.CategoryId == entity.Id && x.IsActive == true).ToList();
                foreach (var game in Games)
                {
                    game.IsActive = false;
                    _game.Update(game);
                }
            }
            catch (Exception e) {
                return StatusCode(404);
            }

            return StatusCode(200);
        }

        [HttpGet]
        [Route("HeaderCategories")]
        [AllowAnonymous]
        public List<CategoryModel> HeaderCategories() {
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

        
        [HttpGet]
        [Route("AllCategories")]
        [AllowAnonymous]
        public List<CategoryModel> AllCategories(int orderby) {
            List<CategoryModel> list = new List<CategoryModel>();
            FilterDataModel filter = new FilterDataModel();
            filter.OrderByDescription  = GetDescription<FilterOrderBy>((FilterOrderBy)orderby);
            var entities = _category.GetCategoriesByFilter(filter);
            foreach (var entity in entities) {
                if (entity.IsActive == true)
                {
                    CategoryModel model = new CategoryModel()
                    {
                        ImageUrl = entity.ImageUrl,
                        Description = entity.Description,
                        Name = entity.Name,
                        SeoName = entity.SeoName,
                        Id = entity.Id
                    };
                    list.Add(model);

                }
            }
            return list;
        }
    }
}