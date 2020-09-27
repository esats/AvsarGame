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

        public UserBalanceController(IUserBalance userBalance, 
            IPaymentLog paymentLog, IMapper mapper) {
            _userBalance = userBalance;
            _paymentLog = paymentLog;
            _mapper = mapper;
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
    }
}