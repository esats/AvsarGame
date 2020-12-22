using System;
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

namespace AvsarGame.API.Controllers
{
    [Route("api/Addversiment")]
    [ApiController]
    public class AddversimentController : APIControllerBase
    {
        private readonly IKnightCyberRing _KnightCyberRing;
        private readonly IKnightItem _knightItem;
        private readonly IImageMaster _image;
        private readonly IUserNotification _notification;
        private readonly IComment _comment;
        private readonly ISubComment _subComment;
        private readonly IUserComment _userComment;
        private readonly IMetin2 _metin2;
        private readonly IKnightCommerceDetail _knightCommerceDetail;
        private readonly IMapper _mapper;
        private readonly IUserBalance _UserBalance;
        private readonly IUserBalanceDetails _UserBalanceDetail;
        private readonly IUserDrawableMoney _userDrawableMoney;

        private readonly UserManager<ApplicationUser> _userManager;

        public AddversimentController(IKnightCyberRing knightCyberRing, IMapper mapper, IKnightItem knightItem, UserManager<ApplicationUser> userManager, IImageMaster image,
                                      IUserNotification notification,
                                      IComment comment,
                                      ISubComment subComment,
                                      IUserComment userComment,
                                      IMetin2 metin2,
                                      IKnightCommerceDetail knightCommerceDetail,
                                      IUserBalance userBalance,
                                      IUserBalanceDetails userBalanceDetails, IUserDrawableMoney userDrawableMoney)
        {
            _KnightCyberRing = knightCyberRing;
            _mapper = mapper;
            _knightItem = knightItem;
            _userManager = userManager;
            _image = image;
            _notification = notification;
            _comment = comment;
            _subComment = subComment;
            _userComment = userComment;
            _metin2 = metin2;
            _knightCommerceDetail = knightCommerceDetail;
            _UserBalance = userBalance;
            _UserBalanceDetail = userBalanceDetails;
            _userDrawableMoney = userDrawableMoney;
        }

        [HttpPost]
        [Route("AddKnightCyberRing")]
        public int AddKnightCyberRing([FromBody] KnightCyberRingAddversimentModel model)
        {
            try
            {
                model.CreatedBy = base.GetUser();
                model.UserId = base.GetUser();
                if (model.Id > 0)
                {
                    return _KnightCyberRing.Update(_mapper.Map<KnightCyberRing>(model)).Id;
                }

                return _KnightCyberRing.Add(_mapper.Map<KnightCyberRing>(model)).Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost]
        [Route("AddKnightItem")]
        public int AddKnightItem([FromBody] KnightItemAddversimentModel model)
        {
            try
            {
                model.CreatedBy = base.GetUser();
                model.UserId = base.GetUser();
                if (model.Id > 0)
                {
                    return _knightItem.Update(_mapper.Map<KnightItem>(model)).Id;
                }

                return _knightItem.Add(_mapper.Map<KnightItem>(model)).Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [Route("AddMetin2Item")]
        public int AddMetin2([FromBody] AddversimentDetailModel model)
        {
            try
            {
                model.CreatedBy = base.GetUser();
                model.UserId = base.GetUser();
                if (model.Id > 0)
                {
                    return _metin2.Update(_mapper.Map<Metin2Item>(model)).Id;
                }

                return _metin2.Add(_mapper.Map<Metin2Item>(model)).Id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("KnightCyberRingsRequests")]
        [Authorize(Roles = "Admin")]
        public List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> KnightCyberRingsRequests()
        {
            List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> list =
                    new List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>>();
            try
            {
                var cyberAdds = _KnightCyberRing.GetList(x => x.IsActive == true && x.Status == (int)AddversimentStatus.SUSPEND);
                var users = _userManager.Users.ToList();
                foreach (var item in cyberAdds)
                {
                    BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel> model = new BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>();
                    model.Base = _mapper.Map<KnightCyberRingAddversimentModel>(item);
                    model.Base.FileUrls = GetFiles(item.Id, (int)AddversimentType.KNIGHT_ONLINE_CYBERRING);
                    model.Sub = _mapper.Map<UserSummaryModel>(users.FirstOrDefault(x => x.Id == item.UserId));
                    list.Add(model);
                }

                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("KnightItemRequests")]
        [Authorize(Roles = "Admin")]
        public List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> KnightItemRequests()
        {
            List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> list =
                    new List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>>();
            try
            {
                var cyberAdds = _knightItem.GetList(x => x.IsActive == true && x.Status == (int)AddversimentStatus.SUSPEND);
                var users = _userManager.Users.ToList();
                foreach (var item in cyberAdds)
                {
                    BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel> model = new BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>();
                    model.Base = _mapper.Map<KnightItemAddversimentModel>(item);
                    model.Base.FileUrls = GetFiles(item.Id, (int)AddversimentType.KNIGHT_ONLINE_ITEM);
                    model.Sub = _mapper.Map<UserSummaryModel>(users.FirstOrDefault(x => x.Id == item.UserId));
                    list.Add(model);
                }

                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("UiKnightCyberList")]
        [AllowAnonymous]
        public List<KnightCyberRingAddversimentModel> UiKnightCyberList()
        {
            List<KnightCyberRingAddversimentModel> list =
                    new List<KnightCyberRingAddversimentModel>();
            try
            {
                var cyberAdds = _KnightCyberRing.GetList(x => x.IsActive == true && x.Status == (int)AddversimentStatus.APPROVED).Take(10);
                foreach (var item in cyberAdds)
                {
                    KnightCyberRingAddversimentModel model = new KnightCyberRingAddversimentModel();
                    model = _mapper.Map<KnightCyberRingAddversimentModel>(item);
                    model.FileUrls = GetFiles(item.Id, (int)AddversimentType.KNIGHT_ONLINE_CYBERRING);
                    list.Add(model);
                }

                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("UiKnightItemList")]
        [AllowAnonymous]
        public List<KnightItemAddversimentModel> UiKnightItemList()
        {
            List<KnightItemAddversimentModel> list =
                    new List<KnightItemAddversimentModel>();
            try
            {
                var cyberAdds = _knightItem.GetList(x => x.IsActive == true && x.Status == (int)AddversimentStatus.APPROVED).Take(10);
                foreach (var item in cyberAdds)
                {
                    KnightItemAddversimentModel model = new KnightItemAddversimentModel();
                    model = _mapper.Map<KnightItemAddversimentModel>(item);
                    model.FileUrls = GetFiles(item.Id, (int)AddversimentType.KNIGHT_ONLINE_ITEM);
                    list.Add(model);
                }

                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost]
        [Route("ApproveCyberRing")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> ApproveCyberRing(AdminAddversimentModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _KnightCyberRing.GetT(x => x.Id == model.AddversimentId);
                    updatedEntity.Status = (int)AddversimentStatus.APPROVED;
                    _KnightCyberRing.Update(updatedEntity);

                    UserNotification notification = new UserNotification()
                    {
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
            }
            catch (Exception exception)
            {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [HttpPost]
        [Route("RejectCyberRing")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> RejectCyberRing(AdminAddversimentModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _KnightCyberRing.GetT(x => x.Id == model.AddversimentId);
                    updatedEntity.Status = (int)AddversimentStatus.REJECT;
                    _KnightCyberRing.Update(updatedEntity);

                    UserNotification notification = new UserNotification()
                    {
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
            }
            catch (Exception exception)
            {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [HttpPost]
        [Route("ApproveKnightItem")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> ApproveKnightItem(AdminAddversimentModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _knightItem.GetT(x => x.Id == model.AddversimentId);
                    updatedEntity.Status = (int)AddversimentStatus.APPROVED;
                    _knightItem.Update(updatedEntity);

                    UserNotification notification = new UserNotification()
                    {
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
            }
            catch (Exception exception)
            {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [HttpPost]
        [Route("RejectKnightItem")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> RejectKnightItem(AdminAddversimentModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _knightItem.GetT(x => x.Id == model.AddversimentId);
                    updatedEntity.Status = (int)AddversimentStatus.REJECT;
                    _knightItem.Update(updatedEntity);

                    UserNotification notification = new UserNotification()
                    {
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
            }
            catch (Exception exception)
            {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [Route("KnightCyberDetail/{id}/{status}")]
        [AllowAnonymous]
        public AddversimentDetailModel KnightCyberDetail(int Id, int status)
        {
            var model = _mapper.Map<AddversimentDetailModel>(_KnightCyberRing.GetT(x => x.IsActive == true && x.Id == Id && x.Status == status));
            model.DetailType = (int)AddversimentType.KNIGHT_ONLINE_CYBERRING;
            model.FileUrls = GetFiles(Id, (int)AddversimentType.KNIGHT_ONLINE_CYBERRING);
            model.Comments = GetCommentWithUser(Id, (int)AddversimentType.KNIGHT_ONLINE_CYBERRING);
            return model;
        }

        [Route("Metin2ItemDetail/{id}")]
        [AllowAnonymous]
        public AddversimentDetailModel Metin2ItemDetail(int Id)
        {
            // TODO: kullanıcı kendi ilanları pasifte ise güncelleyememe durumu oluyor düzelt
            var model = _mapper.Map<AddversimentDetailModel>(_metin2.GetT(x => x.IsActive == true && x.Id == Id && x.Status == (int)AddversimentStatus.APPROVED));
            model.DetailType = (int)AddversimentType.METIN2_ITEM;
            model.FileUrls = GetFiles(Id, (int)AddversimentType.METIN2_ITEM);
            model.Comments = GetCommentWithUser(Id, (int)AddversimentType.METIN2_ITEM);
            return model;
        }

        private List<BaseCommentModel> GetCommentWithUser(int addversimentId, int addversimentType)
        {
            List<BaseCommentModel> list = new List<BaseCommentModel>();
            var users = _userManager.Users.ToList();
            var comments = _comment.GetCommentWithSubComments(addversimentId, addversimentType);

            foreach (var item in comments)
            {
                BaseCommentModel bases = new BaseCommentModel();
                List<CommentModel> subs = new List<CommentModel>();
                CommentModel baseComment = new CommentModel();

                baseComment = _mapper.Map<CommentModel>(item);
                baseComment.User = _mapper.Map<UserSummaryModel>(users.FirstOrDefault(x => x.Id == item.UserId));

                foreach (var sub in item.SubComments)
                {
                    CommentModel subCommentModel = new CommentModel();
                    subCommentModel = _mapper.Map<CommentModel>(sub);
                    subCommentModel.User = _mapper.Map<UserSummaryModel>(users.FirstOrDefault(x => x.Id == sub.UserId));
                    subs.Add(subCommentModel);
                }

                bases.Comment = baseComment;
                bases.Answers = subs;
                list.Add(bases);
            }

            return list;
        }

        [Route("KnightItemDetail/{id}/{status}")]
        [AllowAnonymous]
        public AddversimentDetailModel KnightItemDetail(int Id, int status = 1)
        {
            var model = _mapper.Map<AddversimentDetailModel>(_knightItem.GetT(x => x.IsActive == true && x.Id == Id && x.Status == status));
            model.DetailType = (int)AddversimentType.KNIGHT_ONLINE_ITEM;
            model.FileUrls = GetFiles(Id, (int)AddversimentType.KNIGHT_ONLINE_ITEM);
            model.Comments = GetCommentWithUser(Id, (int)AddversimentType.KNIGHT_ONLINE_ITEM);

            return model;
        }

        [Route("GetUserAddversiment/{id}")]
        public List<AddversimentDetailModel> GetUserAddversiment(string Id)
        {
            var cybers = _mapper.Map<List<AddversimentDetailModel>>(_KnightCyberRing.GetList(x => x.IsActive == true && x.UserId == Id));
            cybers.ForEach(x => x.DetailType = (int)AddversimentType.KNIGHT_ONLINE_CYBERRING);
            var knightitems = _mapper.Map<List<AddversimentDetailModel>>(_knightItem.GetList(x => x.IsActive == true && x.UserId == Id));
            knightitems.ForEach(x => x.DetailType = (int)AddversimentType.KNIGHT_ONLINE_ITEM);
            cybers.AddRange(knightitems);

            return cybers;
        }

        [Route("GetUserBuys/{id}")]
        public List<GetUserCommerceRequestDetailModel> GetUserBuys(string Id)
        {
            var commerceRequest = _knightCommerceDetail.GetUserCommerceRequestDetail(Id);
            return commerceRequest;
        }

        [HttpGet]
        [Route("FilterKnightCyberRings")]
        [AllowAnonymous]
        public List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> FilterKnightCyberRings(
                string server, string characterFeature, string charactertype, double mintl, double maxtl, string word, int orderby)
        {
            List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>> list =
                    new List<BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>>();
            FilterDataModel filter = new FilterDataModel();
            filter.Server = server;
            filter.CharacterFeature = characterFeature;
            filter.CharacterType = charactertype;
            filter.MinPrice = mintl;
            filter.MaxPrice = maxtl;
            filter.Word = word;
            filter.OrderByDescription = GetDescription<FilterOrderBy>((FilterOrderBy)orderby);
            try
            {
                var cyberAdds = _KnightCyberRing.GetFilterData(filter).ToList();
                var users = _userManager.Users.ToList();
                foreach (var item in cyberAdds)
                {
                    BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel> model = new BaseAdversimentModel<KnightCyberRingAddversimentModel, UserSummaryModel>();
                    model.Base = _mapper.Map<KnightCyberRingAddversimentModel>(item);
                    model.Base.FileUrls = GetFiles(item.Id, (int)AddversimentType.KNIGHT_ONLINE_CYBERRING);
                    model.Sub = _mapper.Map<UserSummaryModel>(users.FirstOrDefault(x => x.Id == item.UserId));
                    list.Add(model);
                }

                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("FilterKnightItems")]
        [AllowAnonymous]
        public List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> FilterKnightItems(
                string server, string arti, double mintl, double maxtl, string word, int orderby)
        {
            List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>> list =
                    new List<BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>>();
            FilterDataModel filter = new FilterDataModel();
            filter.Server = server;
            filter.Plus = arti;
            filter.MinPrice = mintl;
            filter.MaxPrice = maxtl;
            filter.Word = word;
            filter.OrderByDescription = GetDescription<FilterOrderBy>((FilterOrderBy)orderby);
            try
            {
                var knightitems = _knightItem.GetFilterData(filter).ToList();
                var users = _userManager.Users.ToList();
                foreach (var item in knightitems)
                {
                    BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel> model = new BaseAdversimentModel<KnightItemAddversimentModel, UserSummaryModel>();
                    model.Base = _mapper.Map<KnightItemAddversimentModel>(item);
                    model.Base.FileUrls = GetFiles(item.Id, (int)AddversimentType.KNIGHT_ONLINE_ITEM);
                    model.Sub = _mapper.Map<UserSummaryModel>(users.FirstOrDefault(x => x.Id == item.UserId));
                    list.Add(model);
                }

                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        private List<string> GetFiles(int id, int type)
        {
            return _image.GetImages(id, type);
        }

        [Route("DeleteKnightItem/{id}")]
        public bool DeleteKnightItem(int Id)
        {
            var entity = _knightItem.GetT(x => x.IsActive == true && x.Id == Id && x.Status == (int)AddversimentStatus.APPROVED);
            entity.IsActive = false;
            _knightItem.Update(entity);
            return true;
        }

        [Route("DeleteKnightCyber/{id}")]
        public bool DeleteKnightCyber(int Id)
        {
            var entity = _KnightCyberRing.GetT(x => x.IsActive == true && x.Id == Id && x.Status == (int)AddversimentStatus.APPROVED);
            entity.IsActive = false;
            _KnightCyberRing.Update(entity);
            return true;
        }

        [Route("AddComment")]
        [HttpPost]
        public Response<HttpStatusCode> AddComment(CommentModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                Comment comment = new Comment();
                comment.AddversimentId = model.AddversimentId;
                comment.AddversimentType = model.AddversimentType;
                comment.Content = model.Content;
                comment.CreatedDate = DateTime.Now;
                comment.CreatedBy = base.GetUser();
                comment.UserId = base.GetUser();
                _comment.Add(comment);

                UserComment userComment = new UserComment();
                userComment.CommentId = comment.Id;
                userComment.UserId = base.GetUser();
                userComment.IsSubComment = false;
                _userComment.Add(userComment);

                var notificationList = GetNotificationList(model);
                foreach (var item in notificationList)
                {
                    UserNotification notification = new UserNotification();
                    notification.Message = "Yorum Yapıldı";
                    notification.UserId = item;
                    notification.NotificationAddversimentId = model.AddversimentId;
                    notification.NotificationAddversimentType = model.AddversimentType;
                    notification.IsAddversimentNotification = true;
                    notification.CommentId = comment.Id;
                    notification.IsSubComment = false;
                    _notification.Add(notification);
                }

                response.Value = HttpStatusCode.OK;
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.Value = HttpStatusCode.BadRequest;
                response.IsSuccess = false;
            }

            return response;
        }

        [Route("GiveAnswer")]
        [HttpPost]
        public Response<HttpStatusCode> GiveAnswer(CommentModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                SubComment comment = new SubComment();
                comment.AddversimentId = model.AddversimentId;
                comment.AddversimentType = model.AddversimentType;
                comment.Content = model.Content;
                comment.CreatedDate = DateTime.Now;
                comment.CreatedBy = base.GetUser();
                comment.UserId = base.GetUser();
                comment.CommentId = model.CommentId;
                _subComment.Add(comment);

                UserComment userComment = new UserComment();
                userComment.CommentId = comment.Id;
                userComment.UserId = base.GetUser();
                userComment.IsSubComment = true;
                _userComment.Add(userComment);

                var notificationList = GetNotificationList(model);
                foreach (var item in notificationList)
                {
                    UserNotification notification = new UserNotification();
                    notification.Message = "cevap verildi";
                    notification.UserId = item;
                    notification.NotificationAddversimentId = model.AddversimentId;
                    notification.NotificationAddversimentType = model.AddversimentType;
                    notification.IsAddversimentNotification = true;
                    notification.CommentId = comment.Id;
                    notification.IsSubComment = true;
                    _notification.Add(notification);
                }

                response.Value = HttpStatusCode.OK;
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                response.Value = HttpStatusCode.BadRequest;
                response.IsSuccess = false;
            }

            return response;
        }


        [Route("SaveKnightCommerceRequest")]
        [HttpPost]
        public Response<UserOrderResponseModel> SaveKnightCommerceRequest(CommerceModel model)
        {
            Response<UserOrderResponseModel> response = new Response<UserOrderResponseModel>();
            try
            {
                using (var transactionScope = new TransactionScope())
                {
                    model.UserId = base.GetUser();
                    _knightCommerceDetail.Add(_mapper.Map<KnightCommerceDetail>(model));
                    var userBalance = _UserBalance.GetBalance(base.GetUser());

                    UserBalanceDetail detail = new UserBalanceDetail();
                    detail.Amount = -(decimal)(model.PriceWithComission);
                    detail.UserOrderDetailId = model.AddversimentId;
                    detail.TransactionDescription = (int)TRANSACTION_DESCIPTION.KNIGHT_ITEM_ORDER;
                    detail.UserBalanceId = userBalance.Id;
                    detail.CreatedDate = DateTime.Now;
                    detail.CreatedBy = base.GetUser();
                    _UserBalanceDetail.Add(detail);

                    if (model.AddversimentType == 1)
                    {
                        var entity = _KnightCyberRing.GetT(x => x.Id == model.AddversimentId);
                        entity.IsActive = false;
                        _KnightCyberRing.Update(entity);
                    }
                    else
                    {
                        var entity = _knightItem.GetT(x => x.Id == model.AddversimentId);
                        entity.IsActive = false;
                        _knightItem.Update(entity);
                    }

                    response.IsSuccess = true;
                    transactionScope.Complete();
                    transactionScope.Dispose();
                }
            }
            catch (Exception e)
            {
                response.Value.Message = e.Message;
                response.IsSuccess = false;
            }

            return response;
        }

        [Route("GetSellerPhoneNumber/{addversimentId}")]
        public string GetSellerPhoneNumber(int addversimentId, int addversimentType)
        {
            return "";
        }

        [HttpGet]
        [Route("KnightCommerceRequest")]
        [Authorize(Roles = "Admin")]
        public List<GetCommerceRequestDetailModel> KnightCommerceRequest()
        {
            return _knightCommerceDetail.GetCommerceRequests();
        }

        [HttpPost]
        [Route("ApproveKnightOnlineCommerce")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> ApproveKnightOnlineCommerce(GetCommerceRequestDetailModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _knightCommerceDetail.GetT(x => x.AddversimentId == model.AddversimentId && x.AddversimentType == model.AddversimentType);
                    updatedEntity.Status = (int)AddversimentStatus.APPROVED;
                    _knightCommerceDetail.Update(updatedEntity);

                    var userBalanceDetailId = UpdateUserBalance(model.SellerUserId, (model.Price - (model.Price * 0.03)), model.AddversimentId, model.AddversimentType);

                    UserNotification notification = new UserNotification()
                    {
                        UserId = model.SellerUserId,
                        Message = "Tebrikler item ticareti gerçekleşmiştir.",
                        NotificationType = NotificationType.APPROVED,
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                    };
                    _notification.Add(notification);

                    UserNotification notification2 = new UserNotification()
                    {
                        UserId = model.BuyerUserId,
                        Message = "Tebrikler item ticareti gerçekleşmiştir.",
                        NotificationType = NotificationType.APPROVED,
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                    };
                    _notification.Add(notification2);

                    UserDrawableMoney userDrawable = new UserDrawableMoney();
                    userDrawable.Amount = model.Price - (model.Price * 0.03);
                    userDrawable.CreatedBy = GetUser();
                    userDrawable.CreatedDate = DateTime.Now;
                    userDrawable.UserBalanceDetailId = userBalanceDetailId;
                    _userDrawableMoney.Add(userDrawable);

                    response.IsSuccess = true;
                    response.Value = HttpStatusCode.OK;
                    trancation.Complete();
                }
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [HttpPost]
        [Route("RejectKnightOnlineCommerce")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> RejectKnightOnlineCommerce(GetCommerceRequestDetailModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _knightCommerceDetail.GetT(x => x.Id == model.AddversimentId && x.AddversimentType == model.AddversimentType);
                    updatedEntity.Status = (int)AddversimentStatus.REJECT;
                    _knightCommerceDetail.Update(updatedEntity);

                    UpdateUserBalance(model.BuyerUserId, model.Price, model.AddversimentId, model.AddversimentType);

                    if (model.AddversimentType == (int)AddversimentType.KNIGHT_ONLINE_CYBERRING)
                    {
                        var entity = _KnightCyberRing.GetT(x => x.Id == model.AddversimentId);
                        entity.IsActive = true;
                        _KnightCyberRing.Update(entity);

                    }
                    else
                    {
                        var entity = _knightItem.GetT(x => x.Id == model.AddversimentId);
                        entity.IsActive = true;
                        _knightItem.Update(entity);
                    }

                    response.IsSuccess = true;
                    response.Value = HttpStatusCode.OK;
                    trancation.Complete();
                }
            }
            catch (Exception exception)
            {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }


        private Guid UpdateUserBalance(string userId, double price, int addversimentId, int addversimentType)
        {
            var userBalance = _UserBalance.GetBalance(userId);

            if (userBalance == null)
            {
                UserBalance entity = new UserBalance();
                entity.User.Id = userId;
                entity.CreatedDate = DateTime.Now;
                entity.Balance = 0;
                entity.IsActive = true;
                entity.CreatedBy = base.GetUser();
                userBalance = _UserBalance.Add(entity);
            }

            UserBalanceDetail detail = new UserBalanceDetail();
            detail.Amount = Convert.ToDecimal(price);
            detail.TransactionDescription = (int)TRANSACTION_DESCIPTION.GAME_MONEY_SELL;
            detail.UserBalanceId = userBalance.Id;
            detail.AddversimentId = addversimentId;
            detail.AddversimentType = addversimentType;
            detail.CreatedBy = base.GetUser();
            return _UserBalanceDetail.Add(detail).Id;
        }

        private List<string> GetNotificationList(CommentModel model)
        {
            return _comment.GetNotificationList(model.AddversimentId, model.AddversimentType);
        }
    }
}