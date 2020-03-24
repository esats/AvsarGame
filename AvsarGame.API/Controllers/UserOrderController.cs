using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/UserOrder")]
    [Produces("application/json")]
    public class UserOrderController : APIControllerBase {
        public readonly IUserOrder _userOrder;
        public readonly IUserOrderDetail _userDetailOrder;
        public readonly IUserBalance _UserBalance;
        public readonly IUserBalanceDetails _UserBalanceDetail;
        public readonly IGame _game;
        public readonly IMapper _mapper;

        public UserOrderController(IUserOrder userOrder, IMapper mapper, IUserOrderDetail userDetailOrder, IGame game, IUserBalanceDetails userBalanceDetail,
                                   IUserBalance userBalance) {
            _userOrder = userOrder;
            _mapper = mapper;
            _userDetailOrder = userDetailOrder;
            _game = game;
            _UserBalanceDetail = userBalanceDetail;
            _UserBalance = userBalance;
        }

        [HttpGet]
        [Route("List")]
        public List<UserOrdersModel> List() {
            var userOrders = _userOrder.GetUserOrder(null);
            List<UserOrdersModel> userOrderList = new List<UserOrdersModel>();
            List<UserOrderDetailModel> userOrderDetailList = new List<UserOrderDetailModel>();

            foreach (var userOrder in userOrders) {
                UserOrdersModel userOrderModel = new UserOrdersModel();
                foreach (var detail in userOrder.Orders) {
                    UserOrderDetailModel model = new UserOrderDetailModel();
                    model.UserOrderId = userOrder.Id;
                    model.CharacterName = detail.CharacterName;
                    model.BillingPrice = detail.BillingPrice;
                    model.BillingAmount = detail.BillingAmount;
                    model.Game = _mapper.Map<GameModel>((_game.GetT(x => x.Id == detail.GameId)));
                    userOrderDetailList.Add(model);
                }

                userOrderModel.UserId = userOrder.UserId;
                userOrderModel.Orders = userOrderDetailList;
                userOrderList.Add(userOrderModel);
            }

            return userOrderList;
        }

        [HttpGet]
        [Route("GetOne")]
        public List<UserOrdersModel> GetOne(string userId) {
            var userOrders = _userOrder.GetUserOrder(userId);
            List<UserOrdersModel> userOrderList = new List<UserOrdersModel>();
            List<UserOrderDetailModel> userOrderDetailList = new List<UserOrderDetailModel>();

            foreach (var userOrder in userOrders.Where(x => x.UserId == userId)) {
                UserOrdersModel userOrderModel = new UserOrdersModel();
                foreach (var detail in userOrder.Orders) {
                    UserOrderDetailModel model = new UserOrderDetailModel();
                    model.UserOrderId = userOrder.Id;
                    model.CharacterName = detail.CharacterName;
                    model.BillingPrice = detail.BillingPrice;
                    model.BillingAmount = detail.BillingAmount;
                    model.Game = _mapper.Map<GameModel>((_game.GetT(x => x.Id == detail.GameId)));
                    userOrderDetailList.Add(model);
                }

                userOrderModel.UserId = userOrder.UserId;
                userOrderModel.Orders = userOrderDetailList;
                userOrderList.Add(userOrderModel);
            }

            return userOrderList;
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
                        var userOrderDetail = _userDetailOrder.Add(orderDetail);

                        UserBalanceDetail detail = new UserBalanceDetail();
                        detail.Amount = -(item.BillingAmount * item.BillingPrice);
                        detail.UserOrderDetailId = userOrderDetail.Id;
                        detail.TransactionDescription = (int) TRANSACTION_DESCIPTION.GAME_MONEY_ORDER;
                        detail.UserBalanceId = userBalance.Id;
                        detail.CreatedDate=DateTime.Now;
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
    }
}