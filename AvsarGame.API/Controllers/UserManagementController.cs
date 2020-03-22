﻿using System;
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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/UserManagement")]
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
        [Route("Approve")]
        public Response<HttpStatusCode> Approve(UserPaymentRequestControlModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();

            try {
                using (var trancation = new TransactionScope()) {
                    var paymentRequest = _userPaymentRequest.GetT(x => x.UserId == model.UserId && x.Id == model.RequestId);
                    InsertOrUpdateUserBalance(model);
                    paymentRequest.PaymentStatus = (int) PaymentStatus.APPROVED;
                    _userPaymentRequest.Update(paymentRequest);

                    UserNotification notification = new UserNotification() {
                            UserId = model.UserId,
                            Message = "Ödeme Onaylandı. Bakiyeniz Güncellendi.",
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

        private void InsertOrUpdateUserBalance(UserPaymentRequestControlModel model) {
            try {
                var userBalance = _userBalance.GetT(x => x.IsActive == true && x.User.Id == model.UserId.ToString());
                if (userBalance == null) {
                    UserBalance entity = new UserBalance();
                    entity.User.Id = model.UserId.ToString();
                    entity.CreatedDate = DateTime.Now;
                    entity.Balance = 0;
                    entity.IsActive = true;
                    entity.CreatedBy = base.GetUser();
                    userBalance = _userBalance.Add(entity);
                }

                var paymentDetail = _userPaymentRequest.GetT(x => x.UserId == model.UserId && x.Id == model.RequestId);
                UserBalanceDetail balanceDetail = new UserBalanceDetail();
                balanceDetail.Amount = paymentDetail.Amount;
                balanceDetail.TransactionDescription = (int) TRANSACTION_DESCIPTION.Payment;
                balanceDetail.UserBalanceId = userBalance.Id;
                balanceDetail.CreatedBy = base.GetUser();
                balanceDetail.CreatedDate = DateTime.Now;
                balanceDetail.IsActive = true;

                _userBalanceDetails.Add(balanceDetail);
            } catch (Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost]
        [Route("Reject")]
        public Response<HttpStatusCode> Reject(UserPaymentRequestControlModel model) {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try {
                var paymentRequest = _userPaymentRequest.GetT(x => x.UserId == model.UserId && x.Id == model.RequestId);
                InsertOrUpdateUserBalance(model);
                paymentRequest.PaymentStatus = (int) PaymentStatus.REJECT;
                _userPaymentRequest.Update(paymentRequest);

                UserNotification notification = new UserNotification() {
                        UserId = model.UserId,
                        Message = "Ödeme Reddedildi",
                        NotificationType = NotificationType.REJECT,
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                };
                _userNotification.Add(notification);

                response.IsSuccess = true;
                response.Value = HttpStatusCode.OK;
            } catch (TransactionAbortedException e) {
                Log log = new Log {
                        Path = HttpContext.Request.Path,
                        Message = e.Message,
                        UserId = model.UserId,
                        CreatedDate = DateTime.Now,
                        CreatedBy = base.GetUser()
                };
                Logger.Instance.Insert(log);
                response.IsSuccess = false;
                response.Message = e.Message;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }
    }
}