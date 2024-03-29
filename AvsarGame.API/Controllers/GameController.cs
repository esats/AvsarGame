﻿using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("api/Game")]
    [Produces("application/json")]
    public class GameController : APIControllerBase {
        private readonly IGame _game;
        private readonly ICategory _category;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _cache;

        public GameController(IGame game, ICategory category, IMapper mapper, IMemoryCache cache) {
            _game = game;
            _category = category;
            _mapper = mapper;
            _cache = cache;
        }

        [HttpGet]
        [Route("List")]
        public List<GameModel> List() {
            List<GameModel> list = new List<GameModel>();
            var entities = _game.GetList(x => x.IsActive == true);
            var categories = _category.GetList(x => x.IsActive == true);
            foreach (var entity in entities) {
                GameModel model = new GameModel() {
                        Id = entity.Id,
                        ImageUrl = entity.ImageUrl,
                        Description = entity.Description,
                        Name = entity.Name,
                        SellPrice = entity.SellPrice,
                        BuyPrice = entity.BuyPrice,
                        BuyButtonEnabled = entity.BuyButtonEnabled,
                        SellButtonEnabled = entity.SellButtonEnabled,
                        OrderNo = entity.OrderNo,
                        CategoryId = categories.FirstOrDefault(x => x.Id == entity.CategoryId).Id,
                        CategoryName = categories.FirstOrDefault(x => x.Id == entity.CategoryId).Name,
                };
                list.Add(model);
            }

            return list;
        }

        [HttpGet]
        [Route("UiGameList")]
        [AllowAnonymous]
        public List<GameModel> UiGameList() {
            List<GameModel> list = new List<GameModel>();
            if (_cache.Get("uigamelist") == null) {
                var entities = _game.GetList(x => x.IsActive == true);
                foreach (var entity in entities) {
                    GameModel model = new GameModel() {
                            Id = entity.Id,
                            ImageUrl = entity.ImageUrl,
                            Description = entity.Description,
                            Name = entity.Name,
                            SeoName = entity.SeoName,
                            SellPrice = entity.SellPrice,
                            BuyPrice = entity.BuyPrice,
                            BuyButtonEnabled = entity.BuyButtonEnabled,
                            SellButtonEnabled = entity.SellButtonEnabled,
                            OrderNo = entity.OrderNo
                    };
                    list.Add(model);
                }

                _cache.Set("uigamelist", list);
            } else {
                list = _cache.Get<List<GameModel>>("uigamelist");
            }

            return list;
        }

        [HttpGet]
        [Route("NewGames")]
        [AllowAnonymous]
        public List<GameModel> NewGames() {
            List<GameModel> list = new List<GameModel>();
            if (_cache.Get("newgames") == null) {
                var games = _game.GetList(x => x.IsActive == true).OrderBy(x => x.OrderNo).Take(12);
                var categories = _category.GetList(x => x.IsActive == true);

                foreach (var entity in games) {
                    GameModel model = new GameModel() {
                            Id = entity.Id,
                            ImageUrl = entity.ImageUrl,
                            Description = entity.Description,
                            Name = entity.Name,
                            SeoName = entity.SeoName,
                            SellPrice = entity.SellPrice,
                            BuyPrice = entity.BuyPrice,
                            CategoryId = categories.FirstOrDefault(x => x.Id == entity.CategoryId).Id,
                            CategorySeoName = categories.FirstOrDefault(x => x.Id == entity.CategoryId).SeoName
                    };
                    list.Add(model);
                }

                _cache.Set("newgames", list);
            } else {
                list = _cache.Get<List<GameModel>>("newgames");
            }

            return list;
        }

        [HttpPost]
        [Route("Save")]
        public ActionResult Save([FromBody] GameModel model) {
            try {
                if (model.Id != Guid.Empty) {
                    var oldGame = _game.GetT(x => x.Id == model.Id);
                    Games entity = new Games() {
                            Id = model.Id,
                            ImageUrl = model.ImageUrl ?? oldGame.ImageUrl,
                            Description = model.Description,
                            Name = model.Name,
                            SeoName = UrlExtension.FriendlyUrl(model.Name),
                            SellPrice = model.SellPrice,
                            BuyPrice = model.BuyPrice,
                            CategoryId = model.CategoryId,
                            BuyButtonEnabled = model.BuyButtonEnabled,
                            SellButtonEnabled = model.SellButtonEnabled,
                            OrderNo = model.OrderNo,
                            ModifiedBy = base.GetUser(),
                            ModifiedDate = DateTime.Now
                    };
                    _game.Update(entity);
                } else {
                    Games entity = new Games() {
                            ImageUrl = model.ImageUrl,
                            Description = model.Description,
                            Name = model.Name,
                            SeoName = UrlExtension.FriendlyUrl(model.Name),
                            SellPrice = model.SellPrice,
                            BuyPrice = model.BuyPrice,
                            BuyButtonEnabled = model.BuyButtonEnabled,
                            SellButtonEnabled = model.SellButtonEnabled,
                            OrderNo = model.OrderNo,
                            CategoryId = model.CategoryId,
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser()
                    };
                    _game.Add(entity);
                }
            } catch (Exception e) {
                return StatusCode(404);
            }

            _cache.Remove("uigamelist");
            _cache.Remove("newgames");
            _cache.Remove("headerknightgame");

            return StatusCode(200);
        }

        [HttpGet]
        [Route("GetOne/{id}")]
        public GameModel GetOne(Guid id) {
            GameModel model = new GameModel();
            model = _mapper.Map<GameModel>(_game.GetT(x => x.Id == id && x.IsActive == true));

            return model;
        }

        [HttpGet]
        [Route("GameDetail")]
        [AllowAnonymous]
        public GameModel GameDetail([FromQuery] string category, string name) {
            GameModel model = new GameModel();
            model = _mapper.Map<GameModel>(_game.GetT(x => x.SeoName == name));
            var categoryEntity = _category.GetT(x => x.Id == model.CategoryId);
            model.CategoryName = categoryEntity.Name;
            model.CategorySeoName = categoryEntity.SeoName;
            return model;
        }

        [HttpPost]
        [Route("Delete")]
        public ActionResult Delete([FromBody] Guid id) {
            try {
                Games entity = _game.GetT(x => x.Id == id && x.IsActive == true);
                entity.IsActive = false;
                _game.Update(entity);
            } catch (Exception e) {
                return StatusCode(404);
            }

            _cache.Remove("uigamelist");
            _cache.Remove("newgames");
            _cache.Remove("headerknightgame");

            return StatusCode(200);
        }

        [HttpGet]
        [Route("GetGames")]
        public List<GameModel> GetGames(string gamesId) {
            var ids = ConvertToStringList(gamesId);
            var games = _mapper.Map<List<GameModel>>(_game.GetList(x => x.IsActive == true).Where(x => ids.Contains(x.Id)).ToList());
            return games;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public List<Guid> ConvertToStringList(string Items) {
            List<Guid> result = new List<Guid>();

            var ids = Items.Split(",");
            foreach (var item in ids) {
                result.Add(new Guid(item));
            }

            return result;
        }

        [HttpGet]
        [Route("HeaderList")]
        [AllowAnonymous]
        public List<GameModel> HeaderList() {
            List<GameModel> list = new List<GameModel>();
            if (_cache.Get("headerknightgame") == null) {
                var category = _category.GetT(x => x.IsActive == true && x.Type == (int) GameType.KNIGHTONLINE);
                var entities = _game.GetList(x => x.IsActive == true && x.CategoryId == category.Id);
                foreach (var entity in entities) {
                    GameModel model = new GameModel() {
                            Id = entity.Id,
                            ImageUrl = entity.ImageUrl,
                            Description = entity.Description,
                            Name = entity.Name,
                            SellPrice = entity.SellPrice,
                            BuyPrice = entity.BuyPrice,
                            CategoryId = category.Id,
                            CategoryName = category.SeoName,
                            SeoName = entity.SeoName
                    };
                    list.Add(model);
                }

                _cache.Set("headerknightgame", list);
            } else {
                list = _cache.Get<List<GameModel>>("headerknightgame");
            }

            return list;
        }

        [HttpGet]
        [Route("GetGameWithGames")]
        [AllowAnonymous]
        public GameModel GetGameWithGames(string SeoName) {
            GameModel gameModel = new GameModel();
            try {
                var game = _game.GetT(x => x.SeoName == SeoName && x.IsActive == true);

                gameModel = _mapper.Map<GameModel>(game);
            } catch (Exception e) {
                throw new Exception(e.Message);
            }

            return gameModel;
        }
    }
}