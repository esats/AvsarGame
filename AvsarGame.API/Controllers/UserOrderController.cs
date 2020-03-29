using System;
using System.Collections.Generic;
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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/UserOrder")]
    [Produces("application/json")]
    public class UserOrderController : APIControllerBase {
        private readonly IUserOrder _userOrder;
        private readonly IUserOrderDetail _userOrderDetail;
        private readonly IUserBalance _UserBalance;
        private readonly IUserBalanceDetails _UserBalanceDetail;
        private readonly IUserNotification _userNotification;
        private readonly IGame _game;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserOrderController(IUserOrder userOrder, IMapper mapper, IUserOrderDetail userDetailOrder, IGame game, IUserBalanceDetails userBalanceDetail,
                                   IUserBalance userBalance, UserManager<ApplicationUser> userManager, IUserNotification userNotification) {
            _userOrder = userOrder;
            _mapper = mapper;
            _userOrderDetail = userDetailOrder;
            _game = game;
            _UserBalanceDetail = userBalanceDetail;
            _UserBalance = userBalance;
            _userManager = userManager;
            _userNotification = userNotification;
        }

        [HttpGet]
        [Route("List")]
        public List<UserOrdersModel> List() {
            var userOrders = _userOrder.GetUserOrder(null);
            List<UserOrdersModel> userOrderList = new List<UserOrdersModel>();

            foreach (var userOrder in userOrders) {
                UserOrdersModel userOrderModel = new UserOrdersModel();
                List<UserOrderDetailModel> userOrderDetailList = new List<UserOrderDetailModel>();
                foreach (var detail in userOrder.Orders.Where(x => x.OrderStatus == 0 && x.UserOrderId == userOrder.Id)) {
                    UserOrderDetailModel model = new UserOrderDetailModel();
                    model.Id = detail.Id;
                    model.UserOrderId = userOrder.Id;
                    model.CharacterName = detail.CharacterName;
                    model.BillingPrice = detail.BillingPrice;
                    model.BillingAmount = detail.BillingAmount;
                    model.Game = _mapper.Map<GameModel>((_game.GetT(x => x.Id == detail.GameId)));
                    userOrderDetailList.Add(model);
                }

                if (userOrderDetailList.Count > 0) {
                    userOrderModel.Id = userOrder.Id;
                    userOrderModel.User = _mapper.Map<UserPaymentManagementModel>(_userManager.FindByIdAsync(userOrder.UserId).Result);
                    userOrderModel.Orders = userOrderDetailList;
                    userOrderList.Add(userOrderModel);
                }
            }

            return
                    userOrderList;
        }

        [HttpGet]
        [Route("GetOne/{id}")]
        public UserOrdersModel GetOne(string id) {
            UserOrdersModel userOrderModel = new UserOrdersModel();
            List<UserOrderDetailModel> userOrderDetailList = new List<UserOrderDetailModel>();

            var userOrders = _userOrder.GetUserOrder(id);
            
            foreach (var userOrder in userOrders) {
                foreach (var detail in userOrder.Orders.OrderByDescending(x=>x.CreatedDate)) {
                    UserOrderDetailModel model = new UserOrderDetailModel();
                    model.UserOrderId = userOrder.Id;
                    model.CharacterName = detail.CharacterName;
                    model.BillingPrice = detail.BillingPrice;
                    model.BillingAmount = detail.BillingAmount;
                    model.Game = _mapper.Map<GameModel>((_game.GetT(x => x.Id == detail.GameId)));
                    model.OrderStatus = detail.OrderStatus;
                    userOrderDetailList.Add(model);
                }

                userOrderModel.UserId = userOrder.UserId;
                userOrderModel.Orders = userOrderDetailList;
            }

            return userOrderModel;
        }

        [HttpPost]
        [Route("Save")]
        public Response<UserOrderResponseModel> Save([FromBody] List<UserOrderDetailModel> model) {
            Response<UserOrderResponseModel> baseResponse = new Response<UserOrderResponseModel>();
            UserOrderResponseModel response = new UserOrderResponseModel();
            using (var transactionScope = new TransactionScope()) {
                try {
                    var userBalance = _UserBalance.GetBalance(base.GetUser());

                    UserOrder entity = new UserOrder() {
                            UserId = base.GetUser(),
                            CreatedDate = DateTime.Now,
                            CreatedBy = base.GetUser()
                    };
                    var userOrder = _userOrder.Add(entity);

                    foreach (var item in model) {
                        UserOrderDetail orderDetail = new UserOrderDetail() {
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
                        detail.Amount = -(item.BillingAmount * item.BillingPrice);
                        detail.UserOrderDetailId = userOrderDetail.Id;
                        detail.TransactionDescription = (int) TRANSACTION_DESCIPTION.GAME_MONEY_ORDER;
                        detail.UserBalanceId = userBalance.Id;
                        detail.CreatedDate = DateTime.Now;
                        detail.CreatedBy = base.GetUser();
                        _UserBalanceDetail.Add(detail);
                    }

                    transactionScope.Complete();
                } catch (Exception e) {
                    Log log = new Log {
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
        public Response<HttpStatusCode> Approve(UserOrderRequestModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            try {
                using (var trancation = new TransactionScope()) {
                    var updatedEntity = _userOrderDetail.GetT(x => x.Id == model.OrderId);
                    updatedEntity.OrderStatus = (int) ORDER_STATUS.APPROVED;
                    _userOrderDetail.Update(updatedEntity);

                    UserNotification notification = new UserNotification() {
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
            } catch (Exception exception) {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [HttpPost]
        [Route("Reject")]
        [Authorize(Roles = "Admin")]
        public Response<HttpStatusCode> Reject(UserOrderRequestModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try {
                using (var trancation = new TransactionScope()) {
                    var updatedEntity = _userOrderDetail.GetT(x => x.Id == model.OrderId);
                    updatedEntity.OrderStatus = (int) ORDER_STATUS.REJECT;
                    _userOrderDetail.Update(updatedEntity);

                    var userBalance = _UserBalance.GetBalance(base.GetUser());
                    UserBalanceDetail detail = new UserBalanceDetail
                    {
                        Amount = updatedEntity.BillingAmount * updatedEntity.BillingPrice,
                        CreatedBy = base.GetUser(),
                        CreatedDate =DateTime.Now,
                        TransactionDescription= (int)TRANSACTION_DESCIPTION.ORDER_REJECT,
                        UserBalanceId=userBalance.Id,
                        UserOrderDetailId = updatedEntity.Id
                    };

                    _UserBalanceDetail.Add(detail);

                    UserNotification notification = new UserNotification() {
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
            } catch (Exception e) {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }
    }
}