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

namespace AvsarGame.API.Controllers
{
    [Route("api/UserManagement")]
    [Authorize(Roles = "Admin")]
    public class UserManagementController : APIControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserPaymentRequest _userPaymentRequest;
        private readonly IUserBalance _userBalance;
        private readonly IUserBalanceDetails _userBalanceDetails;
        private readonly IUserNotification _userNotification;
        private readonly IPaymentLog _paymenLog;
        private readonly IMapper _mapper;

        public UserManagementController(UserManager<ApplicationUser> userManager, IMapper mapper, IUserPaymentRequest userPaymentRequest, IUserBalance userBalance,
                                        IUserBalanceDetails userBalanceDetails, IUserNotification userNotification, IPaymentLog paymentLog)
        {
            _userManager = userManager;
            _mapper = mapper;
            _userPaymentRequest = userPaymentRequest;
            _userBalance = userBalance;
            _userBalanceDetails = userBalanceDetails;
            _userNotification = userNotification;
            _paymenLog = paymentLog;
        }

        [HttpGet]
        [Route("List")]
        public List<UserPaymentManagementModel> UsersWithPaymenNotRecords()
        {
            List<UserPaymentManagementModel> list = new List<UserPaymentManagementModel>();
            var users = _userManager.Users.ToList();
            var requests = _paymenLog.GetList(x => x.TransferedUsersBalanceStatus == 2).ToList();

            foreach (var user in users)
            {
                if (requests.Count(x => x.UserId == user.Id) > 0)
                {
                    UserPaymentManagementModel model = new UserPaymentManagementModel();
                    model = _mapper.Map<UserPaymentManagementModel>(user);
                    model.PaymentRequests = _mapper.Map<List<PaymentLogModel>>(requests.Where(x => x.UserId == user.Id).ToList());
                    list.Add(model);
                }
            }

            return list;
        }

        [HttpPost]
        [Route("SaveBalance")]
        [AllowAnonymous]
        public Response<HttpStatusCode> SaveBalance(UserPaymentRequestModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                if (model.IpAddress != "185.197.196.99")
                {
                    response.Message = "Yetkisiz istek";
                    response.IsSuccess = false;
                    return response;
                }
                using (var trancation = new TransactionScope())
                {
                    model.CreatedBy = "185.197.196.99";
                    InsertOrUpdateUserBalance(model);

                    UserNotification notification = new UserNotification()
                    {
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
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;

                Log entity = new Log();
                entity.CreatedDate = DateTime.Now;
                entity.CreatedBy = "185.197.196.99";
                entity.Message = e.Message;
                entity.OrderId = model.OrderId;
                Logger.Instance.Insert(entity);
            }

            return response;
        }

        [HttpPost]
        [Route("Approve")]
        public Response<HttpStatusCode> Approve(UserPaymentRequestModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                using (var trancation = new TransactionScope())
                {
                    var paymentRequest = _paymenLog.GetT(x => x.UserId == model.UserId && x.Id == model.Id);
                    model.CreatedBy = base.GetUser();
                    InsertOrUpdateUserBalance(model);
                    paymentRequest.TransferedUsersBalanceStatus = (int)PaymentStatus.APPROVED;
                    _paymenLog.Update(paymentRequest);

                    UserNotification notification = new UserNotification()
                    {
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
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
            }

            return response;
        }

        [HttpPost]
        [Route("Reject")]
        public Response<HttpStatusCode> Reject(UserPaymentRequestModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                var paymentRequest = _paymenLog.GetT(x => x.UserId == model.UserId && x.Id == model.Id);
                paymentRequest.TransferedUsersBalanceStatus = (int)PaymentStatus.REJECT;
                _paymenLog.Update(paymentRequest);

                UserNotification notification = new UserNotification()
                {
                    UserId = model.UserId,
                    Message = "Ödeme Reddedildi",
                    NotificationType = NotificationType.REJECT,
                    CreatedDate = DateTime.Now,
                    CreatedBy = base.GetUser()
                };

                _userNotification.Add(notification);

                response.IsSuccess = true;
                response.Value = HttpStatusCode.OK;
            }
            catch (TransactionAbortedException e)
            {
                Log log = new Log
                {
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


        private void InsertOrUpdateUserBalance(UserPaymentRequestModel model)
        {
            try
            {
                var userBalance = _userBalance.GetBalance(model.UserId);

                if (userBalance == null)
                {
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
                balanceDetail.CreatedBy = model.CreatedBy;
                balanceDetail.CreatedDate = DateTime.Now;
                balanceDetail.IsActive = true;
                balanceDetail.OrderId = model.OrderId;

                _userBalanceDetails.Add(balanceDetail);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}