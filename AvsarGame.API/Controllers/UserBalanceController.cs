using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AvsarGame.API.Base;
using AvsarGame.API.Models;
using AvsarGame.Dal.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AvsarGame.API.Controllers {
    [Route("api/UserBalance")]
    public class UserBalanceController : APIControllerBase {
        private readonly IUserBalance _userBalance;
        private readonly IPaymentLog _paymentLog;
        private readonly IMapper _mapper;
        private readonly IUserDrawableMoney _userDrawableMoney;
        private readonly IUserBalanceDetails _userBalanceDetails;

        public UserBalanceController(IUserBalance userBalance,
            IPaymentLog paymentLog, IMapper mapper, IUserDrawableMoney userDrawableMoney, IUserBalanceDetails userBalanceDetails)
        {
            _userBalance = userBalance;
            _paymentLog = paymentLog;
            _mapper = mapper;
            _userDrawableMoney = userDrawableMoney;
            _userBalanceDetails = userBalanceDetails;
        }

        [HttpGet]
        [Route("GetBalance/{id}")]
        public UserBalanceModel GetBalance(string id) {
            UserBalanceModel model = new UserBalanceModel();
            var userBalance = _userBalance.GetBalance(id);
            if (userBalance != null) {
                if (userBalance.Details != null) {
                    model.Balance = userBalance.Details.Sum(x => x.Amount);
                }
            } else {
                model.Balance = decimal.Zero;
            }

            model.UserId = id;
            return model;
        }

        [HttpGet]
        [Route("GetUserPaymentHistory/{id}")]
        public List<UserPaymentHistoryModel> GetUserPaymentHistory(string id) {
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
    }
}