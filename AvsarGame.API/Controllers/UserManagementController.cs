using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    [Route("api/UserManagement")]
    [Authorize(Roles = "Admin")]
    public class UserManagementController : APIControllerBase {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserPaymentRequest _userPaymentRequest;
        private readonly IUserBalance _userBalance;
        private readonly IUserBalanceDetails _userBalanceDetails;
        private readonly IUserNotification _userNotification;
        private readonly IMapper _mapper;

        public UserManagementController(UserManager<ApplicationUser> userManager, IMapper mapper, IUserPaymentRequest userPaymentRequest, IUserBalance userBalance,
                                        IUserBalanceDetails userBalanceDetails, IUserNotification userNotification) {
            _userManager = userManager;
            _mapper = mapper;
            _userPaymentRequest = userPaymentRequest;
            _userBalance = userBalance;
            _userBalanceDetails = userBalanceDetails;
            _userNotification = userNotification;
        }

        [HttpGet]
        [Route("List")]
        public List<UserPaymentManagementModel> UsersWithPaymentRequest() {
            List<UserPaymentManagementModel> list = new List<UserPaymentManagementModel>();
            var users = _userManager.Users.ToList();
            var requests = _userPaymentRequest.GetList(x => x.PaymentStatus == 0).ToList();

            foreach (var user in users) {
                if (requests.Count(x => x.UserId == user.Id) > 0) {
                    UserPaymentManagementModel model = new UserPaymentManagementModel();
                    model = _mapper.Map<UserPaymentManagementModel>(user);
                    model.PaymentRequests = _mapper.Map<List<UserPaymentRequestModel>>(requests.Where(x => x.UserId == user.Id).ToList());
                    list.Add(model);
                }
            }

            return list;
        }

        [HttpPost]
        [Route("SaveBalance")]
        [AllowAnonymous]
        public Response<HttpStatusCode> SaveBalance(UserPaymentRequestModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try {
                if (model.IpAddress != "185.197.196.99") {
                    response.Message = "Yetkisiz istek";
                    response.IsSuccess = false;
                    return response;
                }
                using (var trancation = new TransactionScope()) {
                    InsertOrUpdateUserBalance(model);

                    UserNotification notification = new UserNotification() {
                        UserId = model.UserId,
                        Message = "Ödeme Onaylandı. Bakiyeniz Güncellendi.",
                        NotificationType = NotificationType.APPROVED,
                        CreatedDate = DateTime.Now,
                        CreatedBy = model.UserId
                    };
                    _userNotification.Add(notification);

                    response.IsSuccess = true;
                    response.Value = HttpStatusCode.OK;
                    trancation.Complete();
                }
            } catch (Exception e) {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;

                Log entity = new Log();
                entity.CreatedDate = DateTime.Now;
                entity.CreatedBy = base.GetUser();
                entity.Message = e.Message;
                entity.OrderId = model.OrderId;
                Logger.Instance.Insert(entity);
            }

            return response;
        }

        private void InsertOrUpdateUserBalance(UserPaymentRequestModel model) {
            try {
                var userBalance = _userBalance.GetBalance(model.UserId);

                if (userBalance == null) {
                    UserBalance entity = new UserBalance();
                    entity.User.Id = model.UserId.ToString();
                    entity.CreatedDate = DateTime.Now;
                    entity.Balance = 0;
                    entity.IsActive = true;
                    entity.CreatedBy = model.UserId;
                    userBalance = _userBalance.Add(entity);
                }

                UserBalanceDetail balanceDetail = new UserBalanceDetail();
                balanceDetail.Amount = model.Amount;
                balanceDetail.TransactionDescription = (int)TRANSACTION_DESCIPTION.Payment;
                balanceDetail.UserBalanceId = userBalance.Id;
                balanceDetail.CreatedBy = model.UserId;
                balanceDetail.CreatedDate = DateTime.Now;
                balanceDetail.IsActive = true;
                balanceDetail.OrderId = model.OrderId;

                _userBalanceDetails.Add(balanceDetail);
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}