﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Core;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/Addversiment")]
    [ApiController]
    public class AddversimentController : APIControllerBase {
        private readonly IKnightCyberRing _KnightCyberRing;
        private readonly IKnightItem _knightItem;
        private readonly IImageMaster _image;
        private readonly IUserNotification _notification;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public AddversimentController(IKnightCyberRing knightCyberRing, IMapper mapper, IKnightItem knightItem, UserManager<ApplicationUser> userManager, IImageMaster image,
                                      IUserNotification notification) {
            _KnightCyberRing = knightCyberRing;
            _mapper = mapper;
            _knightItem = knightItem;
            _userManager = userManager;
            _image = image;
            _notification = notification;
        }

        [HttpPost]
        [Route("AddKnightCyberRing")]
        public int AddKnightCyberRing([FromBody] KnightCyberRingAddversimentModel model) {
            try {
                model.CreatedBy = base.GetUser();
                model.UserId = base.GetUser();
                return _KnightCyberRing.Add(_mapper.Map<KnightCyberRing>(model)).Id;
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost]
        [Route("AddKnightItem")]
        public int AddKnightItem([FromBody] KnightItemAddversimentModel model) {
            try {
                model.CreatedBy = base.GetUser();
                model.UserId = base.GetUser();
                return _knightItem.Add(_mapper.Map<KnightItem>(model)).Id;
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("KnightCyberRingsRequests")]
        [Authorize(Roles = "Admin")]
        public List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> KnightCyberRingsRequests() {
            List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> list =
                    new List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>>();
            try {
                var cyberAdds = _KnightCyberRing.GetList(x => x.IsActive == true && x.status == (int) AddversimentStatus.SUSPEND);
                var users = _userManager.Users.ToList();
                foreach (var item in cyberAdds) {
                    BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel> model = new BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>();
                    model.Base = _mapper.Map<KnightCyberRingAddversimentModel>(item);
                    model.Base.FileUrls = GetFiles(item.Id, (int) AddversimentType.KNIGHT_ONLINE_CYBERRING);
                    model.Sub = _mapper.Map<UserSummaryModel>(users.FirstOrDefault(x => x.Id == item.UserId));
                    list.Add(model);
                }

                return list;
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("KnightItemRequests")]
        [Authorize(Roles = "Admin")]
        public List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> KnightItemRequests() {
            List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> list =
                    new List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>>();
            try {
                var cyberAdds = _knightItem.GetList(x => x.IsActive == true && x.status == (int) AddversimentStatus.SUSPEND);
                var users = _userManager.Users.ToList();
                foreach (var item in cyberAdds) {
                    BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel> model = new BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>();
                    model.Base = _mapper.Map<KnightItemAddversimentModel>(item);
                    model.Base.FileUrls = GetFiles(item.Id, (int) AddversimentType.KNIGHT_ONLINE_ITEM);
                    model.Sub = _mapper.Map<UserSummaryModel>(users.FirstOrDefault(x => x.Id == item.UserId));
                    list.Add(model);
                }

                return list;
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("UiKnightCyberList")]
        [AllowAnonymous]
        public List<KnightCyberRingAddversimentModel> UiKnightCyberList() {
            List<KnightCyberRingAddversimentModel> list =
                    new List<KnightCyberRingAddversimentModel>();
            try {
                var cyberAdds = _KnightCyberRing.GetList(x => x.IsActive == true && x.status == (int) AddversimentStatus.APPROVED);
                foreach (var item in cyberAdds) {
                    KnightCyberRingAddversimentModel model = new KnightCyberRingAddversimentModel();
                    model = _mapper.Map<KnightCyberRingAddversimentModel>(item);
                    model.FileUrls = GetFiles(item.Id, (int) AddversimentType.KNIGHT_ONLINE_CYBERRING);
                    list.Add(model);
                }

                return list;
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("UiKnightItemList")]
        [AllowAnonymous]
        public List<KnightItemAddversimentModel> UiKnightItemList() {
            List<KnightItemAddversimentModel> list =
                    new List<KnightItemAddversimentModel>();
            try {
                var cyberAdds = _knightItem.GetList(x => x.IsActive == true && x.status == (int) AddversimentStatus.APPROVED);
                foreach (var item in cyberAdds) {
                    KnightItemAddversimentModel model = new KnightItemAddversimentModel();
                    model = _mapper.Map<KnightItemAddversimentModel>(item);
                    model.FileUrls = GetFiles(item.Id, (int) AddversimentType.KNIGHT_ONLINE_ITEM);
                    list.Add(model);
                }

                return list;
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost]
        [Route("ApproveCyberRing")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> ApproveCyberRing(AdminAddversimentModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            try {
                using (var trancation = new TransactionScope()) {
                    var updatedEntity = _KnightCyberRing.GetT(x => x.Id == model.AddversimentId);
                    updatedEntity.status = (int) AddversimentStatus.APPROVED;
                    _KnightCyberRing.Update(updatedEntity);

                    UserNotification notification = new UserNotification() {
                            UserId = model.UserId,
                            Message = "ilanınız yayınlanmıştır.",
                            NotificationType = NotificationType.APPROVED,
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser()
                    };
                    _notification.Add(notification);

                    response.IsSuccess = true;
                    response.Value = HttpStatusCode.OK;
                    trancation.Complete();
                }
            } catch (Exception exception) {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [HttpPost]
        [Route("RejectCyberRing")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> RejectCyberRing(AdminAddversimentModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try {
                using (var trancation = new TransactionScope()) {
                    var updatedEntity = _KnightCyberRing.GetT(x => x.Id == model.AddversimentId);
                    updatedEntity.status = (int) AddversimentStatus.REJECT;
                    _KnightCyberRing.Update(updatedEntity);

                    UserNotification notification = new UserNotification() {
                            UserId = model.UserId,
                            Message = "ilanınız reddedilmiştir. Lütfen müşteri temsilcilerimizle iletişime geçiniz.",
                            NotificationType = NotificationType.REJECT,
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser()
                    };
                    _notification.Add(notification);

                    response.IsSuccess = true;
                    response.Value = HttpStatusCode.OK;
                    trancation.Complete();
                }
            } catch (Exception exception) {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [HttpPost]
        [Route("ApproveKnightItem")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> ApproveKnightItem(AdminAddversimentModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            try {
                using (var trancation = new TransactionScope()) {
                    var updatedEntity = _knightItem.GetT(x => x.Id == model.AddversimentId);
                    updatedEntity.status = (int) AddversimentStatus.APPROVED;
                    _knightItem.Update(updatedEntity);

                    UserNotification notification = new UserNotification() {
                            UserId = model.UserId,
                            Message = "ilanınız yayınlanmıştır.",
                            NotificationType = NotificationType.APPROVED,
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser()
                    };
                    _notification.Add(notification);

                    response.IsSuccess = true;
                    response.Value = HttpStatusCode.OK;
                    trancation.Complete();
                }
            } catch (Exception exception) {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [HttpPost]
        [Route("RejectKnightItem")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> RejectKnightItem(AdminAddversimentModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try {
                using (var trancation = new TransactionScope()) {
                    var updatedEntity = _knightItem.GetT(x => x.Id == model.AddversimentId);
                    updatedEntity.status = (int) AddversimentStatus.REJECT;
                    _knightItem.Update(updatedEntity);

                    UserNotification notification = new UserNotification() {
                            UserId = model.UserId,
                            Message = "ilanınız reddedilmiştir. Lütfen müşteri temsilcilerimizle iletişime geçiniz.",
                            NotificationType = NotificationType.REJECT,
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser()
                    };
                    _notification.Add(notification);

                    response.IsSuccess = true;
                    response.Value = HttpStatusCode.OK;
                    trancation.Complete();
                }
            } catch (Exception exception) {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [Route("KnightCyberDetail/{id}")]
        [AllowAnonymous]
        public AddversimentDetailModel KnightCyberDetail(int Id) {
            var model = _mapper.Map<AddversimentDetailModel>(_KnightCyberRing.GetT(x => x.IsActive == true && x.Id == Id));
            model.DetailType = (int) AddversimentType.KNIGHT_ONLINE_CYBERRING;
            model.FileUrls = GetFiles(Id, (int) AddversimentType.KNIGHT_ONLINE_CYBERRING);
            return model;
        }

        [Route("KnightItemDetail/{id}")]
        [AllowAnonymous]
        public AddversimentDetailModel KnightItemDetail(int Id) {
            var model = _mapper.Map<AddversimentDetailModel>(_knightItem.GetT(x => x.IsActive == true && x.Id == Id));
            model.DetailType = (int) AddversimentType.KNIGHT_ONLINE_ITEM;
            model.FileUrls = GetFiles(Id, (int) AddversimentType.KNIGHT_ONLINE_ITEM);
            return model;
        }

        [Route("GetUserAddversiment/{id}")]
        [AllowAnonymous]
        public List<AddversimentDetailModel> GetUserAddversiment(string Id) {
            var cybers = _mapper.Map<List<AddversimentDetailModel>>(_KnightCyberRing.GetList(x => x.IsActive == true && x.UserId == Id));
            cybers.ForEach(x => x.DetailType = (int) AddversimentType.KNIGHT_ONLINE_CYBERRING);
            var knightitems = _mapper.Map<List<AddversimentDetailModel>>(_knightItem.GetList(x => x.IsActive == true && x.UserId == Id));
            knightitems.ForEach(x => x.DetailType = (int) AddversimentType.KNIGHT_ONLINE_ITEM);
            cybers.AddRange(knightitems);

            return cybers;
        }

        [HttpGet]
        [Route("FilterKnightCyberRings")]
        [AllowAnonymous]
        public List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> FilterKnightCyberRings(
                string server, string characterFeature, string charactertype, double mintl, double maxtl, string word,int orderby) {
            List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> list =
                    new List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>>();
            FilterDataModel filter = new FilterDataModel();
            filter.Server = server;
            filter.CharacterFeature = characterFeature;
            filter.CharacterType = charactertype;
            filter.MinPrice = mintl;
            filter.MaxPrice = maxtl;
            filter.Word = word;
            filter.OrderByDescription  = GetDescription<FilterOrderBy>((FilterOrderBy)orderby);
            try {
                var cyberAdds = _KnightCyberRing.GetFilterData(filter).ToList();
                var users = _userManager.Users.ToList();
                foreach (var item in cyberAdds) {
                    BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel> model = new BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>();
                    model.Base = _mapper.Map<KnightCyberRingAddversimentModel>(item);
                    model.Base.FileUrls = GetFiles(item.Id, (int) AddversimentType.KNIGHT_ONLINE_CYBERRING);
                    model.Sub = _mapper.Map<UserSummaryModel>(users.FirstOrDefault(x => x.Id == item.UserId));
                    list.Add(model);
                }

                return list;
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("FilterKnightItems")]
        [AllowAnonymous]
        public List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> FilterKnightItems(
                string server, string arti, double mintl, double maxtl, string word,int orderby) {
            List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> list =
                    new List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>>();
            FilterDataModel filter = new FilterDataModel();
            filter.Server = server;
            filter.Plus = arti;
            filter.MinPrice = mintl;
            filter.MaxPrice = maxtl;
            filter.Word = word;
            filter.OrderByDescription  = GetDescription<FilterOrderBy>((FilterOrderBy)orderby);
            try {
                var knightitems = _knightItem.GetFilterData(filter).ToList();
                var users = _userManager.Users.ToList();
                foreach (var item in knightitems) {
                    BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel> model = new BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>();
                    model.Base = _mapper.Map<KnightItemAddversimentModel>(item);
                    model.Base.FileUrls = GetFiles(item.Id, (int) AddversimentType.KNIGHT_ONLINE_ITEM);
                    model.Sub = _mapper.Map<UserSummaryModel>(users.FirstOrDefault(x => x.Id == item.UserId));
                    list.Add(model);
                }

                return list;
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        private List<string> GetFiles(int id, int type) {
            return _image.GetImages(id, type);
        }

    }
}