using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("api/Game")]
    [Produces("application/json")]
    public class GameController : APIControllerBase {
        private readonly IGame _game;
        private readonly IMapper _mapper;

        public GameController(IGame game, IMapper mapper) {
            _game = game;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("List")]
        public List<GameModel> List() {
            List<GameModel> list = new List<GameModel>();
            var entities = _game.GetList(x => x.IsActive == true);
            foreach (var entity in entities) {
                GameModel model = new GameModel() {
                        Id = entity.Id,
                        ImageUrl = entity.ImageUrl,
                        Description = entity.Description,
                        Name = entity.Name,
                        SellPrice = entity.SellPrice,
                        BuyPrice = entity.BuyPrice
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
            var entities = _game.GetList(x => x.IsActive == true);
            foreach (var entity in entities) {
                GameModel model = new GameModel() {
                        Id = entity.Id,
                        ImageUrl = entity.ImageUrl,
                        Description = entity.Description,
                        Name = entity.Name,
                        SeoName = entity.SeoName,
                        SellPrice = entity.SellPrice,
                        BuyPrice = entity.BuyPrice
                };
                list.Add(model);
            }

            return list;
        }

        [HttpGet]
        [Route("NewGames")]
        [AllowAnonymous]
        public List<GameModel> NewGames() {
            List<GameModel> list = new List<GameModel>();
            var entities = _game.GetList(x => x.IsActive == true).OrderByDescending(x => x.CreatedDate);
            foreach (var entity in entities) {
                GameModel model = new GameModel() {
                        Id = entity.Id,
                        ImageUrl = entity.ImageUrl,
                        Description = entity.Description,
                        Name = entity.Name,
                        SeoName = entity.SeoName,
                        SellPrice = entity.SellPrice,
                        BuyPrice = entity.BuyPrice
                };
                list.Add(model);
            }

            return list;
        }

        [HttpPost]
        [Route("Save")]
        public ActionResult Save([FromBody] GameModel model) {
            try {
                if (model.Id != Guid.Empty) {
                    Games entity = new Games() {
                            Id = model.Id,
                            ImageUrl = model.ImageUrl,
                            Description = model.Description,
                            Name = model.Name,
                            SeoName = UrlExtension.FriendlyUrl(model.Name),
                            SellPrice = model.SellPrice,
                            BuyPrice = model.BuyPrice,
                            CategoryId = model.CategoryId,
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
                            CategoryId = model.CategoryId,
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser()
                    };
                    _game.Add(entity);
                }
            } catch (Exception e) {
                return StatusCode(404);
            }

            return StatusCode(200);
        }

        [HttpGet]
        [Route("GetOne/{id}")]
        public async Task<Response<GameModel>> GetOne(Guid id) {
            Response<GameModel> bookResponse = new Response<GameModel>();
            Games entity = await _game.GetTAsync(x => x.Id == id && x.IsActive == true);

            return bookResponse;
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

            return StatusCode(200);
        }

        [HttpGet]
        [Route("GetGames")]
        public List<GameModel> GetGames(string gamesId) {
            var ids = ConvertToStringList(gamesId);
            var games = _mapper.Map<List<GameModel>>(_game.GetList().Where(x => ids.Contains(x.Id)).ToList());
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
    }
}