using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/Announcement")]
    [Produces("application/json")]
    public class AnnouncementController : APIControllerBase {
        private readonly IAnnouncement _announcement;

        public AnnouncementController(IAnnouncement announcement) {
            _announcement = announcement;
        }

        [HttpGet]
        [Route("List")]
        public List<AnnouncementModel> List() {
            List<AnnouncementModel> list = new List<AnnouncementModel>();
            var entities = _announcement.GetList(x => x.IsActive == true);
            foreach (var entity in entities) {
                AnnouncementModel model = new AnnouncementModel() {
                        ImageUrl = entity.ImageUrl,
                        Description = entity.Description,
                        Content = entity.Content,
                        Title = entity.Title,
                        Id = entity.Id
                };
                list.Add(model);
            }

            return list;
        }
        
        [HttpGet]
        [Route("UiAnnouncementList")]
        [AllowAnonymous]
        public List<AnnouncementModel> UiAnnouncementList() {
            List<AnnouncementModel> list = new List<AnnouncementModel>();
            var entities = _announcement.GetList(x => x.IsActive == true);
            foreach (var entity in entities) {
                AnnouncementModel model = new AnnouncementModel() {
                        ImageUrl = entity.ImageUrl,
                        Description = entity.Description,
                        Content = entity.Content,
                        Title = entity.Title,
                        Id = entity.Id
                };
                list.Add(model);
            }

            return list;
        }

        [HttpPost]
        [Route("Save")]
        public Response<HttpStatusCode> Save([FromBody] AnnouncementModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try {
                if (model.Id != Guid.Empty) {
                    Announcement entity = new Announcement() {
                            Id = model.Id,
                            ImageUrl = model.ImageUrl,
                            Description = model.Description,
                            Content = model.Content,
                            Title = model.Title,
                            ModifiedBy = base.GetUser(),
                            ModifiedDate = DateTime.Now
                    };
                    _announcement.Update(entity);
                } else {
                    Announcement entity = new Announcement() {
                            ImageUrl = model.ImageUrl,
                            Description = model.Description,
                            Content = model.Content,
                            Title = model.Title,
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser()
                    };
                    _announcement.Add(entity);
                }
            } catch (Exception e) {
                response.Value = HttpStatusCode.BadRequest;
                response.IsSuccess = false;
                return response;
            }
            response.Value = HttpStatusCode.OK;
            response.IsSuccess = true;
            return response;
        }

        [HttpGet]
        [Route("GetOne/{id}")]
        public async Task<Response<AnnouncementModel>> GetOne(Guid id) {
            Response<AnnouncementModel> bookResponse = new Response<AnnouncementModel>();
            Announcement entity = await _announcement.GetTAsync(x => x.Id == id && x.IsActive == true);

            return bookResponse;
        }

        [HttpPost]
        [Route("Delete")]
        public ActionResult Delete([FromBody] Guid id) {
            try {
                Announcement entity = _announcement.GetT(x => x.Id == id && x.IsActive == true);
                entity.IsActive = false;
                _announcement.Update(entity);
            } catch (Exception e) {
                return StatusCode(404);
            }

            return StatusCode(200);
        }
    }
}