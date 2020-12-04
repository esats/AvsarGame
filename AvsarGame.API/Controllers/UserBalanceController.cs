using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Dal.Abstract;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers
{
    [Route("api/UserBalance")]
    public class UserBalanceController : APIControllerBase
    {
        private readonly IUserBalance _userBalance;
        private readonly IPaymentLog _paymentLog;
        private readonly IMapper _mapper;
        private readonly IUserDrawableMoney _userDrawableMoney;
        private readonly IUserBalanceDetails _userBalanceDetails;
        private readonly IUserMoneyDrawRequest _userMoneyDrawRequest;

        public UserBalanceController(IUserBalance userBalance,
            IPaymentLog paymentLog, IMapper mapper, IUserDrawableMoney userDrawableMoney, IUserBalanceDetails userBalanceDetails, IUserMoneyDrawRequest userMoneyDrawRequest)
        {
            _userBalance = userBalance;
            _paymentLog = paymentLog;
            _mapper = mapper;
            _userDrawableMoney = userDrawableMoney;
            _userBalanceDetails = userBalanceDetails;
            _userMoneyDrawRequest = userMoneyDrawRequest;
        }

        [HttpGet]
        [Route("GetBalance/{id}")]
        public UserBalanceModel GetBalance(string id)
        {
            UserBalanceModel model = new UserBalanceModel();
            var userBalance = _userBalance.GetBalance(id);
            if (userBalance != null)
            {
                if (userBalance.Details != null)
                {
                    model.Balance = userBalance.Details.Sum(x => x.Amount);
                }
            }
            else
            {
                model.Balance = decimal.Zero;
            }

            model.UserId = id;
            return model;
        }

        [HttpGet]
        [Route("GetUserPaymentHistory/{id}")]
        public List<UserPaymentHistoryModel> GetUserPaymentHistory(string id)
        {
            var payments = _mapper.Map<List<UserPaymentHistoryModel>>(_paymentLog.GetList(x => x.UserId == id && x.IsIncoming));
            return payments;
        }

        [HttpGet]
        [Route("GetUserBalanceWithMoneyDraw/{id}")]
        public PaymentDrawableMoney GetUserBalanceWithMoneyDraw(string id)
        {
            PaymentDrawableMoney drawableMoney = new PaymentDrawableMoney();

            var balanceDetail = _userBalance.GetBalance(id);
            var userDrawableMoney = (from e in _userDrawableMoney.GetList()
                                     join d in _userBalanceDetails.GetList() on e.UserBalanceDetailId equals d.Id
                                     where d.UserBalanceId == balanceDetail.Id
                                     select new { e.Amount }).Sum(x => x.Amount);
            drawableMoney.Balance = (double)balanceDetail.Details.Sum(x => x.Amount);
            drawableMoney.DrawableBalance = userDrawableMoney;

            return drawableMoney;
        }

        [Route("SaveMoneyDrawRequest")]
        [HttpPost]
        public Response<HttpStatusCode> SaveMoneyDrawRequest([FromBody] MoneyWithDrawModel model)
        {
            Response<HttpStatusCode> response = new Response<HttpStatusCode>();
            try
            {
                using (var transaction = new TransactionScope())
                {
                    Random generator = new Random();
                    String r = generator.Next(0, 10000000).ToString("D6");

                    UserMoneyDrawRequest userMoneyDraw = new UserMoneyDrawRequest();
                    userMoneyDraw.Amount = model.Amount;
                    userMoneyDraw.Iban = model.Iban;
                    userMoneyDraw.UserId = new Guid(GetUser());
                    userMoneyDraw.TicketNo = model.UserId + r;
                    _userMoneyDrawRequest.Add(userMoneyDraw);

                    var userBalance = _userBalance.GetBalance(GetUser());

                    UserBalanceDetail userBalanceDetail = new UserBalanceDetail();
                    userBalanceDetail.TransactionDescription = (int)TRANSACTION_DESCIPTION.MONEY_DRAW;
                    userBalanceDetail.UserBalanceId = userBalance.Id;
                    userBalanceDetail.CreatedBy = GetUser();
                    userBalanceDetail.Amount = (decimal)-model.Amount;
                    userBalanceDetail.CreatedDate = DateTime.Now;
                    userBalanceDetail.OrderId = model.UserId + r;
                    var balanceDetail = _userBalanceDetails.Add(userBalanceDetail);

                    UserDrawableMoney userDrawable = new UserDrawableMoney();
                    userDrawable.Amount = -model.Amount;
                    userDrawable.CreatedBy = GetUser();
                    userDrawable.CreatedDate = DateTime.Now;
                    userDrawable.UserBalanceDetailId = balanceDetail.Id;
                    _userDrawableMoney.Add(userDrawable);

                    transaction.Complete();

                    response.IsSuccess = true;
                    response.Value = HttpStatusCode.OK;
                    response.Message = "Para çekme talebiniz alınmıştır.";
                }
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Value = HttpStatusCode.BadRequest;
                response.Message = "Bir Hata oluştu";
            }

            return response;
        }

    }
}