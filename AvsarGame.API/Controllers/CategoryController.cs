﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
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
    [Authorize(Roles = "Admin")]
    public class CategoryController : APIControllerBase {
        private readonly ICategory _category;
        private readonly IGame _game;
        private readonly IMapper _mapper;

        public CategoryController(ICategory category, IGame game, IMapper mapper) {
            _category = category;
            _game = game;
            _mapper = mapper;
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
                    var oldCatedory = _category.GetT(x=>x.Id == model.Id);
                    Category entity = new Category() {
                            Id = model.Id,
                            ImageUrl = model.ImageUrl ?? oldCatedory.ImageUrl,
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
                return StatusCode(404);
            }

            return StatusCode(200);
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
            } catch (Exception e) {
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
    }
}