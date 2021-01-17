using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Helpers;
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
    [Route("api/UserOrder")]
    [Produces("application/json")]
    public class UserOrderController : APIControllerBase
    {
        private readonly IUserOrder _userOrder;
        private readonly IUserOrderDetail _userOrderDetail;
        private readonly IUserBalance _UserBalance;
        private readonly IUserBalanceDetails _UserBalanceDetail;
        private readonly IUserNotification _userNotification;
        private readonly IGame _game;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserSell _userSell;
        private readonly IUserSellDetail _userSellDetail;
        private readonly IUserDrawableMoney _userDrawableMoney;
        private readonly ICategory _category;

        public UserOrderController(IUserOrder userOrder, IMapper mapper, IUserOrderDetail userDetailOrder, IGame game, IUserBalanceDetails userBalanceDetail,
                                   IUserBalance userBalance, UserManager<ApplicationUser> userManager, IUserNotification userNotification, IUserSell userSell,
                                   IUserSellDetail userSellDetail, IUserDrawableMoney userDrawableMoney, ICategory category)
        {
            _userOrder = userOrder;
            _mapper = mapper;
            _userOrderDetail = userDetailOrder;
            _game = game;
            _UserBalanceDetail = userBalanceDetail;
            _UserBalance = userBalance;
            _userManager = userManager;
            _userNotification = userNotification;
            _userSell = userSell;
            _userSellDetail = userSellDetail;
            _userDrawableMoney = userDrawableMoney;
            _category = category;
        }

        [HttpGet]
        [Route("List")]
        [Authorize(Roles = "Admin")]
        public List<UserOrdersModel> List()
        {
            var userOrders = _userOrder.GetUserOrder(null);
            List<UserOrdersModel> userOrderList = new List<UserOrdersModel>();

            foreach (var userOrder in userOrders)
            {
                UserOrdersModel userOrderModel = new UserOrdersModel();
                List<UserOrderDetailModel> userOrderDetailList = new List<UserOrderDetailModel>();
                foreach (var detail in userOrder.Orders.Where(x => x.OrderStatus == 0 && x.UserOrderId == userOrder.Id))
                {
                    UserOrderDetailModel model = new UserOrderDetailModel();
                    model.Id = detail.Id;
                    model.UserOrderId = userOrder.Id;
                    model.CharacterName = detail.CharacterName;
                    model.BillingPrice = detail.BillingPrice;
                    model.BillingAmount = detail.BillingAmount;
                    model.Game = _mapper.Map<GameModel>((_game.GetT(x => x.Id == detail.GameId)));
                    var categoryMoneyType = _category.GetT(x => x.Id == model.Game.CategoryId).CategoryMoneyType;
                    if (categoryMoneyType == 1)//knight metin vsoyun parası olanlar için yapıldı
                    {
                        userOrderDetailList.Add(model);
                    }
                }

                if (userOrderDetailList.Count > 0)
                {
                    userOrderModel.Id = userOrder.Id;
                    userOrderModel.User = _mapper.Map<UserPaymentManagementModel>(_userManager.FindByIdAsync(userOrder.UserId).Result);
                    userOrderModel.Orders = userOrderDetailList;
                    userOrderList.Add(userOrderModel);
                }
            }

            return userOrderList;
        }

        [HttpGet]
        [Route("UserCodeList")]
        [Authorize(Roles = "Admin")]
        public List<UserOrdersModel> UserCodeList()
        {
            var userOrders = _userOrder.GetUserOrder(null);
            List<UserOrdersModel> userOrderList = new List<UserOrdersModel>();

            foreach (var userOrder in userOrders)
            {
                UserOrdersModel userOrderModel = new UserOrdersModel();
                List<UserOrderDetailModel> userOrderDetailList = new List<UserOrderDetailModel>();
                foreach (var detail in userOrder.Orders.Where(x => x.OrderStatus == 0 && x.UserOrderId == userOrder.Id))
                {
                    UserOrderDetailModel model = new UserOrderDetailModel();
                    model.Id = detail.Id;
                    model.UserOrderId = userOrder.Id;
                    model.CharacterName = detail.CharacterName;
                    model.BillingPrice = detail.BillingPrice;
                    model.BillingAmount = detail.BillingAmount;
                    model.Game = _mapper.Map<GameModel>((_game.GetT(x => x.Id == detail.GameId)));
                    var categoryMoneyType = _category.GetT(x => x.Id == model.Game.CategoryId).CategoryMoneyType;
                    if (categoryMoneyType != 1)//oyun kodu için yapıldı
                    {
                        userOrderDetailList.Add(model);
                    }
                }

                if (userOrderDetailList.Count > 0)
                {
                    userOrderModel.Id = userOrder.Id;
                    userOrderModel.User = _mapper.Map<UserPaymentManagementModel>(_userManager.FindByIdAsync(userOrder.UserId).Result);
                    userOrderModel.Orders = userOrderDetailList;
                    userOrderList.Add(userOrderModel);
                }
            }

            return userOrderList;
        }

        [HttpGet]
        [Route("Sells")]
        [Authorize(Roles = "Admin")]
        public List<UserOrdersModel> Sells()
        {
            var userSells = _userSell.GetUserSell(null);
            List<UserOrdersModel> userOrderList = new List<UserOrdersModel>();

            foreach (var userSell in userSells)
            {
                UserOrdersModel userOrderModel = new UserOrdersModel();
                List<UserOrderDetailModel> userOrderDetailList = new List<UserOrderDetailModel>();
                foreach (var detail in userSell.Sells.Where(x => x.OrderStatus == 0 && x.UserSellId == userSell.Id))
                {
                    UserOrderDetailModel model = new UserOrderDetailModel();
                    model.Id = detail.Id;
                    model.UserOrderId = userSell.Id;
                    model.CharacterName = detail.CharacterName;
                    model.BillingPrice = detail.BillingPrice;
                    model.BillingAmount = detail.BillingAmount;
                    model.Game = _mapper.Map<GameModel>((_game.GetT(x => x.Id == detail.GameId)));
                    userOrderDetailList.Add(model);
                }

                if (userOrderDetailList.Count > 0)
                {
                    userOrderModel.Id = userSell.Id;
                    userOrderModel.User = _mapper.Map<UserPaymentManagementModel>(_userManager.FindByIdAsync(userSell.UserId).Result);
                    userOrderModel.Orders = userOrderDetailList;
                    userOrderList.Add(userOrderModel);
                }
            }

            return userOrderList;
        }

        [HttpGet]
        [Route("GetOne/{id}")]
        public UserOrdersModel GetOne(string id)
        {
            UserOrdersModel userOrderModel = new UserOrdersModel();
            List<UserOrderDetailModel> userMoneyOrderDetailList = new List<UserOrderDetailModel>();
            List<UserOrderDetailModel> userCodeOrderDetailList = new List<UserOrderDetailModel>();

            var userOrders = _userOrder.GetUserOrder(id);
            var categories = _category.GetList(x => x.IsActive);

            foreach (var userOrder in userOrders)
            {
                foreach (var detail in userOrder.Orders)
                {
                    UserOrderDetailModel model = new UserOrderDetailModel();
                    model.UserOrderId = userOrder.Id;
                    model.CharacterName = detail.CharacterName;
                    model.BillingPrice = detail.BillingPrice;
                    model.BillingAmount = detail.BillingAmount;
                    model.Game = _mapper.Map<GameModel>((_game.GetT(x => x.Id == detail.GameId)));
                    model.OrderStatus = detail.OrderStatus;
                    model.CreatedDate = detail.CreatedDate;

                    var categoryMoneyType = categories.FirstOrDefault(x => x.Id == model.Game.CategoryId).CategoryMoneyType;
                    if (categoryMoneyType == 1)
                    {
                        userMoneyOrderDetailList.Add(model);
                    }
                }

                userOrderModel.UserId = userOrder.UserId;
                userOrderModel.MoneyOrders = userMoneyOrderDetailList;
            }

            foreach (var userOrder in userOrders)
            {
                foreach (var detail in userOrder.Orders)
                {
                    UserOrderDetailModel model = new UserOrderDetailModel();
                    model.UserOrderId = userOrder.Id;
                    model.CharacterName = detail.CharacterName;
                    model.BillingPrice = detail.BillingPrice;
                    model.BillingAmount = detail.BillingAmount;
                    model.Game = _mapper.Map<GameModel>((_game.GetT(x => x.Id == detail.GameId)));
                    model.OrderStatus = detail.OrderStatus;
                    model.CreatedDate = detail.CreatedDate;
                    var categoryMoneyType = categories.FirstOrDefault(x => x.Id == model.Game.CategoryId).CategoryMoneyType;
                    if (categoryMoneyType != 1)
                    {
                        model.Code = detail.Code;
                        userCodeOrderDetailList.Add(model);
                    }
                }

                userOrderModel.UserId = userOrder.UserId;
                userOrderModel.CodeOrders = userCodeOrderDetailList;
            }

            return userOrderModel;
        }

        [HttpGet]
        [Route("GetUserSell/{id}")]
        public UserOrdersModel GetUserSell(string id)
        {
            UserOrdersModel userSellModel = new UserOrdersModel();
            List<UserOrderDetailModel> userOrderDetailList = new List<UserOrderDetailModel>();

            var userSells = _userSell.GetUserSell(id);

            foreach (var userSell in userSells)
            {
                foreach (var detail in userSell.Sells)
                {
                    UserOrderDetailModel model = new UserOrderDetailModel();
                    model.UserOrderId = userSell.Id;
                    model.CharacterName = detail.CharacterName;
                    model.BillingPrice = detail.BillingPrice;
                    model.BillingAmount = detail.BillingAmount;
                    model.Game = _mapper.Map<GameModel>((_game.GetT(x => x.Id == detail.GameId)));
                    model.OrderStatus = detail.OrderStatus;
                    model.CreatedDate = detail.CreatedDate;
                    userOrderDetailList.Add(model);
                }

                userSellModel.UserId = userSell.UserId;
                userSellModel.Orders = userOrderDetailList;
            }

            return userSellModel;
        }

        [HttpPost]
        [Route("Save")]
        public Response<UserOrderResponseModel> Save([FromBody] List<UserOrderDetailModel> model)
        {
            Response<UserOrderResponseModel> baseResponse = new Response<UserOrderResponseModel>();
            UserOrderResponseModel response = new UserOrderResponseModel();
            using (var transactionScope = new TransactionScope())
            {
                try
                {
                    var userBalance = _UserBalance.GetBalance(base.GetUser());

                    UserOrder entity = new UserOrder()
                    {
                        UserId = base.GetUser(),
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                    };
                    var userOrder = _userOrder.Add(entity);

                    foreach (var item in model)
                    {
                        UserOrderDetail orderDetail = new UserOrderDetail()
                        {
                            UserOrderId = userOrder.Id,
                            BillingAmount = item.BillingAmount,
                            BillingPrice = item.BillingPrice,
                            GameId = item.GameId,
                            CharacterName = item.CharacterName,
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser()
                        };
                        var userOrderDetail = _userOrderDetail.Add(orderDetail);

                        UserBalanceDetail detail = new UserBalanceDetail();
                        detail.Amount = -(item.BillingPrice);
                        detail.UserOrderDetailId = userOrderDetail.Id;
                        detail.TransactionDescription = (int)TRANSACTION_DESCIPTION.GAME_MONEY_ORDER;
                        detail.UserBalanceId = userBalance.Id;
                        detail.CreatedDate = DateTime.Now;
                        detail.CreatedBy = base.GetUser();
                        var userBalanceDetail = _UserBalanceDetail.Add(detail);
                        item.Game = _mapper.Map<GameModel>(_game.GetT(x => x.Id == item.GameId));

                        var userMoney = _UserBalance.GetBalance(base.GetUser()).Balance;
                        var userDrawableMoney = _userDrawableMoney.GetUserDrawableMoney(userBalance.Id);

                        if (userMoney < userDrawableMoney)
                        {
                            UserDrawableMoney userDrawable = new UserDrawableMoney();
                            userDrawable.Amount = -(double)(userDrawableMoney - userMoney);
                            userDrawable.BillingAmount = item.BillingAmount;
                            userDrawable.CreatedBy = GetUser();
                            userDrawable.CreatedDate = DateTime.Now;
                            userDrawable.UserBalanceDetailId = userBalanceDetail.Id;
                            _userDrawableMoney.Add(userDrawable);
                        }

                    }
                    transactionScope.Complete();
                }
                catch (Exception e)
                {
                    Log log = new Log
                    {
                        Path = HttpContext.Request.Path,
                        Message = e.Message,
                        UserId = base.GetUser(),
                        CreatedDate = DateTime.Now
                    };
                    Logger.Instance.Insert(log);
                    response.Message = "Siparişiniz Alınamadı. Sorun üstünde çalışıyoruz lütfen daha sonra tekrar deneyin.";
                    baseResponse.IsSuccess = false;
                    return baseResponse;
                }

                response.Message = "Siparişiniz Alınmıştır. Lütfen Müşteri Hizmetlerimizle iletişime geçiniz.";
                baseResponse.IsSuccess = true;
                baseResponse.Value = response;


                return baseResponse;
            }
        }

        [HttpPost]
        [Route("Approve")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> Approve(UserOrderRequestModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _userOrderDetail.GetT(x => x.Id == model.OrderId);
                    updatedEntity.OrderStatus = (int)ORDER_STATUS.APPROVED;
                    _userOrderDetail.Update(updatedEntity);

                    UserNotification notification = new UserNotification()
                    {
                        UserId = model.UserId,
                        Message = "Siparişiniz teslim edilmiştir.",
                        NotificationType = NotificationType.APPROVED,
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                    };
                    _userNotification.Add(notification);

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
        [Route("Reject")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> Reject(UserOrderRequestModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _userOrderDetail.GetT(x => x.Id == model.OrderId);
                    updatedEntity.OrderStatus = (int)ORDER_STATUS.REJECT;
                    _userOrderDetail.Update(updatedEntity);

                    var userBalance = _UserBalance.GetBalance(base.GetUser());
                    UserBalanceDetail detail = new UserBalanceDetail
                    {
                        Amount = updatedEntity.BillingPrice,
                        CreatedBy = base.GetUser(),
                        CreatedDate = DateTime.Now,
                        TransactionDescription = (int)TRANSACTION_DESCIPTION.ORDER_REJECT,
                        UserBalanceId = userBalance.Id,
                        UserOrderDetailId = updatedEntity.Id
                    };

                    _UserBalanceDetail.Add(detail);

                    UserNotification notification = new UserNotification()
                    {
                        UserId = model.UserId,
                        Message = "Siparişiniz red edildi. Bakiyeniz geri iade edildi.",
                        NotificationType = NotificationType.REJECT,
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                    };
                    _userNotification.Add(notification);

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
        [Route("SaveSell")]
        public Response<UserOrderResponseModel> SaveSell([FromBody] List<UserOrderDetailModel> model)
        {
            Response<UserOrderResponseModel> baseResponse = new Response<UserOrderResponseModel>();
            UserOrderResponseModel response = new UserOrderResponseModel();
            using (var transactionScope = new TransactionScope())
            {
                try
                {
                    UserSell entity = new UserSell()
                    {
                        UserId = base.GetUser(),
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                    };
                    var userSell = _userSell.Add(entity);

                    foreach (var item in model)
                    {
                        UserSellDetail sellDetail = new UserSellDetail()
                        {
                            UserSellId = userSell.Id,
                            BillingAmount = item.BillingAmount,
                            BillingPrice = item.BillingPrice,
                            GameId = item.GameId,
                            CharacterName = item.CharacterName,
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser()
                        };
                        _userSellDetail.Add(sellDetail);
                    }

                    transactionScope.Complete();
                }
                catch (Exception e)
                {
                    Log log = new Log
                    {
                        Path = HttpContext.Request.Path,
                        Message = e.Message,
                        UserId = base.GetUser(),
                        CreatedDate = DateTime.Now
                    };
                    Logger.Instance.Insert(log);
                    response.Message = "Satış talebiniz Alınamadı. Sorun üstünde çalışıyoruz lütfen daha sonra tekrar deneyin.";
                    baseResponse.IsSuccess = false;
                    return baseResponse;
                }

                response.Message = "Satış talebiniz Alınmıştır. Lütfen Müşteri Hizmetlerimizle iletişime geçiniz.";
                baseResponse.IsSuccess = true;
                baseResponse.Value = response;
                return baseResponse;
            }
        }

        [HttpPost]
        [Route("ApproveSell")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> ApproveSell(UserOrderRequestModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _userSellDetail.GetT(x => x.Id == model.OrderId);
                    updatedEntity.OrderStatus = (int)ORDER_STATUS.APPROVED;
                    _userSellDetail.Update(updatedEntity);

                    var userBalance = _UserBalance.GetBalance(model.UserId);

                    if (userBalance == null)
                    {
                        UserBalance entity = new UserBalance();
                        entity.User.Id = model.UserId.ToString();
                        entity.CreatedDate = DateTime.Now;
                        entity.Balance = 0;
                        entity.IsActive = true;
                        entity.CreatedBy = base.GetUser();
                        userBalance = _UserBalance.Add(entity);
                    }

                    UserBalanceDetail detail = new UserBalanceDetail
                    {
                        Amount = updatedEntity.BillingPrice,
                        CreatedBy = base.GetUser(),
                        CreatedDate = DateTime.Now,
                        TransactionDescription = (int)TRANSACTION_DESCIPTION.GAME_MONEY_SELL,
                        UserBalanceId = userBalance.Id,
                        UserOrderDetailId = updatedEntity.Id
                    };

                    detail = _UserBalanceDetail.Add(detail);

                    UserNotification notification = new UserNotification()
                    {
                        UserId = model.UserId,
                        Message = "Satış Gerçekleştirilmiştir. İlgili bakiye hesabınıza yüklendi.",
                        NotificationType = NotificationType.APPROVED,
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                    };
                    _userNotification.Add(notification);


                    UserDrawableMoney userDrawable = new UserDrawableMoney();
                    userDrawable.Amount = (double)detail.Amount;
                    userDrawable.CreatedBy = GetUser();
                    userDrawable.CreatedDate = DateTime.Now;
                    userDrawable.UserBalanceDetailId = detail.Id;
                    _userDrawableMoney.Add(userDrawable);


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
        [Route("RejectSell")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> RejectSell(UserOrderRequestModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _userSellDetail.GetT(x => x.Id == model.OrderId);
                    updatedEntity.OrderStatus = (int)ORDER_STATUS.REJECT;
                    _userSellDetail.Update(updatedEntity);

                    UserNotification notification = new UserNotification()
                    {
                        UserId = model.UserId,
                        Message = "Satış işlemi red edildi.",
                        NotificationType = NotificationType.REJECT,
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                    };

                    _userNotification.Add(notification);

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
        [Route("ApproveCode")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> ApproveCode(UserOrderRequestModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _userOrderDetail.GetT(x => x.Id == model.OrderId);
                    updatedEntity.OrderStatus = (int)ORDER_STATUS.APPROVED;
                    updatedEntity.Code = model.Code;
                    _userOrderDetail.Update(updatedEntity);

                    UserNotification notification = new UserNotification()
                    {
                        UserId = model.UserId,
                        Message = "Oyun koduuz hesabınıza aktarılmıştır. Siparişlerim bölümünden görebilirsiniz.",
                        NotificationType = NotificationType.APPROVED,
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                    };
                    _userNotification.Add(notification);

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
        [Route("RejectCode")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> RejectCode(UserOrderRequestModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                using (var trancation = new TransactionScope())
                {
                    var updatedEntity = _userOrderDetail.GetT(x => x.Id == model.OrderId);
                    updatedEntity.OrderStatus = (int)ORDER_STATUS.REJECT;
                    _userOrderDetail.Update(updatedEntity);

                    var userBalance = _UserBalance.GetBalance(base.GetUser());
                    UserBalanceDetail detail = new UserBalanceDetail
                    {
                        Amount = updatedEntity.BillingPrice,
                        CreatedBy = base.GetUser(),
                        CreatedDate = DateTime.Now,
                        TransactionDescription = (int)TRANSACTION_DESCIPTION.ORDER_REJECT,
                        UserBalanceId = userBalance.Id,
                        UserOrderDetailId = updatedEntity.Id
                    };

                    _UserBalanceDetail.Add(detail);

                    UserNotification notification = new UserNotification()
                    {
                        UserId = model.UserId,
                        Message = "Oyun kodunuz tanımlanamamıştır. Bakiyeniz geri iade edildi.",
                        NotificationType = NotificationType.REJECT,
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                    };
                    _userNotification.Add(notification);

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
    }
}